from django.shortcuts import render
import stripe
from main.view_tools import *
from genera.settings import MEDIA_DIR, DEFAULT_FROM_EMAIL, BASE_DIR, STRIPE_PUBILC_KEY, STRIPE_PRIVATE_KEY, BASE_URL
from main.models import User
from main.forms import *
from main.generator_alg import *
from django.shortcuts import redirect
from django.contrib import messages
import json
from django.http import JsonResponse, RawPostDataException
from django.core.exceptions import PermissionDenied
# from .models import *
import json
# from .models import *

stripe.api_key = STRIPE_PRIVATE_KEY
# Create your views here.

def checkout_view(request):
    context = {}
    if request.user.username:
        if request.method == "POST":
            if 'product_button' in request.POST:
                price_id = request.POST.get("product_button")
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
                        # reverse('payments:success') # Increment credits
                        success_url=f"{BASE_URL}/checkout/" + \
                        "{CHECKOUT_SESSION_ID}",
                        cancel_url=f"{BASE_URL}/checkout/" + \
                        "{CHECKOUT_SESSION_ID}",

                        metadata={"price_id": price_id,
                                  "user_id": request.user.id}
                    )
                    request.session.set_expiry(86400)
                    request.session["payment_initial"] = True
                except Exception as e:
                    # print(e)
                    return render(request, "payments/checkout.html", context)

                return redirect(checkout_session.url, code=303)
            else:
                pass
                # print('Why you try hack us mbro????') # anti-hack page!!! scare them mofos!!
    else:
        error_params = {"title": "Permission Denied", "description": "Attempt to Pay for product when not logged in", "code": "325XD"}
        raise PermissionDenied(json.dumps(error_params))
    
    context['products'] = generate_stripe_products_context()
    return render(request, "payments/checkout.html", context)

def handle_checkout_session_view(request, session_id):
    context = {}
    checkout_session = None
    try:
        checkout_session = stripe.checkout.Session.retrieve(session_id)
    except Exception as e:
        # print(e)
        pass
    
    if checkout_session:

        if checkout_session["status"] == "open": # if session is still open - NOT PAID
            messages.error(request, f"Session Open - not paid for yet")
            context["payment_link"] = checkout_session["url"]

        elif checkout_session["status"] == "complete" and checkout_session["payment_status"] == "paid": ## if session is complete - PAID
            context["amount_paid"] = float(checkout_session["amount_total"]) / 100
            stripe_price_object = stripe.Price.retrieve(checkout_session["metadata"]["price_id"])
            context["credits_gained"] = stripe_price_object["nickname"]

            if "payment_initial" in request.session:
                # print(checkout_session["metadata"])
                fetched_user = User.objects.filter(id=checkout_session["metadata"]["user_id"]).first()
                # print(stripe_price_object)
                stripe_product_object = stripe.Product.retrieve(stripe_price_object["product"])
                # print(stripe_product_object)
                if fetched_user:
                    fetched_user.credits += int(stripe_price_object["nickname"]) ##NICKnAME (ACTUAL PRICE)
                    fetched_user.save()
                    del request.session["payment_initial"]
                    messages.success(request, f"You have gained {stripe_price_object['nickname']} credits! ")
                else:
                    messages.error(request, f"CRITICAL ERROR. PLEASE EMAIL GENERA-NOREPLY@gmail.com")
                ##PROVIDE CONTEXT FOR SUCCESS PAGE
            else:
                # print(checkout_session["metadata"])
                messages.error(request, f"NICE TRY BASTARD")

        elif checkout_session["status"] == "expired": ## if session is expired - PAID or NOT PAID AND AUTO EXPIRED

            messages.error(request, f"Session Expired")


    return render(request, "payments/cancel.html", context)