from django.shortcuts import render
from mysite.settings import MEDIA_DIR
from polls.forms import *
from polls.generator_alg import *
from polls.contract_interaction import *
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

    # created = create_and_save_collection

    # x = generateRandomNumber(1, 3, 5)
    # context = {}

    return render(request, "home.html") #, context={"created": created}


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
            #TEST FILE TRANSFER CODE
            # file_count = 0
            # for filename in request.FILES.keys():
            #     for file in request.FILES.getlist(filename): ##for this set of file get layer name and layer type
            #         if "$" in filename: ##handle mutliple files.
            #             individual_files = filename.split("$")
            #             if individual_files:
            #                 layer_name = individual_files[0].split(".")[1]
            #                 layer_type = individual_files[0].split(".")[0]
            #         else: ##handle 1 file
            #             layer_name = filename.split(".")[1]
            #             layer_type = filename.split(".")[0]
            #         file_name_no_extension = file.name.split(".")[0]
            #         file_name_extension = file.name.split(".")[1]
            #         # print(f"{layer_name}.{layer_type}.{file_name_no_extension}.{file_name_extension}")
            #         print(file.name)
            #         file_count += 1
            # print(f"Number of files: {file_count}")
            # print(request.POST["rarity_map"])
            # return render(request, "upload.html", context)


            if request.POST["rarity_map"] == "":
                messages.error(request, message="No rarities attached")
                return render(request, "upload.html", context)

            rarity_map = json.loads(request.POST["rarity_map"])
            calebs_gay_dict["CollectionName"] = request.POST["name"]
            calebs_gay_dict["Description"] = request.POST["description"]
            calebs_gay_dict["Resolution"] = int(float(request.POST["resolution"]))
            calebs_gay_dict["CollectionSize"] = int(float(request.POST["size"]))
            calebs_gay_dict["TextureColor"] = request.POST["color"]
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
            
            for filename in request.FILES.keys():
                for file in request.FILES.getlist(filename): ##for this set of file get layer name and layer type
                    if "$" in filename: ##handle mutliple files.
                        individual_files = filename.split("$")
                        if individual_files:
                            layer_type = individual_files[0].split(".")[0]
                            layer_name = individual_files[0].split(".")[1]
                    else: ##handle 1 file
                        layer_type = filename.split(".")[0]
                        layer_name = filename.split(".")[1]
                    file_name_no_extension = file.name.split(".")[0]
                    file_name_extension = file.name.split(".")[1]
                    full_file_name = f"{layer_type}.{layer_name}.{file_name_no_extension}.{file_name_extension}"

                    if file_name_extension.lower() != "png":
                        continue

                    if layer_name not in layers:
                        layers[layer_name] = {
                            "Assets": [],
                            "Textures": [],
                        }

                    if layer_name in layers:
                        if layer_type == "asset":
                            if int(float(rarity_map[full_file_name]) > 0):  # if rarity > 0
                                layers[layer_name]["Assets"].append(
                                    {
                                        "Name": file_name_no_extension,
                                        "PIL": file_to_pil(
                                            file
                                        ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                        "Rarity": int(float(rarity_map[full_file_name])),
                                    }
                                )
                        if layer_type == "texture":
                            if int(float(rarity_map[full_file_name]) > 0):  # if rarity > 0
                                layers[layer_name]["Textures"].append(
                                    {
                                        "Name": file_name_no_extension,
                                        "PIL": file_to_pil(
                                            file
                                        ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                        "Rarity": int(float(rarity_map[full_file_name])),
                                    }
                                )

            calebs_gay_dict["Layers"] = layers  # calebd gay dict complete

            print(calebs_gay_dict["Layers"])

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

def logout_view(request):

    logout(request)
    messages.success(request, 'Logged out Succesfully!')
    return redirect(reverse('polls:main_view'))

def register_view(request):
    registered = False
    
    if request.method == 'POST':
        user_form = UserRegisterForm(request.POST)
        # profile_form = UserRegisterProfileForm(request.POST)
           
        if user_form.is_valid() and user_form.cleaned_data['password'] == user_form.cleaned_data['password_confirm']:
            
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            UserProfile.objects.create(user=user)
            # profile = profile_form.save(commit=False)
            # profile.user = user
            # profile.save()
            registered = True
            login(request,user)
            messages.success(request, 'Registration Succesful!')
            return redirect(reverse('polls:main_view'))

        elif user_form.cleaned_data['password'] != user_form.cleaned_data['password_confirm']:
             user_form.add_error('password_confirm', 'The passwords do not match - please enter 2 matching passwords')
        else:
            print(user_form.errors)
    
    else:
        user_form = UserRegisterForm()
        # profile_form = UserProfileForm()
    
    return render(request, 'register.html', context={'register_form': user_form, 'registered': registered})



def profile_view(request, username):
    user = User.objects.filter(username=username).first()
    owner = (request.user.username == username)

    if not user:
        messages.error(request, "NO SUCH PROFILE EXISTS - redirected to main !!!!")
        return redirect(reverse("polls:main_view"))

    return render(request, 'user_profile.html', context={"owner":owner, "user":user})



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
            # collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)
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
            context["url"] = reverse("polls:collection", 
                    kwargs={
                        "username": request.user.username,
                        "collection_name": user_collection.collection_name,
                    },)
            collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)
            context["collection_data"] = user_collection
            context["collection_images"] = collection_images
            # for entry in collection_images:
            #     # context['hello_king'] = json.dumps(entry.metadata)
            #     # print(type(entry.metadata))
            #     # print(type(context['hello_king']))
            #     # print(context['hello_king'])
            #     # print(json.loads(context['hello_king']))
            #     # print(type(json.loads(context['hello_king'])))
            #     print(entry.metadata)
            #     # print(json.load(entry.metadata))
            #     break
            # print(context["collection_images"])
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
            # make this a async function for speed!!!!! Will need db changes
            if "notneeded" in received_json_data:  # handle
                pinata_links =[]
                entry_names =[]
                if request.user.is_authenticated:     
                    for entry in collection_images:
                        if not entry.deployed_bool:
                            if not entry.ipfs_bool: 
                                print(entry.name)
                                
                                # uploading image to ipfs & updating db
                                pinata_link_image = upload_pinata_filepath(entry.path[1:], entry.name)
                                entry.ipfs_image_path = f"https://ipfs.io/ipfs/{pinata_link_image['IpfsHash']}"

                                # getting entry metadata
                                temp_metadata = entry.metadata
                                print(type(temp_metadata))
                                print(json.loads(temp_metadata))
                                temphello =json.loads(temp_metadata)
                                # print(temphello)
                                # print(temphello["name"])
                                
                                temphello["image"] = f"https://ipfs.io/ipfs/{pinata_link_image['IpfsHash']}"
                                entry.metadata = json.dumps(temphello)
                                # print(temphello["image"])
                                # entry.metadata = json.dumps(temp_metadata)
                                # uploading metadata w/image to ipfs & updating db
                                pinata_link_data = upload_pinata_object(json.dumps(temphello), entry.name)
                                entry.ipfs_metadata_path = f"https://ipfs.io/ipfs/{pinata_link_data['IpfsHash']}"
                                entry.ipfs_bool = True
                                entry.save()
                            pinata_links.append(entry.ipfs_metadata_path)
                            entry_names.append(entry.name)
                    user_collection.collection_ifps_bool = True
                    user_collection.save()
                    # for entry in collection_images:
                    #     print(entry.ipfs_metadata_path)
                    return JsonResponse(
                        { # dont need links here, should be sent after deployment and secondary contract test
                            "ipfs_links": pinata_links,
                            "entries" : entry_names
                        },
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "address_check" in received_json_data:
                if request.user.is_authenticated:
                    if user_collection.contract_bool:
                        print("In db")
                        temp ={
                        'address_bool': True,
                        'collection_address': user_collection.contract_address
                        }
                    else:
                        print("Not in db")
                        temp ={
                        'address_bool': False
                        }
                    return JsonResponse(
                        temp,
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "address_set" in received_json_data:
                if request.user.is_authenticated:
                    user_collection.contract_address = received_json_data["address_set"]
                    user_collection.contract_bool = True
                    user_collection.save()

                # should be a refresh button and only on a secondary mint press, loading screen = 'Reading the smart contract'
                    # IDEA, immediately set transaction hash, so only checks entries with txHashes. Careful, still have to check TokenURI/metadata_path, as the txHashes could have failed
                    tokenURIs = read_contract(user_collection.contract_address)
                    IPFS_links = []
                    entry_names = []
                    
                    for entry in collection_images: # also could iterate over not deployed_bool
                        if entry.deployed_txhash and not entry.deployed_bool: #would save iterations if did only txhash[true] & make almost 100% fool proof, can iterate over ifps_deployed
                            if tokenURIs:
                                for value in tokenURIs:
                                    # print(f"{entry.ipfs_metadata_path} {value}")
                                    if entry.ipfs_metadata_path == value:
                                        entry.deployed_bool = True
                                        entry.save()
                        if not entry.deployed_bool:
                            IPFS_links.append(entry.ipfs_metadata_path)
                            entry_names.append(entry.name)
                        # ABOVE, check if token not deployed, then compare it's tokenURI to the ipfs_metadata_path. If not the same, then deploy token. If the same, the set it as deployed. 
                    return JsonResponse(
                        {"server_message" :"Contract address Set",
                        "ipfs_links": IPFS_links,
                        "entries" : entry_names
                        },
                        status = 200
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "token_deployed" in received_json_data:
                if request.user.is_authenticated:
                    counter = 0
                    for entry in collection_images:
                        counter = counter + 1
                        if entry.name.strip() == received_json_data['token_deployed'].strip():
                            # print(f"{entry.name} {received_json_data['token_deployed']}")
                            entry.deployed_bool = True
                            entry.save()
                            if user_collection.collection_size == counter:
                                user_collection.tokens_deployed = True
                                user_collection.save()
                            break
                    
                    return JsonResponse(
                        {"server_message": "Entry contract_bool flipped"},
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "store_txhash" in received_json_data:
                if request.user.is_authenticated:
                    for entry in collection_images:
                        if entry.name.strip() == received_json_data['entry'].strip():
                            entry.deployed_txhash = received_json_data['store_txhash']
                            entry.save()
                    
                    return JsonResponse(
                        {"server_message": "txhash saved"},
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
        try:
            response = requests.post(
                "https://api.pinata.cloud/" + "pinning/pinFileToIPFS",
                files={"file": (filename, image_binary)},
                headers={
                    "pinata_api_key": "d15d7ee40273fd0f49ad",
                    "pinata_secret_api_key": "ed514d486b0c4ab94dcfbff65174d98cc044a3885d40ec65d1dff4ffb2cb1c68",
                },
            ) 
        except requests.exceptions.HTTPError as e:
            print(e.response.text)
        return response.json()

def upload_pinata_object(fileobject, filename):
    try:
        response = requests.post(
            "https://api.pinata.cloud/" + "pinning/pinFileToIPFS",
            files={"file": (filename, fileobject)},
            headers={
                "pinata_api_key": "d15d7ee40273fd0f49ad",
                "pinata_secret_api_key": "ed514d486b0c4ab94dcfbff65174d98cc044a3885d40ec65d1dff4ffb2cb1c68",
            },
        ) 
    except requests.exceptions.HTTPError as e:
        print(e.response.text)
    return response.json()

