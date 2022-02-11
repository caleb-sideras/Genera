import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'genera.settings')

import django
import stripe
import json
import payments
django.setup()

from main.models import *
# from payments.models import *
from genera.settings import STRIPE_PRIVATE_KEY
stripe.api_key = STRIPE_PRIVATE_KEY

def populate():
    print('starting Genera population script')

    #generate superuser for testing
    if not User.objects.filter(username="artem").exists():
        UserProfile.objects.create(user=User.objects.create_superuser(username="artem", password="1234", credits=1000))
    else:
        print("USER ALREADY EXISTS - MAKE SURE TO WIPE DB!!!!")
    if not User.objects.filter(username="caleb").exists():
        UserProfile.objects.create(user=User.objects.create_superuser(username="caleb", password="1234", credits=1000))
    


    else:
        print("USER ALREADY EXISTS - MAKE SURE TO WIPE DB!!!!")
    print("CREATED SUPERUSERS")

    print('database populated succesfully')

if __name__ == '__main__':
    populate()