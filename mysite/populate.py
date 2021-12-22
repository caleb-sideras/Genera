import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

import django
django.setup()

from polls.models import User
from polls.models import UserProfile

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

    print('database populated succesfully')

if __name__ == '__main__':
    populate()