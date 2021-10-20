from django.shortcuts import render
from mysite.settings import MEDIA_DIR
from polls.generator_alg import *
from django.templatetags.static import static
from django.core.files.storage import FileSystemStorage
from django.shortcuts import redirect
from django.urls import reverse 
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from pathlib import Path
import base64
from PIL import Image
import numpy as np
import io
from .forms import *
from .models import *

# Create your views here.


def main_view(request):

    # if request.METHOD == "POST":

    created = createImage

    # x = generateRandomNumber(1, 3, 5)
    context = {}

    return render(request, 'home.html', context={"created": created})


def temp_view(request):

    # if request.METHOD == "POST":

    # created = createImage

    # x = generateRandomNumber(1, 3, 5)
    # context = {}

    return render(request, 'testerman.html')

def get_or_create_subdirectory(sd):
    Path(f"{MEDIA_DIR}/{sd}").mkdir(parents=True, exist_ok=True)

def upload_view(request):
    users_imgs = UserAsset.objects.filter(user=request.user)

    if request.method == 'POST':
        if len(request.FILES) != 0:
            files_array = []
            n_textures = 0

            for filename, file in request.FILES.items():
                
                file_obj = file.read()
                image = Image.open(io.BytesIO(file_obj))
                if filename.startswith("texture"):
                    files_array.insert(0, image)
                    n_textures += 1
                else:
                    files_array.append(image)
                
            generated_img = createImage(files_array, n_textures)
        
        file_dir = f"user_asset_storage/{request.user.username}"
        get_or_create_subdirectory(file_dir)
        filename = uuid.uuid4().hex[:5]
        generated_img.save(f"media/{file_dir}/{filename}.png")

        asset_db = UserAsset.objects.create(user=request.user)
        asset_db.name = request.POST["name"]
        asset_db.image = f"{file_dir}/{filename}.png"
        asset_db.save()
        users_imgs = UserAsset.objects.filter(user=request.user)
        
        print("SAVED TO DB")
        messages.success(request, message="YOU HAVE GENERATED THE IMAGE IDIOTTERMAN.... ITS IN DB !!!!")
        return render(request, 'upload.html', {'user_imgs': users_imgs})
    return render(request, 'upload.html', {'user_imgs': users_imgs})

def login_view(request):
    login_form = LoginForm()

    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        username = login_form['username'].value()
        password = login_form['password'].value()

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            messages.success(request, 'Login succesful!')
            return redirect(reverse('polls:upload'))
        else:
            login_form.add_error(None, "Incorrect details provided - Please try again")
    
        print(login_form.errors)
    
    return render(request, 'login.html', {"login_form" : login_form})
