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
from django.core import serializers

stripe.api_key = STRIPE_PRIVATE_KEY
# Create your views here.

def checkout_view(request):
    context = {}
    if request.user.username: 
        if request.method == "POST":
            if 'product_button' in request.POST:
                price_id = request.POST.get("product_button")
            if Product.objects.filter(price_id = price_id):
                try:
                    checkout_session = stripe.checkout.Session.create(
                        # price id passed into from post
                        line_items=[
                            {
                                # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                                'price': price_id,
                                'quantity': 1,
                            },
                        ],
                        mode='payment',
                        success_url = f"{BASE_URL}/checkout/success/" + "{CHECKOUT_SESSION_ID}",# reverse('payments:success')
                        cancel_url = f"{BASE_URL}/checkout/cancel/" + "{CHECKOUT_SESSION_ID}"# reverse('payments:cancel')
                    )

                except Exception as e:
                    print(e)
                    return render(request, "payments/checkout.html", context)
                    
                request.session['price_id'] = price_id
                request.session['user'] = request.user.username
                return redirect(checkout_session.url, code=303)
            else:
                print('Why you try hack us mbro????') # anti-hack page!!! scare them mofos!!
    else:
        print('not logged in view')
    context['products'] = serializers.serialize( "python", Product.objects.all() )
    return render(request, "payments/checkout.html", context)

def success_view(request, reference):
    context = {}
    # mutiple points of failure here... account credits might never increment
    # if any error is called we have to try again and/or refund
    if 'price_id' in request.session:
        price_id = request.session['price_id']
        del request.session['price_id']
        price_object = Product.objects.filter(price_id = price_id).first()
        credits = price_object.metadata
        if 'user' in request.session:
            user = User.objects.filter(username=request.session['user']).first()
            del request.session['user']
            if user:
                print(user.credits)
                user.credits = user.credits + int(credits)
                user.save()
                print(user.credits)
        try:
            checkout_session = stripe.checkout.Session.retrieve(reference)
        except Exception as e:
            print(e)
    else:
        print('not in session')

    return render(request, "payments/success.html", context)

def cancel_view(request, reference):
    context = {}
    if 'price_id' in request.session:
        del request.session['price_id']
        if 'user' in request.session:
            del request.session['user']
        try:
            checkout_session = stripe.checkout.Session.retrieve(reference)
        except Exception as e:
            print(e)
    else:
        print('not in session')

    return render(request, "payments/cancel.html", context)


# EXAMPLES SUCCESS
# {
#   "after_expiration": null,
#   "allow_promotion_codes": null,
#   "amount_subtotal": 1000,
#   "amount_total": 1000,
#   "automatic_tax": {
#     "enabled": false,
#     "status": null
#   },
#   "billing_address_collection": null,
#   "cancel_url": "http://localhost:8000/checkout/cancel/{CHECKOUT_SESSION_ID}",
#   "client_reference_id": null,
#   "consent": null,
#   "consent_collection": null,
#   "currency": "usd",
#   "customer": "cus_Kt98VKgW3HJqxm",
#   "customer_details": {
#     "email": "caleb.sideras@outlook.com",
#     "phone": null,
#     "tax_exempt": "none",
#     "tax_ids": []
#   },
#   "customer_email": null,
#   "expires_at": 1641188520,
#   "id": "cs_test_a1atUAFSitKnaPzUudUecvPmxDzvYp6vzKlHq3VyZSCF5MEAWek09bKiLL",
#   "livemode": false,
#   "locale": null,
#   "metadata": {},
#   "mode": "payment",
#   "object": "checkout.session",
#   "payment_intent": "pi_3KDMpQDlWp2mVdKS0CRLqAZh",
#   "payment_method_options": {},
#   "payment_method_types": [
#     "card"
#   ],
#   "payment_status": "paid",
#   "phone_number_collection": {
#     "enabled": false
#   },
#   "recovered_from": null,
#   "setup_intent": null,
#   "shipping": null,
#   "shipping_address_collection": null,
#   "shipping_options": [],
#   "shipping_rate": null,
#   "status": "complete",
#   "submit_type": null,
#   "subscription": null,
#   "success_url": "http://localhost:8000/checkout/success/{CHECKOUT_SESSION_ID}",
#   "total_details": {
#     "amount_discount": 0,
#     "amount_shipping": 0,
#     "amount_tax": 0
#   },
#   "url": null
# }

# EXAMPLE FAILURE
    #     {
#   "after_expiration": null,
#   "allow_promotion_codes": null,
#   "amount_subtotal": 1000,
#   "amount_total": 1000,
#   "automatic_tax": {
#     "enabled": false,
#     "status": null
#   },
#   "billing_address_collection": null,
#   "cancel_url": "http://localhost:8000/checkout/cancel/{CHECKOUT_SESSION_ID}",
#   "client_reference_id": null,
#   "consent": null,
#   "consent_collection": null,
#   "currency": "usd",
#   "customer": null,
#   "customer_details": null,
#   "customer_email": null,
#   "expires_at": 1641188376,
#   "id": "cs_test_a16vGNKL2WQwZS1Pn78LFN8Ag9dof5D2epvVAZDmhFgtitZ8R7ZRaVFGYB",
#   "livemode": false,
#   "locale": null,
#   "metadata": {},
#   "mode": "payment",
#   "object": "checkout.session",
#   "payment_intent": "pi_3KDMn6DlWp2mVdKS1sLCZhgi",
#   "payment_method_options": {},
#   "payment_method_types": [
#     "card"
#   ],
#   "payment_status": "unpaid",
#   "phone_number_collection": {
#     "enabled": false
#   },
#   "recovered_from": null,
#   "setup_intent": null,
#   "shipping": null,
#   "shipping_address_collection": null,
#   "shipping_options": [],
#   "shipping_rate": null,
#   "status": "open",
#   "submit_type": null,
#   "subscription": null,
#   "success_url": "http://localhost:8000/checkout/success/{CHECKOUT_SESSION_ID}",
#   "total_details": {
#     "amount_discount": 0,
#     "amount_shipping": 0,
#     "amount_tax": 0
#   },
#   "url": "https://checkout.stripe.com/pay/cs_test_a16vGNKL2WQwZS1Pn78LFN8Ag9dof5D2epvVAZDmhFgtitZ8R7ZRaVFGYB#fidkdWxOYHwnPyd1blpxYHZxWjA0Tjxmbm9BaVJ1N2hTYU5WTF9xX1JmQGhATGpiYjBJQjdTfTx1PUxvTEg2PWdKaj1GZ0J0YWFPcFxgQUBzZ1VQRmFINDRnMkhgQ0E9XEJGPTdTMGg3XXRqNTVmTXRTS2Y1MicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
# }