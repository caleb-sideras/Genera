from polls.models import Token
from django.contrib.auth.models import User
from mysite.settings import BASE_URL
import uuid

def get_absolute_path():
    return BASE_URL

def get_current_path(request):
    return f"{BASE_URL}/{request.get_full_path}"

def generate_token(request, type="A", user=None):
    token_instance, existing_token = Token.objects.get_or_create(user=user, type=type)

    if not existing_token: #if object exists - need override.
        token_instance.hash = uuid.uuid4()
        token_instance.save()
    
    token_url =  f"{get_current_path(request)}/{token_instance.hash}"
        
    return {"token_instance": token_instance, "token_url": token_url}