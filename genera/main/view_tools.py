from main.models import Token
from main.models import User
from genera.settings import BASE_URL
import uuid
from django.urls import reverse

def get_absolute_path():
    return BASE_URL

def get_current_path(request):
    print(request.get_full_path())
    return f"{BASE_URL}{request.get_full_path()}"

make_absolute_path = lambda x: f"{BASE_URL}{x}"

def generate_token(request, type="A", user=None):
    token_instance, existing_token = Token.objects.get_or_create(user=user, type=type)

    if not existing_token: #if object exists - need override.
        token_instance.hash = uuid.uuid4()
        token_instance.save()
    
    token_url =  f"{get_current_path(request)}/{token_instance.hash}"
    print(token_url)
        
    return {"token_instance": token_instance, "token_url": token_url}