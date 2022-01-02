import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'genera.settings')

import django
import stripe
django.setup()

from main.models import *
from payments.models import *
from genera.settings import STRIPE_PRIVATE_KEY
stripe.api_key = STRIPE_PRIVATE_KEY

def populate_products_from_stripe():
    print('starting populate_products_from_stripe')
    all_products_list = stripe.Product.list(limit=10)["data"]
    for product in all_products_list:
        #get product price
        price = stripe.Price.list(product=product["id"], limit=1)["data"][0]
        Product.objects.get_or_create(
            name=product["name"], 
            description=product["description"], 
            price=price["unit_amount"],
            price_id=price["id"], 
            currency=price["currency"]
        )
    print('finished populate_products_from_stripe')

def populate():
    print('starting expy population script')

    #generate superuser for testing
    if not User.objects.filter(username="artem").exists():
        UserProfile.objects.create(user=User.objects.create_superuser(username="artem", password="1234"))
    else:
        print("USER ALREADY EXISTS - MAKE SURE TO WIPE DB!!!!")
    if not User.objects.filter(username="caleb").exists():
        UserProfile.objects.create(user=User.objects.create_superuser(username="caleb", password="1234"))
    


    else:
        print("USER ALREADY EXISTS - MAKE SURE TO WIPE DB!!!!")
    print("CREATED SUPERUSERS")

    populate_products_from_stripe()

    print('database populated succesfully')

if __name__ == '__main__':
    populate()