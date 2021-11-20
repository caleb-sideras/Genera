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
from django.dispatch import receiver
from django.db.models.signals import pre_delete
import shutil
import requests
import json
import os

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
            if request.POST["rarity_map"] == "":
                messages.error(request, message="No rarities attached")
                return render(request, "upload.html", context)

            rarity_map = json.loads(request.POST["rarity_map"])
            calebs_gay_dict["CollectionName"] = request.POST["name"]
            calebs_gay_dict["Description"] = request.POST["description"]
            calebs_gay_dict["Resolution"] = int(float(request.POST["resolution"]))
            calebs_gay_dict["CollectionSize"] = int(float(request.POST["size"]))
            layers = {}

            db_collection = UserCollection.objects.get_or_create(
                user=request.user, collection_name=calebs_gay_dict["CollectionName"]
            )
            if db_collection[1]:
                db_collection = db_collection[0]
            else:
                messages.error(
                    request,
                    message="YOU ALREADY HAVE A COLLECTION WITH THAT NAME! !!! ! ! ! !! ",
                )
                return render(request, "upload.html", context)

            db_collection.description = calebs_gay_dict["Description"]
            db_collection.dimension_x = calebs_gay_dict["Resolution"]
            db_collection.dimension_y = calebs_gay_dict["Resolution"]
            db_collection.collection_size = calebs_gay_dict["CollectionSize"]
            db_collection.path = f"/media/users/{request.user.username}/collections/{calebs_gay_dict['CollectionName'].replace(' ', '_')}"
            db_collection.save()

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
                        if int(float(rarity_map[filename])) > 0:  # if rarity > 0
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
                        if int(float(rarity_map[filename])) > 0:  # if rarity > 0
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

            # print("SAVED TO DB")
            # print(calebs_gay_dict)

            create_and_save_collection(calebs_gay_dict, db_collection, request.user)

            messages.success(
                request,
                message="YOU HAVE GENERATED THE IMAGE - Redirectied to the newly created collection!!!!",
            )
            return redirect(
                reverse(
                    "polls:collection",
                    kwargs={
                        "username": request.user.username,
                        "collection_name": db_collection.collection_name,
                    },
                )
            )
        else:  # no files submitted
            messages.success(request, message="NO FIELS ATTACHED!!!!")
            return render(request, "upload.html", context)

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


@receiver(pre_delete, sender=UserCollection)
def model_delete(sender, instance, **kwargs):
    try:
        shutil.rmtree(instance.path[1:])
        print("Collection folder deleted from server succesfully")
    except:
        print("Deletion of files failed OR files did not exist in the first place")


def all_collections_view(request, username):
    context = {}

    user = User.objects.filter(username=username).first()
    context["user"] = user

    if user:
        users_collections = UserCollection.objects.filter(user=user)
        print(users_collections)
        if users_collections:
            context["users_collections"] = users_collections
        else:
            print("User has no collections.")
            messages.error(request, "You have no collections!")
            return render(request, "collection.html", context)

    return render(request, "all_collections.html", context)


def collection_view(request, username, collection_name):
    context = {}

    with open("static/Contracts/erc721_contract.json", "r") as myfile:
        data = myfile.read()
    json_string = json.loads(data)
    context["erc721_json"] = json.dumps(json_string)
    # print(context)

    user = User.objects.filter(username=username).first()
    context["user"] = user

    if user:
        user_collection = UserCollection.objects.filter(user=user, collection_name=collection_name).first()
        if user_collection:
            collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)
            context["collection_data"] = user_collection
            context["collection_images"] = collection_images
        else:
            messages.error(request, "COLLECTION DOES NOT EXIST !! !! !!!! !! ! !  !!!!!")
            return render(request, "collection.html", context)
    else:
        messages.error(request, "NOT LOGGED IN !!!!!")
        return render(request, "collection.html", context)

    if request.method == "POST":
        ##AJAX HANDLING SECTION START
        try:
            received_json_data = json.loads(request.body)
            if "notneeded" in received_json_data:  # handle
                print(received_json_data["notneeded"])  ##print on server console the clientside message - u can pass any data u want from the js like this
                ##Here you can do anything you want now. Access models, make changes, etc..
                pinata_links =[]
                if request.user.is_authenticated:     
                    for entry in collection_images: 
                        print(entry.name)
                        
                        # uploading image to ipfs
                        pinata_link_image = upload_pinata_filepath(entry.path[1:], entry.name)
                        temp_metadata = entry.metadata
                        temp_metadata["image"] = f"https://ipfs.io/ipfs/{pinata_link_image['IpfsHash']}"

                        # uploading metadata w/image to ipfs
                        pinata_link_data = upload_pinata_object(json.dumps(temp_metadata), entry.name)
                        pinata_links.append(f"https://ipfs.io/ipfs/{pinata_link_data['IpfsHash']}")
                    print(pinata_links)
                    return JsonResponse(
                        {
                            "ipfs_links": pinata_links
                        },
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )

        except RawPostDataException:  # NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
            pass
        ##AJAX HANDLING SECTION END

    return render(request, "collection.html", context)


def upload_pinata_filepath(filepath, filename):
    with Path(filepath).open("rb") as fp:
        image_binary = fp.read()
        response = requests.post(
            "https://api.pinata.cloud/" + "pinning/pinFileToIPFS",
            files={"file": (filename, image_binary)},
            headers={
                "pinata_api_key": "d15d7ee40273fd0f49ad",
                "pinata_secret_api_key": "ed514d486b0c4ab94dcfbff65174d98cc044a3885d40ec65d1dff4ffb2cb1c68",
            },
        ) # handle edge cases
        # print(response.json())
        return response.json()

def upload_pinata_object(fileobject, filename):
    response = requests.post(
            "https://api.pinata.cloud/" + "pinning/pinFileToIPFS",
            files={"file": (filename, fileobject)},
            headers={
                "pinata_api_key": "d15d7ee40273fd0f49ad",
                "pinata_secret_api_key": "ed514d486b0c4ab94dcfbff65174d98cc044a3885d40ec65d1dff4ffb2cb1c68",
            },
        ) # handle edge cases
        # print(response.json())
    return response.json()


def metamask_view(request):
    context = {}

    with open("static/Contracts/erc721_contract.json", "r") as myfile:
        data = myfile.read()
    json_string = json.loads(data)
    context["erc721_json"] = json.dumps(json_string)

    if request.method == "POST":
        ##AJAX HANDLING SECTION START
        try:
            received_json_data = json.loads(request.body)
            if "ajax_test" in received_json_data:  # handle
                print(
                    received_json_data["ajax_test"]
                )  ##print on server console the clientside message - u can pass any data u want from the js like this
                ##Here you can do anything you want now. Access models, make changes, etc..
                if request.user.is_authenticated:
                    return JsonResponse(
                        {
                            "server_message": f"Server said hello from {request.user.username}!"
                        },
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": f"Server said hello from Anonymouse user!"},
                        status=200,
                    )

        except RawPostDataException:  # NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
            pass
        ##AJAX HANDLING SECTION END

    context["url"] = reverse("polls:metamask")
    return render(request, "metamask.html", context)
