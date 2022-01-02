from django.shortcuts import render
import stripe
from time import timezone
from django.http.response import HttpResponse
from django.shortcuts import render
from main.view_tools import generate_token
from genera.settings import MEDIA_DIR, DEFAULT_FROM_EMAIL, BASE_DIR, STRIPE_PUBILC_KEY, STRIPE_PRIVATE_KEY, BASE_URL
from main.models import User
from main.forms import *
from main.generator_alg import *
from main.contract_interaction import *
from django.templatetags.static import static
from django.core.files.storage import FileSystemStorage
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from pathlib import Path
import json
from django.http import JsonResponse, RawPostDataException
from django.core.exceptions import PermissionDenied, ValidationError, BadRequest
import base64
from PIL import Image, ImageColor
import numpy as np
import io
from django.core.mail import send_mail
from .models import *
from django.dispatch import receiver
from django.db.models.signals import pre_delete
import shutil
import requests
import json
from django.db.models import Q
import os
from datetime import timezone
from django.template.loader import render_to_string
from io import BytesIO
import cv2
from django.views.decorators.csrf import csrf_exempt
from genera.tools import Timer
from .models import *

stripe.api_key = STRIPE_PRIVATE_KEY
# Create your views here.

def checkout_view(request):
    context = {}
    if request.method == "POST":
        print(stripe.api_key)
        print(STRIPE_PRIVATE_KEY)
        print('entered checkout_view post')
        try:
            checkout_session = stripe.checkout.Session.create(
                # price id passed into from post
                line_items=[
                    {
                        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        'price': 'price_1KDE5pDlWp2mVdKSktdCZEGL',#'{{PRICE_ID}}',
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url = f"{BASE_URL}/checkout/success/" + "{CHECKOUT_SESSION_ID}",# reverse('payments:success'), #+ '/success.html', # Increment credits
                cancel_url = f"{BASE_URL}/checkout/cancel/" + "{CHECKOUT_SESSION_ID}"# reverse('payments:cancel'), #+ '/cancel.html',
            )
            # print(checkout_session)

        except Exception as e:
            print(e)
            return render(request, "payments/checkout.html", context)

        print('post api request')
        return redirect(checkout_session.url, code=303)
        
    return render(request, "payments/checkout.html", context)

def success_view(request, reference):
    context = {}

    try:
        checkout_session = stripe.checkout.Session.retrieve(reference)
        print(checkout_session)
    except Exception as e:
        print(e)

    return render(request, "payments/success.html", context)

def cancel_view(request, reference):
    context = {}
    try:
        checkout_session = stripe.checkout.Session.retrieve(reference)
        print(checkout_session)
    except Exception as e:
        print(e)

    return render(request, "payments/cancel.html", context)