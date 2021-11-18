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
from django.http import JsonResponse, RawPostDataException
from django.core.exceptions import PermissionDenied
import base64
from PIL import Image
import numpy as np
import io
from .forms import *
from .models import *

# Create your views here.


def main_view(request):

    # if request.METHOD == "POST":

    created = create_and_save_collection

    # x = generateRandomNumber(1, 3, 5)
    context = {}

    return render(request, "home.html", context={"created": created})


def temp_view(request):

    # if request.METHOD == "POST":

    # created = create_and_save_collection

    # x = generateRandomNumber(1, 3, 5)
    # context = {}

    return render(request, "testerman.html")


def get_or_create_subdirectory(sd):
    Path(f"{MEDIA_DIR}/{sd}").mkdir(parents=True, exist_ok=True)


def upload_view(request):
    # users_imgs = UserAsset.objects.filter(user=request.user)
    context = {}

    def file_to_pil(
        file,
    ):  # take POSt.request file that user sent over the form, and convert it into a PIL object.
        return Image.open(io.BytesIO(file.read()))

    calebs_gay_dict = {}



    if request.method == "POST":
        if len(request.FILES) != 0:
            calebs_gay_dict["CollectionName"] = request.POST["name"]
            calebs_gay_dict["Description"] = request.POST["description"]
            calebs_gay_dict["Resolution"] = int(float(request.POST["resolution"]))
            calebs_gay_dict["CollectionSize"] = int(float(request.POST["size"]))
            layers = {}

            db_collection = UserCollection.objects.get_or_create(user=request.user, collection_name=calebs_gay_dict["CollectionName"])
            if db_collection[1]:
                db_collection = db_collection[0]
            else:
                messages.error(
                    request,
                    message="YOU ALREADY HAVE A COLLECTION WITH THAT NAME! !!! ! ! ! !! ",
                )
                # raise PermissionDenied()

            db_collection.description = calebs_gay_dict["Description"]
            db_collection.dimension_x = calebs_gay_dict["Resolution"]
            db_collection.dimension_y = calebs_gay_dict["Resolution"]
            db_collection.collection_size = calebs_gay_dict["CollectionSize"]
            rarity_map = json.loads(request.POST["rarity_map"])
            print(rarity_map)

            for filename, file in request.FILES.items():
                filename_components = filename.split(".")
                layer_name = filename_components[1]
                layer_type = filename_components[0]  # asset or layer ?
                file_name = filename_components[-2]

                if filename_components[-1].lower() != "png":
                    continue

                if layer_name not in layers:
                    layers[layer_name] = {
                        "Assets": [],
                        "Textures": [],
                    }

                if layer_name in layers:
                    if layer_type == "asset":
                        layers[layer_name]["Assets"].append(
                            {
                                "Name": file_name,
                                "PIL": file_to_pil(
                                    file
                                ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                "Rarity": int(float(rarity_map[filename])),
                            }
                        )
                    if layer_type == "texture":
                        layers[layer_name]["Textures"].append(
                            {
                                "Name": file_name,
                                "PIL": file_to_pil(
                                    file
                                ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                "Rarity": int(float(rarity_map[filename])),
                            }
                        )

            calebs_gay_dict["Layers"] = layers  # calebd gay dict complete

            # print(json.dumps(calebs_gay_dict, indent=4, sort_keys=True))
            ##BEFORE U SEND THIS SHIT OFF TO UR NUMPY DONT FORGET TO UNCOMMENT PIL ENTRIES IN THE DICT CREATOR ABOVE !!!

            # OLD TRASHCAN CODE FOR STORING IMG IN DATABASE HEHEHE
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

            create_and_save_collection(calebs_gay_dict, db_collection, request.user)

            CollectionImage.objects.filter(linked_collection__id=db_collection.id)
            
            db_collection_images = CollectionImage.objects.filter(linked_collection__id=db_collection.id)

            context["collection"] = db_collection
            context["collection_images"] = db_collection_images
            context["complete_json"] = calebs_gay_dict

            messages.success(
                request,
                message="YOU HAVE GENERATED THE IMAGE IDIOTTERMAN.... ITS IN DB !!!!",
            )
            # return render(request, "upload.html", {"complete_json": calebs_gay_dict})

    else:
        print("ASS")
        db_collection = UserCollection.objects.filter(user=request.user).first()
        if db_collection:
            db_collection_images = CollectionImage.objects.filter(linked_collection__id=db_collection.id)
            context["collection"] = db_collection
            context["collection_images"] = db_collection_images

    return render(request, "upload.html", context)


def login_view(request):
    login_form = LoginForm()

    if request.method == "POST":
        login_form = LoginForm(request.POST)
        username = login_form["username"].value()
        password = login_form["password"].value()

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            messages.success(request, "Login succesful!")
            return redirect(reverse("polls:upload"))
        else:
            login_form.add_error(None, "Incorrect details provided - Please try again")

        print(login_form.errors)

    return render(request, "login.html", {"login_form": login_form})


def mint_view(request):

    # if request.METHOD == "POST":

    # created = create_and_save_collection

    # x = generateRandomNumber(1, 3, 5)
    # context = {}

    return render(request, "mint.html")


def metamask_view(request):
    if request.method == "POST":
        ##AJAX HANDLING SECTION START
        try:
            received_json_data = json.loads(request.body)
            if 'ajax_test' in received_json_data: #handle
                print(received_json_data["ajax_test"]) ##print on server console the clientside message - u can pass any data u want from the js like this
                ##Here you can do anything you want now. Access models, make changes, etc..
                if request.user.is_authenticated:
                    return JsonResponse(
                        {"server_message": f"Server said hello from {request.user.username}!"}, status=200
                    )
                else:
                    return JsonResponse(
                        {"server_message": f"Server said hello from Anonymouse user!"}, status=200
                    )
       
        except RawPostDataException: #NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
            pass
        ##AJAX HANDLING SECTION END


    return render(request, "metamask.html", {"url": reverse("polls:metamask")})
