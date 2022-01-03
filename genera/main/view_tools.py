from main.models import Token
from main.models import User
from genera.settings import BASE_URL
import uuid
from django.urls import reverse
from genera.settings import STRIPE_PRIVATE_KEY
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

def generate_stripe_products_context():
    products =  []
    all_prices_list = stripe.Price.list(limit=10)["data"]
    for price in all_prices_list:
        product = stripe.Product.retrieve(price["product"])
        product_data = {}
        product_data["name"] = product["name"]
        product_data["description"] = product["description"]
        product_data["price"] = price["unit_amount"]
        product_data["currency"] = price["currency"]
        product_data["price_id"] = price["id"]
        products.append(product_data)
    return products