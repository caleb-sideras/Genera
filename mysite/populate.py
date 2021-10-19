import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

import django
django.setup()

from django.contrib.auth.models import User

def populate():
    print('starting expy population script')

    #generate superuser for testing
    print("CREATED SUPERUSER")
    User.objects.create_superuser(username="artleb", password="1234")
    
    print('database populated succesfully')

if __name__ == '__main__':
    populate()