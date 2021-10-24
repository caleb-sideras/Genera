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
    users_imgs = UserAsset.objects.filter(user=request.user)

    def file_to_pil(file): #take POSt.request file that user sent over the form, and convert it into a PIL object.
        return Image.open(io.BytesIO(file.read()))

    if request.method == 'POST':
        if len(request.FILES) != 0:
            calebs_gay_dict = {}

            # calebs_gay_dict["CollectionName"] = "idiot user forgot to name collection"
            # calebs_gay_dict["Description"] = "idiot user forgot to give description"
            # calebs_gay_dict["Resolution"] = "idiot user no resolution smh"
            # calebs_gay_dict["CollectionSize"] = "idiot user no collection size"
            calebs_gay_dict["CollectionName"] = request.POST["name"]
            calebs_gay_dict["Description"] = request.POST["description"]
            calebs_gay_dict["Resolution"] = request.POST["resolution"]
            calebs_gay_dict["CollectionSize"] = request.POST["size"]
            layers = {}
            all_textures = []

            files_array = []
            n_textures = 0

            for filename, file in request.FILES.items():
                filename_components = filename.split(".")
                if filename_components[-1] != "png":
                    continue
                if filename_components[0] == "asset": #if asset detected from post request
                    if filename_components[1] in layers:
                        layers[filename_components[1]]["Assets"].append({
                            'Name': filename_components[-2],
                            'PIL': "TEST FOR JSON" , # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                            'Rarity': random.randint(1,10)
                        })
                    else:
                         layers[filename_components[1]] = {
                             "Assets" : [],
                             "Textures" : []
                         }
                         layers[filename_components[1]]["Assets"].append({
                            'Name': filename_components[-2],
                            'PIL': "TEST FOR JSON" , # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                            'Rarity': random.randint(1,10)
                        })
                elif filename_components[0] == "texture": #if texture detected - add to all texture list for later processing
                    all_textures.append({
                        'Name': filename_components[-2],
                        'PIL': "TEST FOR JSON" , # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                        'Rarity': random.randint(1,10)
                    } )
                
            for layer in layers.keys():
                layers[layer]["Textures"] = all_textures[0:random.randint(1, len(all_textures)) + 1] ##Adds random number of textures, from all textures list

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
