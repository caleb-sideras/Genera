from django.http.response import JsonResponse
from main.models import Token
from main.models import User
from genera.settings import BASE_URL
import uuid
from django.urls import reverse
from genera.settings import STRIPE_PRIVATE_KEY
from django.contrib import messages
import json
import stripe
stripe.api_key = STRIPE_PRIVATE_KEY

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
        print(price)
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

