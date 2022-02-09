from json.decoder import JSONDecodeError
from django.shortcuts import render
from main.helper_functions import nft_storage_api_store
from main.view_tools import *
from genera.settings import DEFAULT_FROM_EMAIL, STRIPE_PRIVATE_KEY, DEPLOYMENT_INSTANCE
from genera.s3_storage import AwsMediaStorageManipulator
from main.models import User
from main.forms import *
from main.generator_alg import *
from main.contract_interaction import *
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import login, logout
from django.contrib import messages
from django.http import HttpResponseRedirect
import json
from django.http import JsonResponse, RawPostDataException
from django.core.exceptions import PermissionDenied, ValidationError
import base64
from PIL import Image, ImageColor
from django.core.mail import send_mail
from .forms import *
from .models import *
from django.dispatch import receiver
from django.db.models.signals import pre_delete
import shutil
import json
from django.template.loader import render_to_string
from io import BytesIO
import stripe
# Create your views here.
stripe.api_key = STRIPE_PRIVATE_KEY

def main_view(request):

    
    context = {}
    context['products'] = generate_stripe_products_context()
    
    return render(request, "home.html", context)

def upload_view(request):
    
    context = {}
    context["ajax_url"] = reverse("main:upload")

    if request.user.is_authenticated:        
        user = User.objects.filter(username=request.user.username).first()
        collections = []
        if user:
            for collection in UserCollection.objects.filter(user=user):
                collections.append(collection.collection_name)
            print(collections)
            context['users_collections'] = json.dumps(collections)

    def file_to_pil_no_resize(file, res_x, res_y):
        PIL_image = Image.open(BytesIO(file.read()))
        height, width = PIL_image.size
        if height != res_x or width != res_y or height > 4000 or width > 4000:
            raise RawPostDataException
        return PIL_image

    def pil_to_bytes(pil_img):
        imageBytes = BytesIO()
        pil_img.save(imageBytes, format='PNG')
        return base64.b64encode(imageBytes.getvalue()).decode('utf-8')

    calebs_gay_dict = {}
    
    if request.method == "POST":
        
        # Ajax feild validation
        try:
            received_json_data = json.loads(request.body)
            if "field_name" in received_json_data:
                    if received_json_data["field_name"] == "collection_name":
                        if request.user.is_authenticated:
                            if UserCollection.objects.filter(user=request.user, collection_name=received_json_data["field_content"]).exists():
                                return JsonResponse({"passed": 0, "message": "A collection with that name already exists!"}, status=200)
                            else:
                                return JsonResponse({"passed": 1}, status=200)
                        else:
                            return JsonResponse({"passed": 1}, status=200)
                    elif received_json_data["field_name"] == "size":
                        if request.user.is_authenticated:
                            if request.user.credits < int(received_json_data["field_content"]):
                                return JsonResponse({"passed": 0, "message": "You don't have enough credits to generate this collection size!"}, status=200)
                            else:
                                return JsonResponse({"passed": 1}, status=200)

                        elif int(received_json_data["field_content"]) < 100:
                                return JsonResponse({"passed": 0, "message": "Maximum of 100 free generations allowed"}, status=200)
                        else:
                            return JsonResponse({"passed": 1}, status=200)
                
        except RawPostDataException:
            pass
        except JSONDecodeError:
            pass
   
        if len(request.FILES) != 0:

            # Preview handling
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
                            layers_list[count] = file_to_pil_no_resize(file, res_x, res_y)
                            layers_list_names[count] = file.name.split(".")[0]
                        else:
                            textures_list[count] = file_to_pil_no_resize(file, res_x, res_y)
                            textures_list_names[count] = file.name.split(".")[0]
                im = Image.new (
                    "RGBA", (res_x, res_y), (0, 0, 0, 0)
                )
                attributes = []
                # metadata could be done in js
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
                # could be done in js
                try:

                    watermark = Image.open(staticify("Assets/Background/genera_watermark.png"))
                except:
                    print("Could not open watermark")
                    return
                
                resized_watermark =  watermark.resize((res_x, res_y))
                
                im.paste(resized_watermark, (0,0), resized_watermark)
                content = pil_to_bytes(im)    
                # return HttpResponse(content, content_type="application/octet-stream")
                return JsonResponse(
                    {
                        "preview" : content,
                        "metadata" : metadata
                    },
                    status=200,
                )

            # Generation Handling

            #Paid or Free Generation
            if request.user.is_authenticated:

                if int(float(request.POST.get("size"))) <= request.user.credits:
                    paid_generation = True
                elif int(float(request.POST.get("size"))) > request.user.credits and int(float(request.POST.get("size"))) <= 100:
                    paid_generation = False

                else:
                   
                    messages.error(request, message="Not enough credits.")
                    return ajax_redirect(reverse("main:upload"))
            elif int(float(request.POST.get("size"))) > 100:
                messages.error(request, message="Maximum Free Generations are 100.")
                return ajax_redirect(reverse("main:upload"))
            else:
                paid_generation = False

            calebs_gay_dict["CollectionName"] = request.POST.get("collection_name")
            calebs_gay_dict["TokenName"] = request.POST.get("token_name") # not needed
            calebs_gay_dict["ImageName"]= request.POST.get("image_name")
            calebs_gay_dict["Description"] = request.POST.get("description")
            calebs_gay_dict["Resolution_x"] = int(float(request.POST.get("resolution_x")))
            calebs_gay_dict["Resolution_y"] = int(float(request.POST.get("resolution_y")))

            calebs_gay_dict["CollectionSize"] = int(float(request.POST.get("size")))
            calebs_gay_dict["TextureColor"] = request.POST.get("color")

            new_dict = json.loads(request.POST.get("image_dict"))
            for value in calebs_gay_dict.values():
                if not value:
                    messages.error(request, message=f"An Error has occured - data is missing. Please try again.")
                    return ajax_redirect(reverse("main:upload"))

            layers = {}
            if paid_generation:
                db_collection = UserCollection.objects.filter(user=request.user, collection_name=calebs_gay_dict["CollectionName"]).first()
                if not db_collection: #new collection created
                    db_collection = UserCollection.objects.create(
                        user=request.user,
                        collection_name=calebs_gay_dict["CollectionName"],
                        description = calebs_gay_dict["Description"],
                        dimension_x = calebs_gay_dict["Resolution_x"],
                        dimension_y = calebs_gay_dict["Resolution_y"],
                        token_name = calebs_gay_dict["TokenName"],
                        image_name = calebs_gay_dict["ImageName"]
                    )
                else:
                    messages.error(request, message="A collection with that name already exists!")
                    return ajax_redirect(reverse("main:upload"))

                #CREATE THE FOLDER HERE PERHAPS ?
                if DEPLOYMENT_INSTANCE:
                    db_collection.path = f"users/{request.user.username}/collections/{calebs_gay_dict['CollectionName'].strip().replace(' ', '_')}" #TODO: make sure the the 2 parameters a filepath safe
                else:
                    db_collection.path = f"/media/users/{request.user.username}/collections/{calebs_gay_dict['CollectionName'].strip().replace(' ', '_')}"

                try:
                    db_collection.save()

                except Exception as e:
                    print(e)
                    messages.error(request, message="Critical Backend error. Unable to create collection.")
                    return ajax_redirect(reverse("main:upload"))
            
            for filename in request.FILES.keys():
                for file in request.FILES.getlist(filename): ##for this set of file get layer name and layer type
                    layer_type = filename.split(".")[0]
                    layer_name = filename.split(".")[1]
                    file_name = file.name
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
                        if layer_type == "Assets":

                            if  0 < int(float(new_dict[layer_name]['Assets'][file_name]['Rarity'])) <= calebs_gay_dict["CollectionSize"]:  # if  0 < rarity < collectionsize 
                                layers[layer_name]["Assets"].append(
                                    {
                                        "Name": file_name_no_extension,
                                        "PIL": file_to_pil_no_resize(file,
                                        calebs_gay_dict["Resolution_x"],
                                        calebs_gay_dict["Resolution_y"]),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                        "Rarity": int(float(new_dict[layer_name]['Assets'][file_name]['Rarity'])),
                                    }
                                )
                            else:
                                if paid_generation:
                                    db_collection.delete()
                                    request.user.save()
                                messages.error(request, message="An Asset Rarity Was Greater than Collection Size")
                                return ajax_redirect(reverse("main:upload"))
                        if layer_type == "Textures":

                            if 0 < int(float(new_dict[layer_name]['Textures'][file_name]['Rarity'])) <= calebs_gay_dict["CollectionSize"]:  # if  0 < rarity < collectionsize 
                                layers[layer_name]["Textures"].append(
                                    {
                                        "Name": file_name_no_extension,
                                        "PIL": file_to_pil_no_resize(
                                            file,
                                            calebs_gay_dict["Resolution_x"],
                                            calebs_gay_dict["Resolution_y"]
                                        ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                        "Rarity": int(float(new_dict[layer_name]['Textures'][file_name]['Rarity'])),
                                    }
                                )
                            else:
                                if paid_generation:
                                    db_collection.delete()
                                    request.user.save()
                                messages.error(request, message="A Texture Rarity Was Greater than Collection Size")
                                return ajax_redirect(reverse("main:upload"))

            calebs_gay_dict["Layers"] = layers  # calebs gay dict complete

            # print(calebs_gay_dict["Layers"])
            
            if paid_generation:

                success = create_and_save_collection_paid(calebs_gay_dict, db_collection, request.user)

                if success:
                    request.user.credits -= db_collection.collection_size
                    request.user.save()
                else:
                    db_collection.delete()
                    request.user.save()
                    messages.error(request, message="A Layer Rarity Was Greater than Collection Size")
                    return ajax_redirect(reverse("main:upload"))

                messages.success(request, message="Collection generated succesfully!")

                return ajax_redirect(reverse("main:collection", args=[request.user.username, db_collection.collection_name]))
            else:
                images_list, metadata_list = create_and_save_collection_free(calebs_gay_dict)
                print("Free collection")
                return JsonResponse(
                    {
                        "images" : images_list,
                        "metadata" : metadata_list
                    },
                    status=200,
                )
            
                
        else:  # no files submitted
            messages.error(request, message="No files recieved by the server")
            return ajax_redirect(reverse("main:upload"))

    return render(request, "upload.html", context)

def login_view(request, current_extension=404):
    print("WHY ARE WE STILL HERE")
    form_id = "login_form"

    if request.user.is_authenticated:
        error_params = {"title": "Login", "description": "Attempt to Log in when already logged in.", "code": "321XD"}
        raise PermissionDenied(json.dumps(error_params))

    login_form = LoginForm(label_suffix="")

    if request.method == "POST" and form_id in request.POST:
        login_form = LoginForm(request.POST, label_suffix="")
        if login_form.is_valid():
            try:
                candidate_user = login_form.authenticate()
                login(request, candidate_user)
                messages.success(request, message="Logged in succesfully!")
                if current_extension != 404:
                    return HttpResponseRedirect(current_extension)
                return redirect(reverse("main:main_view"))

            except ValidationError as msg:
                msg = msg.args[0]
                messages.error(request, str(msg))
                login_form.add_error(None, msg)


    form_context = {"form": login_form, "button_text": "Log in", "identifier": form_id, "title": "Log in to Genera", "login_url" : current_extension, "extra" : True}

    return render(request, 'base_form.html', form_context)

def logout_view(request, current_extension=None):
    if not request.user.is_authenticated:
        error_params = {"title": "Logout", "description": "Attempt to logout when not logged in.", "code": "320XD"}
        raise PermissionDenied(json.dumps(error_params))

    logout(request)
    messages.success(request, 'Logged out Succesfully!')
    if current_extension:
        return HttpResponseRedirect(current_extension)
    return redirect(reverse("main:main_view"))

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
    print(user)
    owner = (request.user == user)

    if not user:
        error_params = {"title": "Profile", "description": "Profile does not exist", "code": "313XD"}
        raise PermissionDenied(json.dumps(error_params))
    
    users_collections = UserCollectionMint.objects.filter(user=user)
    print("hello")
    print(users_collections)

    return render(request, 'user_profile.html', context={"owner":owner, "user":user, "users_collections":users_collections})

def mint_view(request, username, contract_address):
    user = User.objects.filter(username=username).first()
    # owner = (request.user == user)

    if user:
        context ={}
        context["owner"] = user
        context["isOwner"] = (request.user == user)
        user_collection = UserCollectionMint.objects.filter(user=user, contract_address=contract_address).first()
        if user_collection:
            if user_collection.contract_type == 2:

                context['contract_address'] = user_collection.contract_address
                context['chain_id'] = user_collection.chain_id
                context['description'] = user_collection.description
                context['collection_name'] = user_collection.collection_name

            else:
                error_params = {"title": "Collection", "description": "Permission Error", "code": "313XD"}
                raise PermissionDenied(json.dumps(error_params))
        else:
            error_params = {"title": "Collection", "description": "This Collection does not exist", "code": "313XD"}
            raise PermissionDenied(json.dumps(error_params))
    elif not user:
        error_params = {"title": "Profile", "description": "Profile does not exist", "code": "313XD"}
        raise PermissionDenied(json.dumps(error_params))
    

    return render(request, "user_mint.html", context)

def mint_view2(request, username, contract_address):
    user = User.objects.filter(username=username).first()
    # owner = (request.user == user)

    if user:
        context ={}
        context["owner"] = user
        context["isOwner"] = (request.user == user)
        user_collection = UserCollectionMint.objects.filter(user=user, contract_address=contract_address).first()
        if user_collection:
            if user_collection.contract_type == 2:

                context['contract_address'] = user_collection.contract_address
                context['chain_id'] = user_collection.chain_id
                context['description'] = user_collection.description
                context['collection_name'] = user_collection.collection_name

            else:
                error_params = {"title": "Collection", "description": "Permission Error", "code": "313XD"}
                raise PermissionDenied(json.dumps(error_params))
        else:
            error_params = {"title": "Collection", "description": "This Collection does not exist", "code": "313XD"}
            raise PermissionDenied(json.dumps(error_params))
    elif not user:
        error_params = {"title": "Profile", "description": "Profile does not exist", "code": "313XD"}
        raise PermissionDenied(json.dumps(error_params))
    

    return render(request, "user_mint2.html", context)

def all_collections_view(request, username):
    context = {}
    if request.user.username != username:
        error_params = {"title": "Collections", "description": "You are not authorised to view this page. (If you just logged out then we're sorry, the quality of life feature of logging out and remaining on the page you were on comes at a price... ;d)", "code": "313XD"}
        raise PermissionDenied(json.dumps(error_params))

    user = User.objects.filter(username=username).first()
    context["user"] = user

    if user: ##user exists and is the owner of the profile
        users_collections = UserCollection.objects.filter(user=user)
        # print(users_collections)
        if users_collections:
            context["users_collections"] = users_collections
        else:
            # print("User has no collections.")
            messages.error(request, "You have no collections!")
            return render(request, "all_collections.html", context)
    else:
        error_params = {"title": "Collections", "description": "User does not exist", "code": "313XD"}
        raise PermissionDenied(json.dumps(error_params))

    return render(request, "all_collections.html", context)

def collection_view(request, username, collection_name):
    context = {}

    user = User.objects.filter(username=username).first()
    context["user"] = user
    
    if user:
        if request.user.is_authenticated:
            user_collection = UserCollection.objects.filter(user=user, collection_name=collection_name).first()
            
            # passing context

            if user_collection or not user_collection.public_mint:
                context["ajax_url"] = reverse("main:collection", 
                        kwargs={
                            "username": request.user.username,
                            "collection_name": user_collection.collection_name,
                        },)
                collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)

                if collection_images:
                    if presigned_url_is_expired(collection_images[0].path): ##check if first image url is expired - if so - renew the presigned urls for all images
                        aws_media_storage_manipulator = AwsMediaStorageManipulator()
                        for image in collection_images:
                            image.path = aws_media_storage_manipulator.create_secure_url(path_to_object=image.path, expire=604800)
                            if image.compressed_path:
                                image.compressed_path = aws_media_storage_manipulator.create_secure_url(path_to_object=image.compressed_path, expire=604800)
                            image.save() #save image with new links!


                    context["collection_data"] = user_collection
                    context["collection_images"] = collection_images
                
                else:
                    messages.error(request, "This collection does not exist.")
                    return render(request, "collection.html", context)
            else:
                messages.error(request, "This collection does not exist.")
                return render(request, "collection.html", context)
        else:
            messages.error(request, "Not Logged in!")
            return render(request, "home.html")
    else:
        messages.error(request, "User does not exist.")
        return render(request, "home.html")

    if request.method == "POST":
        if request.user.is_authenticated:
            if 'image_car' in request.POST:

                if user_collection.contract_type == 1:
                    return JsonResponse(
                        {"server_message": "Wrong contract type"},
                        status=202,
                    )

                if user_collection.collection_ifps_bool:
                    return JsonResponse(
                        {"server_message": "collection_deployed"},
                        status=200,
                    )
                if user_collection.image_uri and not user_collection.base_uri:
                    metadata_list = []
                    for entry in collection_images:
                        metadata_list.append(entry.metadata)
                    return JsonResponse(
                        {"image_uri" : metadata_list},
                        status=200
                    )
                    
                for filename in request.FILES.keys():
                    for file in request.FILES.getlist(filename):
                        response = nft_storage_api_store(file)
                        if not response or response['ok'] == False:
                            print(response)
                            return JsonResponse(
                                {"server_message": "Failed to upload to IPFS, please try again"},
                                status=202,
                            )
                        print(response['value']['cid'])
                        user_collection.image_uri = response['value']['cid']

                        metadata_list = []    
                        for count, entry in enumerate(collection_images):
                            metadata = json.loads(entry.metadata)
                            metadata["image"] = f"https://{response['value']['cid']}.ipfs.dweb.link/{count}.png"
                            metadata_list.append(metadata)
                            entry.metadata = json.dumps(metadata)
                            entry.save()
                user_collection.contract_type = 2
                user_collection.save()
                return JsonResponse(
                    {
                        "image_uri" : json.dumps(metadata_list)
                    },
                    status=200,
                )
            if 'base_car' in request.POST:
                print("base_car")
                if user_collection.contract_type == 1:
                    return JsonResponse(
                        {"server_message": "Wrong contract type"},
                        status=202,
                    )
                # if len(collection_images) > request.user.credits:
                #     return JsonResponse(
                #         {"server_message": "USER DOES NOT HAVE ENOUGH CREDITS"},
                #         status=202,
                #     )
                if not user_collection.image_uri:
                    return JsonResponse(
                        {"server_message": "Images not deployed"},
                        status=202,
                    )

                for filename in request.FILES.keys():
                    for file in request.FILES.getlist(filename):
                        response = nft_storage_api_store(file)
                        if not response or response['ok'] == False:
                            print(response)
                            return JsonResponse(
                                {"server_message": "Failed to upload to IPFS, please try again"},
                                status=202,
                            )

                        print(response['value']['cid'])
                        user_collection.base_uri = response['value']['cid']
                        user_collection.collection_ifps_bool = True
                        user_collection.save()
                    

                return JsonResponse(
                    {
                        "base_uri" : response['value']['cid']
                    },
                    status=200,
                )
            if "image_name" in request.POST:
                collection_image = collection_images.filter(name=request.POST.get("entry_name")).first()
                if collection_image:
                    # print(collection_image.id)
                    collection_image.name = request.POST.get("image_name") # not needed
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

                if "address_set" in received_json_data:
                    if request.user.is_authenticated:
                        user_collection.contract_address = received_json_data["address_set"]
                        user_collection.chain_id = received_json_data["chain_id"]
                        if received_json_data["contract_type"] == 'Private':
                            user_collection.contract_type = 1
                        else:
                            user_collection.contract_type = 2

                        user_collection.save()
                        return JsonResponse(
                            {"server_message" :"Contract address set"},
                            status = 200
                        )
                    else:
                        return JsonResponse(
                            {"server_message": "USER NOT LOGGED IN"},
                            status=202,
                        )
                elif "delete_entry" in received_json_data:
                    if request.user.is_authenticated:
                        collection_query = collection_images.filter(id = received_json_data['delete_entry']).delete() # change to id
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
                            status=202,
                        )
                elif "delete_duplicates" in received_json_data:
                    if request.user.is_authenticated:
                        if user_collection.duplicates_deleted == False:
                            i = 0
                            while i < len(collection_images):
                                # print(f"{len(collection_images)} LENGTH OF QUERY")
                                entry_metadata = json.loads(collection_images[i].metadata)
                                # print(f"{entry_metadata} COMPARISON METADATA {i}")
                                for j in range(len(collection_images) - 1 - i):           
                                    value_metadata = json.loads(collection_images[j + 1 + i].metadata)
                                    # print(f"{value_metadata} CURRENT METADATA {j + 1 + i}")
                                    if entry_metadata['attributes'] == value_metadata['attributes']:
                                        print(collection_images[j + 1 + i])
                                        collection_images[j + 1 + i].delete()
                                        user_collection.collection_size = user_collection.collection_size - 1
                                        print(user_collection.collection_size)
                                        # print(f"{collection_images[j + 1 + i]} deleted {j + 1 + i}")
                                    # user_collection.save()
                                    collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)
                                i = i + 1

                        user_collection.duplicates_deleted = True
                        user_collection.save()


                        return JsonResponse(
                            {"server_message": "Deleted duplicates"},
                            status=200,
                        )
                    else:
                        return JsonResponse(
                            {"server_message": "USER NOT LOGGED IN"},
                            status=202,
                        )
                elif "delete_collection" in received_json_data:
                    if request.user.is_authenticated:
                        user_collection.delete()
                        user.save()

                        return JsonResponse(
                            {"server_message": "Collection Deleted"},
                            status=200,
                        )
                    else:
                        return JsonResponse(
                            {"server_message": "USER NOT LOGGED IN"},
                            status=202,
                        )
                elif "get_contract" in received_json_data:
                    if request.user.is_authenticated:
                        if not user_collection.contract_bool:
                            # print("hello")
                            # assign name to variable
                            if received_json_data['get_contract'] == '1':
                                with open("static/Contracts/erc1155_private_contract.json", "r") as myfile:
                                    data = myfile.read()
                                return JsonResponse(
                                    {"contract": data},
                                    status=200,
                                )
                            if received_json_data['get_contract'] == '2':
                                with open("static/Contracts/erc1155_public_contract.json", "r") as myfile:
                                    data = myfile.read()
                                    print(data)
                                return JsonResponse(
                                    {"contract": data},
                                    status=200,
                                )
                            return JsonResponse(
                                {"server_message": "Contract type not found"},
                                status=202,
                            )
                        else:
                            return JsonResponse(
                                {"server_message": "Contract already deploy!"},
                                status=202,
                            )

                    else:
                        return JsonResponse(
                            {"server_message": "USER NOT LOGGED IN"},
                            status=202,
                        )
                elif "collection_minted" in received_json_data:
                    if request.user.is_authenticated:
                        user_collection.tokens_deployed = True
                        user_collection.save()
                        return JsonResponse(
                            {"server_message": "Collection Minted"},
                            status=200,
                        )
                    else:
                        return JsonResponse(
                            {"server_message": "USER NOT LOGGED IN"},
                            status=202,
                        )
                elif "opensea_metadata" in received_json_data:
                    if request.user.is_authenticated:
                        # find better implementaion
                        for entry in collection_images:
                            entry_metadata = json.loads(entry.metadata)
                            if received_json_data['royalty_points']:
                                entry_metadata['seller_fee_basis'] = received_json_data['royalty_points']
                            if received_json_data['royalty_address']:
                                entry_metadata['fee_recipeint'] = received_json_data['royalty_address']
                            if received_json_data['url']:
                                entry_metadata['external_url'] = received_json_data['url']
                            entry.metadata = json.dumps(entry_metadata)
                            entry.save()
                        return JsonResponse(
                            {"server_message": "metadata changed"},
                            status=200,
                        )
                    
            except RawPostDataException:  # NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
                pass
        else:
            return
        ##AJAX HANDLING SECTION END
    return render(request, "collection.html", context)

def about_view(request):
    return render(request, "about.html")

def documentation_view(request):
    return render(request, "documentation.html")

def public_mint_view(request):
    context = {}

    if request.user.is_authenticated:
        user = User.objects.filter(username=request.user.username).first()
        context["user"] = user
        context["ajax_url"] = reverse("main:mint")
    user_collection =''

    if request.method == "POST":
        if request.user.is_authenticated:
            if 'image_car' in request.POST:
                if len(request.FILES) != 0:
                    filename = list(request.FILES.keys())[0]
                    if filename:
                        file = list(request.FILES.getlist(filename))[0]
                        if file:
                            response = nft_storage_api_store(file)
                            if not response or response['ok'] == False:
                                user_collection.delete()
                                return JsonResponse(
                                    {"server_message": "Failed to upload to IPFS, please try again"},
                                    status=202,
                                )
                            print(response['value']['cid'])
                            return JsonResponse(
                                {
                                    "image_uri" : response['value']['cid']
                                },
                                status=200,
                            )
                    # user_collection.delete()
                    return JsonResponse(
                        {"server_message": "Failed to upload to IPFS, please try again"},
                        status=202,
                    )               
            if 'base_car' in request.POST:
                if len(request.FILES) != 0:
                    filename = list(request.FILES.keys())[0]
                    if filename:
                        file = list(request.FILES.getlist(filename))[0]
                        if file:
                            response = nft_storage_api_store(file)
                            if not response or response['ok'] == False:
                                user_collection.delete()
                                return JsonResponse(
                                    {"server_message": "Failed to upload to IPFS, please try again"},
                                    status=202,
                                )
                            print(response['value']['cid'])
                            return JsonResponse(
                                {
                                    "base_uri" :  response['value']['cid']
                                },
                                status=200,
                            )
                    # user_collection.delete()
                    return JsonResponse(
                        {"server_message": "Failed to upload to IPFS, please try again"},
                        status=202,
                    ) 
            ##AJAX HANDLING SECTION START
            try:
                received_json_data = json.loads(request.body)
                print(received_json_data)
                if "get_contract" in received_json_data:
                    if received_json_data['get_contract'] == 1:
                        with open("static/Contracts/erc1155_private_contract.json", "r") as myfile:
                            data = myfile.read()
                        return JsonResponse(
                            {"contract": data},
                            status=200,
                        )
                    if received_json_data['get_contract'] == 2:
                        with open("static/Contracts/erc1155_public_contract.json", "r") as myfile:
                            data = myfile.read()
                        return JsonResponse(
                            {"contract": data},
                            status=200,
                        )
                    return JsonResponse(
                        {"server_message": "Contract type not found"},
                        status=202,
                    )
                if "address_set" in received_json_data:

                    try:
                        user_collection = UserCollectionMint.objects.create(
                        user = request.user, 
                        collection_name = received_json_data['collection_name'],
                        contract_address = received_json_data["address_set"],
                        chain_id = received_json_data["chain_id"],
                        contract_type = received_json_data["contract_type"],
                        description = received_json_data["description"],
                        image_uri = received_json_data["image_uri"],
                        base_uri = received_json_data["base_uri"]
                        )
                        return JsonResponse(
                            {"server_message" :"Contract address set"},
                            status = 200
                        )
                    except:
                        return JsonResponse(
                        {"server_message" :"Database error, please try again"},
                        status = 202
                    )
                    
                if "collection_redirect" in received_json_data:
                    return ajax_redirect(reverse("main:user_mint", kwargs= {
                        "username": user.username,
                        "contract_address": received_json_data["contract_address"],
                    }))
            except RawPostDataException:  # NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
                pass   
            ##AJAX HANDLING SECTION END         
                

    return render(request, "minting_page.html", context)

def login_options_view(request):
    return render(request, "login_options.html")