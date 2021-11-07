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
import json
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
    # users_imgs = UserAsset.objects.filter(user=request.user)

    def file_to_pil(file): #take POSt.request file that user sent over the form, and convert it into a PIL object.
        return Image.open(io.BytesIO(file.read()))
    calebs_gay_dict = {}
    if request.method == 'POST':
        if len(request.FILES) != 0:

            # calebs_gay_dict["CollectionName"] = "idiot user forgot to name collection"
            # calebs_gay_dict["Description"] = "idiot user forgot to give description"
            # calebs_gay_dict["Resolution"] = "idiot user no resolution smh"
            # calebs_gay_dict["CollectionSize"] = "idiot user no collection size"
            calebs_gay_dict["CollectionName"] = request.POST["name"]
            calebs_gay_dict["Description"] = request.POST["description"]
            calebs_gay_dict["Resolution"] = request.POST["resolution"]
            calebs_gay_dict["CollectionSize"] = request.POST["size"]
            layers = {}

            files_array = []
            n_textures = 0

            for filename, file in request.FILES.items():
                filename_components = filename.split(".")
                layer_name = filename_components[1]
                layer_type = filename_components[0] #asset or layer ?
                file_name = filename_components[-2]

                if filename_components[-1].lower() != "png":
                    continue

                if layer_name not in layers:
                    layers[layer_name] = {
                        "Assets" : [],
                        "Textures" : [],
                    }

                if layer_name in layers:
                    if layer_type == "asset":
                        layers[layer_name]["Assets"].append({
                            'Name': file_name,
                            'PIL': "TEST FOR JSON" , # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                            'Rarity': random.randint(1,10)
                        })
                    if layer_type == "texture":
                        layers[layer_name]["Textures"].append({
                            'Name': file_name,
                            'PIL': "TEST FOR JSON" , # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                            'Rarity': random.randint(1,10)
                        })
                    
            calebs_gay_dict["Layers"] = layers #calebd gay dict complete

            print(json.dumps(calebs_gay_dict, indent=4, sort_keys=True))
            ##BEFORE U SEND THIS SHIT OFF TO UR NUMPY DONT FORGET TO UNCOMMENT PIL ENTRIES IN THE DICT CREATOR ABOVE !!!

        #OLD TRASHCAN CODE FOR STORING IMG IN DATABASE HEHEHE
        # file_dir = f"user_asset_storage/{request.user.username}"
        # get_or_create_subdirectory(file_dir)
        # filename = uuid.uuid4().hex[:5]
        # generated_img.save(f"media/{file_dir}/{filename}.png")

        # asset_db = UserAsset.objects.create(user=request.user)
        # asset_db.name = request.POST["name"]
        # asset_db.image = f"{file_dir}/{filename}.png"
        # asset_db.save()
        # users_imgs = UserAsset.objects.filter(user=request.user)
        
        # print("SAVED TO DB")
            print(calebs_gay_dict)
            messages.success(request, message="YOU HAVE GENERATED THE IMAGE IDIOTTERMAN.... ITS IN DB !!!!")
            return render(request, 'upload.html', {'complete_json': calebs_gay_dict})
    return render(request, 'upload.html', {'complete_json': None})

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
