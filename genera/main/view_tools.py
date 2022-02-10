from django.http.response import JsonResponse
from main.models import Token
from main.models import User
from genera.settings import BASE_URL, STATIC_DIR
import uuid
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib import messages
from genera.settings import STRIPE_PRIVATE_KEY
import stripe
stripe.api_key = STRIPE_PRIVATE_KEY
import re
from datetime import datetime, timedelta
from functools import wraps
from django.http import HttpResponseRedirect
import json
from django.core.exceptions import PermissionDenied

def get_absolute_path():
    return BASE_URL

def get_current_path(request):
    print(request.get_full_path())
    return f"{BASE_URL}{request.get_full_path()}"

def generate_token(request, type="A", user=None):
    token_instance, existing_token = Token.objects.get_or_create(user=user, type=type)

    if not existing_token: #if object exists - need override.
        token_instance.hash = uuid.uuid4()
        token_instance.save()
    
    token_url =  f"{get_current_path(request)}/{token_instance.hash}"
    print(token_url)
        
    return {"token_instance": token_instance, "token_url": token_url}

def ajax_redirect(url = ""):
    return JsonResponse({"url": url}, status=201)

#STRIPE HELPER FUNCTIONS
def generate_stripe_products_context():
    products =  []
    all_prices_list = stripe.Price.list(limit=10)["data"]
    for price in all_prices_list:
        product = stripe.Product.retrieve(price["product"])
        product_data = {}
        product_data["name"] = product["name"]
        product_data["description"] = product["description"]
        product_data["price"] = price["unit_amount"] / 100
        product_data["currency"] = price["currency"]
        product_data["price_id"] = price["id"]
        products.append(product_data)
    return products

#status = expired/complete/open
def fetch_stripe_session_history_for_user(status):
    def specific_session_history(user):
        sessions = stripe.checkout.Session.list()["data"]
        user_sessions = [session for session in sessions if session["metadata"]["user_id"] == str(user.id) and session["status"] == status]
        return user_sessions
        
    return specific_session_history
#3 functions to get different sessions from a user.
stripe_user_session_history_open = fetch_stripe_session_history_for_user("open")
stripe_user_session_history_expired = fetch_stripe_session_history_for_user("expired")
stripe_user_session_history_complete = fetch_stripe_session_history_for_user("complete")

def fetch_stripe_session_product_and_price(stripe_session_obbject):
    
    price = stripe.Price.retrieve(stripe_session_obbject["metadata"]["price_id"])
    product = stripe.Product.retrieve(price["product"])
    return (product,price)

staticify = lambda x: f"{STATIC_DIR}/{x}"


def presigned_url_is_expired(url, days_to_expire=7):
    url_created = re.findall(r"(?<=Date=).+(?=Z)", url)
    if url_created:
        url_created = url_created[0]
    else:
        return False #if no url date is found - return false, meaning its either LOCALHOST path or we parsed wrong url, in which case its best to return False to avoid infinite loops.
    date_time_obj = datetime.strptime(url_created, '%Y%m%dT%H%M%S')

    if days_to_expire==7: ##hardcoded if we know the number of days to expire.
        expiry = date_time_obj + timedelta(days=days_to_expire)
    else: #otherwise, extract that from the url.
        url_expires = re.findall(r"(?<=Expires=).+(?=&X-Amz-SignedHeaders)", url)
        if url_expires:
            expiry_seconds = url_expires[0]
        else:
            return False
        expiry = date_time_obj + timedelta(seconds=int(expiry_seconds))
        print(expiry)

    if datetime.today() > expiry:
        return True
    else:
        return False

def raise_permission_denied(title, description, code="404"):
    error_params = {"title": title, "description": description, "code": code}
    raise PermissionDenied(json.dumps(error_params))

def clientside_error_with_redirect(request, message, redirect_url="main:main_view"):
    messages.error(request, message)
    return redirect(reverse(redirect_url))
    
def clientside_success_with_redirect(request, message, redirect_url):
    messages.success(request, message)
    return redirect(reverse(redirect_url))
    
def requires_user_logged_in(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise_permission_denied("User not authenticated", "You are not logged in. Please log in to be able to view this page.")
        return function(request, *args, **kwargs)
    return wrap

