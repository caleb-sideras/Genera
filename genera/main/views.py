from time import timezone
from django.http.response import HttpResponse
from django.shortcuts import render
from main.view_tools import generate_token, generate_stripe_products_context
from genera.settings import MEDIA_DIR, DEFAULT_FROM_EMAIL, BASE_DIR, STRIPE_PUBILC_KEY, STRIPE_PRIVATE_KEY
from main.models import User
from main.forms import *
from main.generator_alg import *
from main.contract_interaction import *
from django.templatetags.static import static
from django.core import serializers
from django.core.files.storage import FileSystemStorage
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from pathlib import Path
import json
from django.http import JsonResponse, RawPostDataException
from django.core.exceptions import PermissionDenied, ValidationError, BadRequest
import base64
from PIL import Image, ImageColor
import numpy as np
import io
from django.core.mail import send_mail
from .forms import *
from .models import *
from django.dispatch import receiver
from django.db.models.signals import pre_delete
import shutil
import requests
import json
from django.db.models import Q
import os
from datetime import timezone
from django.template.loader import render_to_string
from io import BytesIO
import cv2
from genera.tools import Timer
import stripe
# Create your views here.
t = Timer()
stripe.api_key = STRIPE_PRIVATE_KEY

def main_view(request):
    context = {}
    context['products'] = generate_stripe_products_context()
    
    return render(request, "home.html", context)

def upload_view(request):
    # users_imgs = UserAsset.objects.filter(user=request.user)
    context = {}
    context["ajax_url"] = reverse("main:upload")
    def file_to_pil(file, res_x, res_y):  # take POSt.request file that user sent over the form, and convert it into a PIL object.
        t.start()
        PIL_image = Image.open(io.BytesIO(file.read()))
        horo, vert = PIL_image.size
        if horo != res_x or vert != res_y:
            PIL_image = PIL_image.resize((res_x, res_y))
        
        t.stop()
        return PIL_image

    def file_to_pil_cv2(file, res_x, res_y):  # Use this in case we make use of numpy arrays instead of PIL objects. Return after cv2.cvtColor to get the array.
        timeit_start = time.time()

        PIL_image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
        PIL_image = cv2.cvtColor(PIL_image, cv2.COLOR_BGRA2RGBA)
        height, width, channels = PIL_image.shape
        if height != res_x or width != res_y:
            print("reshaping")
            PIL_image = cv2.resize(PIL_image, dsize=[res_x, res_y], interpolation=cv2.INTER_CUBIC)

        timeit_end = time.time()
        PIL_image = Image.fromarray(PIL_image)
        print(f"Time taken individual pil open: {timeit_end-timeit_start:.3f}s")
        
        return PIL_image
    
    def pil_to_bytes(pil_img):
        t.start()
        
        cv2_img = cv2.imencode('.png', np.array(pil_img))[1].tobytes()
        bytes = base64.b64encode(cv2_img).decode('utf-8')

        t.stop()
        return bytes

    calebs_gay_dict = {}
    
    if request.method == "POST":
        try:
            received_json_data = json.loads(request.body)
            if "field_name" in received_json_data:
                if received_json_data["field_name"] == "collection_name":
                    if UserCollection.objects.filter(user=request.user, collection_name=received_json_data["field_content"]).exists():
                        return JsonResponse({"passed": 0, "message": "A collection with that name already exists!"}, status=200)
                    else:
                        return JsonResponse({"passed": 1}, status=200)
        except RawPostDataException:
            pass
   
        if len(request.FILES) != 0:
            
            if 'properties' in request.POST:
                properties = json.loads(request.POST.get('properties'))
                layernames = json.loads(request.POST.get('layernames'))
                res_x = int(properties[3])
                res_y = int(properties[4])
                texture_color = ImageColor.getcolor(properties[5], "RGB")
                layers_list = [None] * len(layernames)
                textures_list = [None] * len(layernames)
                layers_list_names = [None] * len(layernames)
                textures_list_names = [None] * len(layernames)
                for filename in request.FILES.keys():
                    for file in request.FILES.getlist(filename):
                        layer_name = filename.split(".")[0]
                        count = int(filename.split(".")[1])
                        if layer_name =="asset":
                            layers_list[count] = file_to_pil(file, res_x, res_y)
                            layers_list_names[count] = file.name.split(".")[0]
                        else:
                            textures_list[count] = file_to_pil(file, res_x, res_y)
                            textures_list_names[count] = file.name.split(".")[0]
                im = Image.new (
                    "RGBA", (res_x, res_y), (0, 0, 0, 0)
                )
                attributes = []
                for i in range(len(layernames)):
                    if layers_list[i] and textures_list[i]:
                        texturedAsset = textureMapping(layers_list[i], textures_list[i], texture_color)
                        value = f"{layers_list_names[i]} ({textures_list_names[i]})"
                        attributes.append({"trait_type": layernames[i], "value": value})
                        im.paste(texturedAsset, (0, 0), texturedAsset)   
                    elif layers_list[i]:
                        im.paste(layers_list[i], (0, 0), layers_list[i])
                        value = f"{layers_list_names[i]}"
                        attributes.append({"trait_type": layernames[i], "value": value})

                metadata = {
                    "name": properties[1],
                    "description": properties[2],
                    "image": "",
                    "attributes": attributes
                }
                # print(metadata)
                content = pil_to_bytes(im)    
                # return HttpResponse(content, content_type="application/octet-stream")
                return JsonResponse(
                    {
                        "preview" : content,
                        "metadata" : metadata
                    },
                    status=200,
                )

            
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

            calebs_gay_dict["CollectionName"] = request.POST.get("collection_name")
            calebs_gay_dict["TokenName"] = request.POST.get("token_name")
            calebs_gay_dict["ImageName"]= request.POST.get("image_name")
            calebs_gay_dict["Description"] = request.POST.get("description")
            calebs_gay_dict["Resolution_x"] = int(float(request.POST.get("resolution_x")))
            calebs_gay_dict["Resolution_y"] = int(float(request.POST.get("resolution_y")))
            calebs_gay_dict["CollectionSize"] = int(float(request.POST.get("size")))
            calebs_gay_dict["TextureColor"] = request.POST.get("color")

            for value in calebs_gay_dict.values():
                if not value:
                    messages.error(request, message=f"An Error has occured - data is missing. Please try again.")
                    return redirect(reverse("main:upload"))

            if request.POST.get("rarity_map") == "":
                messages.error(request, message="No Rarities recieved. Please try again.")
                return redirect(reverse("main:upload"))

            rarity_map = json.loads(request.POST.get("rarity_map"))

            layers = {}

            db_collection = UserCollection.objects.get_or_create(user=request.user, collection_name=calebs_gay_dict["CollectionName"])
            if db_collection[1]: #new collection created
                db_collection = db_collection[0]
            else:
                messages.error(request, message="A collection with that name already exists!")
                return redirect(reverse("main:upload"))

            db_collection.description = calebs_gay_dict["Description"]
            db_collection.dimension_x = calebs_gay_dict["Resolution_x"]
            db_collection.dimension_y = calebs_gay_dict["Resolution_y"]
            db_collection.token_name = calebs_gay_dict["TokenName"]
            db_collection.image_name = calebs_gay_dict["ImageName"]
            # db_collection.collection_size = calebs_gay_dict["CollectionSize"]
            db_collection.path = f"/media/users/{request.user.username}/collections/{calebs_gay_dict['CollectionName'].strip().replace(' ', '_')}"

            try:
                db_collection.save()
            except:
                messages.error(request, message="Critical Backend error. Please try again.")
                return redirect(reverse("main:upload"))
            
            for filename in request.FILES.keys():
                # print(request.FILES.keys())
                for file in request.FILES.getlist(filename): ##for this set of file get layer name and layer type
                    # print(file)
                    # print(filename)
                    # print(request.FILES.keys())
                    # print(request.FILES.getlist(filename))
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
                                        "PIL": file_to_pil_cv2(
                                            file,
                                            calebs_gay_dict["Resolution_x"],
                                            calebs_gay_dict["Resolution_y"]
                                        ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                        "Rarity": int(float(rarity_map[full_file_name])),
                                    }
                                )
                        if layer_type == "texture":
                            if int(float(rarity_map[full_file_name]) > 0):  # if rarity > 0
                                layers[layer_name]["Textures"].append(
                                    {
                                        "Name": file_name_no_extension,
                                        "PIL": file_to_pil_cv2(
                                            file,
                                            calebs_gay_dict["Resolution_x"],
                                            calebs_gay_dict["Resolution_y"]
                                        ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                        "Rarity": int(float(rarity_map[full_file_name])),
                                    }
                                )

            calebs_gay_dict["Layers"] = layers  # calebd gay dict complete

            print(calebs_gay_dict["Layers"])

            create_and_save_collection(calebs_gay_dict, db_collection, request.user)

            messages.success(request, message="Collection generated succesfully! You have been redirected to the collection page ;)")

            return redirect(reverse("main:collection",
                    kwargs={
                        "username": request.user.username,
                        "collection_name": db_collection.collection_name
                    })
            )
                
        else:  # no files submitted
            error_params = {"title": "Upload Failure", "description": "No files have been recieved by the server. Please make sure that you are using PNG files only.", "code": "318XD"}
            raise PermissionDenied(json.dumps(error_params))

    return render(request, "upload.html", context)


def login_view(request):
    if request.user.is_authenticated:
        error_params = {"title": "Login", "description": "Attempt to Log in when already logged in.", "code": "321XD"}
        raise PermissionDenied(json.dumps(error_params))

    login_form = LoginForm(label_suffix="")
    form_id = "login_form"

    if request.method == "POST" and form_id in request.POST:
        login_form = LoginForm(request.POST, label_suffix="")
        if login_form.is_valid():
            try:
                candidate_user = login_form.authenticate()
                login(request, candidate_user)
                messages.success(request, message="Logged in succesfully!")
                return redirect(reverse("main:main_view"))
            except ValidationError as msg:
                messages.error(request, msg)
                login_form.add_error(None, msg)

    form_context = {"form": login_form, "button_text": "Log in", "identifier": form_id, "title": "Log in to Genera"}

    return render(request, 'base_form.html', form_context)

def logout_view(request):
    if not request.user.is_authenticated:
        error_params = {"title": "Logout", "description": "Attempt to logout when not logged in.", "code": "320XD"}
        raise PermissionDenied(json.dumps(error_params))

    logout(request)
    messages.success(request, 'Logged out Succesfully!')
    return redirect(reverse('main:main_view'))

def register_view(request):
    if request.user.is_authenticated:
        error_params = {"title": "Registration", "description": "Attempt to register when already logged in.", "code": "322XD"}
        raise PermissionDenied(json.dumps(error_params))

    registration_form = UserRegisterForm(label_suffix="")
    form_id = "register_form"
    
    if request.method == 'POST' and form_id in request.POST:
        registration_form = UserRegisterForm(request.POST, label_suffix="")
           
        if registration_form.is_valid():
            user = registration_form.save()
            user.is_active = False
            registration_form.update_user_password(user) #This will also save the user.

            account_activation_instance = generate_token(request, type="A", user=user)

            msg_plain = render_to_string('email/verify_email.txt', {'url': account_activation_instance["token_url"], 'date': user.date_joined, 'username': user.username})
            msg_html = render_to_string('email/verify_email.html', {'url': account_activation_instance["token_url"], 'date': user.date_joined, 'username': user.username})

            send_mail (
                subject='Welcome to genera!',
                message=msg_plain,
                from_email=DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                html_message=msg_html,
            )

            UserProfile.objects.create(user=user).save()
            messages.success(request, 'Registration Succesful! Please check your email to verify your account.')
            return redirect(reverse('main:main_view'))

    form_context = {"form": registration_form, "button_text": "Register", "identifier": form_id, "title": "Register for Genera"}
    
    return render(request, 'base_form.html', form_context)
    
def account_activation_view(request, token_url):
    token_instance = Token.objects.filter(hash=token_url).first()

    if token_instance:
        #calculate time difference between now and the time that the token was created. note that time is using django DateTimeField.
        time_difference = make_aware(datetime.datetime.now()) - token_instance.created
        #if the time difference is more than one week, then delete this token.
        if time_difference.days > 7:
            token_instance.delete()
            messages.error(request, 'It has been more than one week, so the activation link has expired - please register again')
            return redirect(reverse('main:register'))

        #if the time difference is less than one week, then activate the user.
        token_instance.user.is_active = True
        token_instance.user.save()
        token_instance.delete()
        messages.success(request, 'Account activated! Please log in.')
        login(request, token_instance.user)
        print(f"{token_instance.user.username} has been activated")
        return redirect(reverse('main:main_view'))
    else:
        error_params = {"title": "Account activation", "description": "Invalid URL accessed. Please try again or reregister", "code": "323XD"}
        print("Invalid URL accessed")
        raise PermissionDenied(json.dumps(error_params))

def password_reset_view(request):
    password_reset_request_form = Password_Reset_Request_Form(label_suffix="")
    form_id = "password_reset_req"

    if request.method == 'POST' and form_id in request.POST:
        password_reset_request_form = Password_Reset_Request_Form(request.POST, label_suffix="")
        if password_reset_request_form.is_valid():
            user = password_reset_request_form.extract_user()
            password_reset_token = generate_token(request, type="P", user=user)
            msg_html = render_to_string('email/mail_body_reset.html', {'reset_link': password_reset_token["token_url"], 'date': user.date_joined, 'user': user})
            send_mail(
                subject='Genera Password Reset',
                message='Genera Password Reset',
                from_email=DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                html_message=msg_html,
            )
            messages.success(request, 'Password reset email sent!')
            return redirect(reverse('main:main_view'))

    form_context = {"form": password_reset_request_form, "button_text": "Request a password reset link!", "identifier": form_id, "title": "Password Reset Request"}

    return render(request, 'base_form.html', form_context)

def password_reset_handler_view(request, token_url):
    #exception raise error if link does not exist
    password_reset_form = Password_Reset_Form(label_suffix="")

    token = Token.objects.filter(hash=token_url).first()
    if token:
        #calculate time difference between now and the time that the token was created. note that time is using django DateTimeField.
        time_difference = make_aware(datetime.datetime.now()) - token.created
        #if the time difference is more than one week, then delete this token.
        if time_difference.days > 7:
            token.delete()
            messages.error(request, 'It has been more than one week, so the activation link has expired - please request a new password reset referral')
            return redirect(reverse('main:password_reset'))
            
        identified_user = token.user

        form_id = "password_reset_req"

        if request.method == "POST" and form_id in request.POST:
            password_reset_form = Password_Reset_Form(request.POST, label_suffix="")

            if password_reset_form.is_valid():
                password_reset_form.update_user_password(identified_user)
                messages.success(request, 'Password Reset Succesful. You may now log in with your new password.')
                token.delete()
                return redirect(reverse('main:login'))
            else:
                print(password_reset_form.errors)

        form_context = {"form": password_reset_form, "button_text": "Confirm password reset!", "identifier": form_id, "title": "Password Reset confirmation"}

        return render(request, 'base_form.html', form_context)

    else:
        error_params = {"title": "Credentials change", "description": "Invalid URL accessed. Consider requesting a new link if issue persists", "code": "323XD"}
        raise PermissionDenied(json.dumps(error_params))

def profile_view(request, username):
    user = User.objects.filter(username=username).first()
    owner = (request.user == user)

    if not user:
        error_params = {"title": "Profile", "description": "Profile does not exist", "code": "313XD"}
        raise PermissionDenied(json.dumps(error_params))

    return render(request, 'user_profile.html', context={"owner":owner, "user":user})

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
            return render(request, "all_collections.html", context)

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
            context["ajax_url"] = reverse("main:collection", 
                    kwargs={
                        "username": request.user.username,
                        "collection_name": user_collection.collection_name,
                    },)
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
        print("we posted")
        # print(request.POST.get("entry_name"))
        # print(request.POST.get("image_description"))
        # print(request.POST.get("image_name"))

        if "image_name" in request.POST:
            collection_image = collection_images.filter(deployed_bool = False, name=request.POST.get("entry_name")).first()
            if collection_image:
                print(collection_image.id)
                collection_image.name = request.POST.get("image_name")
                collection_image_description = json.loads(collection_image.metadata)
                collection_image_description["description"] = request.POST.get("image_description")
                collection_image_description["name"] = request.POST.get("image_name")
                collection_image.metadata = json.dumps(collection_image_description)
                collection_image.save()

                return redirect(reverse("main:collection", kwargs= {
                    "username": username,
                    "collection_name": collection_name,
                }))
        
        ##AJAX HANDLING SECTION START
        try:
            received_json_data = json.loads(request.body)
            # make this a async function for speed!!!!! Will need db changes
            if "notneeded" in received_json_data:  # handle
                pinata_links =[]
                entry_ids =[]
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
                            entry_ids.append(entry.id)
                    user_collection.collection_ifps_bool = True
                    user_collection.save()
                    # for entry in collection_images:
                    #     print(entry.ipfs_metadata_path)
                    token_name = user_collection.token_name
                    print(token_name)
                    collection_name = user_collection.collection_name
                    return JsonResponse(
                        { # Links here are sent during inital contract deployment. should have bool checks so this ajax isnt done somehow.
                            "ipfs_links": pinata_links,
                            "entries" : entry_ids,
                            "token_name" : token_name,
                            "collection_name" : collection_name
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
                        print("Contract already saved in db")
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
                    IPFS_links = []
                    entry_ids = []

                    if not user_collection.contract_bool:
                        user_collection.contract_address = received_json_data["address_set"]
                        user_collection.contract_bool = True
                        user_collection.save()

                        for entry in collection_images:
                            IPFS_links.append(entry.ipfs_metadata_path)
                            entry_ids.append(entry.id)
                    else:
                        tokenURIs = read_contract(user_collection.contract_address)
                        if len(tokenURIs) == user_collection.collection_size:
                            user_collection.tokens_deployed = True
                            user_collection.save()
                            print("All NFTs minted")
                        else:
                            user_collection.tokens_deployed_counter = len(tokenURIs)
                            user_collection.save()
                            for entry in collection_images:
                                if entry.deployed_txhash and not entry.deployed_bool: #would save iterations if did only txhash[true] & make almost 100% fool proof, can iterate over ifps_deployed
                                    if tokenURIs:
                                        for value in tokenURIs:
                                            if entry.ipfs_metadata_path == value:
                                                entry.deployed_bool = True
                                                entry.save()
                                if not entry.deployed_bool:
                                    IPFS_links.append(entry.ipfs_metadata_path)
                                    entry_ids.append(entry.id)

                    return JsonResponse(
                        {"server_message" :"Contract address set",
                        "ipfs_links": IPFS_links,
                        "entries" : entry_ids
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
                    collection_query = collection_images.filter(deployed_bool = False, deployed_txhash__isnull= False, id=received_json_data['token_deployed'])
                    collection_image = collection_query.first()
                    collection_image.deployed_bool = True
                    collection_image.save()
                    print(user_collection.tokens_deployed_counter)
                    print(user_collection.collection_size)
                    if user_collection.tokens_deployed_counter >= user_collection.collection_size:
                        user_collection.tokens_deployed = True
                        print("All NFTs minted")
                    else:
                        user_collection.tokens_deployed_counter = user_collection.tokens_deployed_counter + 1
                    user_collection.save()
                    print(collection_image.name)
          
                    return JsonResponse(
                        {"server_message": "Image deployed, saved in db"},
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "store_txhash" in received_json_data:
                if request.user.is_authenticated:
                    collection_query = collection_images.filter(deployed_bool = False, id=received_json_data['entry'])
                    collection_image = collection_query.first()
                    collection_image.deployed_txhash = received_json_data['store_txhash']
                    collection_image.save()
                    print(f"{collection_image.name} stored txhash {received_json_data['store_txhash']}")
                    
                    return JsonResponse(
                        {"server_message": "txhash saved in db"},
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "delete_entry" in received_json_data:
                if request.user.is_authenticated:
                    collection_query = collection_images.filter( deployed_bool = False, name = received_json_data['delete_entry']).delete()
                    print(f"deleted {received_json_data['delete_entry']}")
                    user_collection.collection_size = user_collection.collection_size - 1
                    user_collection.save()


                    return JsonResponse(
                        {"server_message": "Deleted collection_image object"},
                        status=200,
                    )
                else:
                    return JsonResponse(
                        {"server_message": "USER NOT LOGGED IN"},
                        status=200,
                    )
            elif "delete_duplicates" in received_json_data:
                print('Entered delete duplicates')
                if request.user.is_authenticated:
                    collection_query = collection_images.filter(deployed_bool = False)
                    i = 0
                    while i < len(collection_query):
                        # print(f"{len(collection_query)} LENGTH OF QUERY")
                        entry_metadata = json.loads(collection_query[i].metadata)
                        # print(f"{entry_metadata} COMPARISON METADATA {i}")
                        for j in range(len(collection_query) - 1 - i):           
                            value_metadata = json.loads(collection_query[j + 1 + i].metadata)
                            # print(f"{value_metadata} CURRENT METADATA {j + 1 + i}")
                            if entry_metadata['attributes'] == value_metadata['attributes']:
                                collection_query[j + 1 + i].delete()
                                user_collection.collection_size = user_collection.collection_size - 1
                                # print(f"{collection_query[j + 1 + i]} deleted {j + 1 + i}")
                        i = i + 1
                        collection_query = collection_images.filter(deployed_bool = False)
                    user_collection.duplicates_deleted = True
                    user_collection.save()


                    return JsonResponse(
                        {"server_message": "Deleted duplicates"},
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


def about_view(request):
    context = {}


    return render(request, "about.html", context)

def documentation_view(request):
    context = {}


    return render(request, "documentation.html", context)

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

