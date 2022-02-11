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
from django.http import JsonResponse, RawPostDataException, HttpResponse, Http404
from django.core.exceptions import ValidationError
import base64
from PIL import Image, ImageColor
from django.core.mail import send_mail
from .forms import *
from .models import *
from django.dispatch import receiver
from django.db.models.signals import pre_delete, post_delete
import shutil
import json
from django.template.loader import render_to_string
from io import BytesIO
import stripe
from web3 import Web3
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
                        dimension_y = calebs_gay_dict["Resolution_y"]
                    )
                else:
                    return ajax_cancel_generation("A collection with that name already exists!", reverse("main:upload"))

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
                return ajax_redirect(reverse("main:collection", args=[request.user.username_slug, db_collection.collection_name_slug]))
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

def metamask_login_handler_view(request):
    #consider storing the IP for the request in each MetamaskUserAuth object. Track if an IP is ajaxing the login button with different public_addresses. Each time a unique public address is passed - a small table is created in a database.
    if request.method == "POST":
        try:
            received_json_data = json.loads(request.body)

            #Add 'metamask_request_nonce': '' to the json data in frontend pls - empty key but so we can distinguish here in the backend
            if "metamask_request_nonce" and "public_address" in received_json_data: #WHEN USER FIRST CLICKS LOGIN WITH METAMASK - shoot a request here and handle the response
                if not Web3.isAddress(received_json_data["public_address"]): #to prevent spamming the server with requests that create a model. consider isChecksumAddress idk?
                    return JsonResponse({"error": "Invalid address"}, status=400)
                created_temp_user = MetamaskUserAuth.objects.get_or_create(public_address=received_json_data["public_address"])[0] #create the temporary user here.
                created_temp_user.nonce = str(uuid.uuid4())
                created_temp_user.save()
                return JsonResponse({"nonce": created_temp_user.nonce}, status=200) #Catch this in frontned - and sign web3.personal.sign(nonce, public_address) please
            
            #Add 'metamask_auth_user': '' to the json data in frontend pls - empty key but so we can distinguish here in the backend
            elif "metamask_auth_user" and "public_address" and "signature" in received_json_data:  #After u generate the signatre in frontend, shoot the request here. Pass the public_address and signature to the server.
                def verify_signature_ecRecover(nonce, signature, public_address):
                    w3 = Web3(Web3.HTTPProvider("infura/alchemy URL")) #TODO: Plug the URL here @Caleb
                    decrypted_public_address = w3.geth.personal.ecRecover(nonce, signature)
                    # decrypted_public_address = w3.eth.account.recover_message(nonce, signature)
                    if public_address.lower() == decrypted_public_address.lower():
                        return True
                    return False

                found_user = MetamaskUserAuth.objects.filter(public_address=received_json_data["public_address"]).first()
                if not found_user: # user not found - shouldnt happen ever xd
                    return Http404()
                #ec2 recover reverse here...
                if verify_signature_ecRecover(found_user.nonce, received_json_data["signature"], found_user.public_address):
                    if found_user.user: #if the MetamaskUserAuth object is ALREADY linked to a user - fetch user from it. otherwise get_or_create a new one!
                        metamask_user = found_user.user
                    else:
                        metamask_user = User.objects.get_or_create_metamask_user(metamask_public_address=found_user.public_address)
                        found_user.user = metamask_user #attach the user reference to the metamask user object
                        found_user.save()
                    login(request, metamask_user)
                    messages.success(request, "Succesfully logged in with metamask!")
                    return ajax_redirect(reverse("main:main_view")) #redirect home page - make sure to catch this in frontend. NOTE: perhaps redirect to profile edit page - to change username/email..
                else: #if signature verification fails - delete the MetamaskUserAuth object. User needs to do the whole process again.
                    found_user.delete()
                    return JsonResponse({"error": "Metamask Validation failed."}, status=400)
                
        except RawPostDataException:
            return Http404()
        except JSONDecodeError:
            return Http404()
    else:
        return Http404()

def login_view(request, current_extension=404):
    print("WHY ARE WE STILL HERE")
    form_id = "login_form"

    if request.user.is_authenticated:
        raise_permission_denied("Login", "Attempt to Log in when already logged in.")

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
        raise_permission_denied("Logout", "Attempt to Log out when not logged in.")

    logout(request)
    messages.success(request, 'Logged out Succesfully!')
    if current_extension:
        return HttpResponseRedirect(current_extension)
    return redirect(reverse("main:main_view"))

def register_view(request):
    if request.user.is_authenticated:
        clientside_success_with_redirect(request, "Already logged in! Redirecting to home page.")

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
            return clientside_success_with_redirect(request, "Registration Succesful! Please check your email to verify your account.")

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
            return clientside_error_with_redirect(request, "It has been more than one week, so the activation link has expired - please register again", 'main:register')

        #if the time difference is less than one week, then activate the user.
        token_instance.user.is_active = True
        token_instance.user.save()
        token_instance.delete()
        login(request, token_instance.user)
        # print(f"{token_instance.user.username} has been activated")
        return clientside_success_with_redirect(request, "Account activated! Please log in.")
    else:
        raise_permission_denied("Account activation", "Invalid URL accessed. Please try again or reregister")

def password_reset_view(request):
    password_reset_request_form = Password_Reset_Request_Form(label_suffix="")
    form_id = "password_reset_req"

    if request.method == 'POST' and form_id in request.POST:
        password_reset_request_form = Password_Reset_Request_Form(request.POST, label_suffix="")
        if password_reset_request_form.is_valid():
            user = password_reset_request_form.extract_user()
            password_reset_token = generate_token(request, type="P", user=user)
            msg_html = render_to_string('email/mail_body_reset.html', {'reset_link': password_reset_token["token_url"], 'date': user.date_joined, 'user': user})
            
            send_mail (
                subject='Genera Password Reset',
                message='Genera Password Reset',
                from_email=DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                html_message=msg_html,
            )

            return clientside_success_with_redirect(request, "Password reset link sent to your email.")

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
            return clientside_error_with_redirect(request, "It has been more than one week, so the activation link has expired - please request a new password reset referral", 'main:password_reset')
            
        identified_user = token.user

        form_id = "password_reset_req"

        if request.method == "POST" and form_id in request.POST:
            password_reset_form = Password_Reset_Form(request.POST, label_suffix="")

            if password_reset_form.is_valid():
                password_reset_form.update_user_password(identified_user)
                token.delete()
                clientside_success_with_redirect(request, "Password Reset Succesful. You may now log in with your new password.", 'main:login')
            else:
                print(password_reset_form.errors)

        form_context = {"form": password_reset_form, "button_text": "Confirm password reset!", "identifier": form_id, "title": "Password Reset confirmation"}

        return render(request, 'base_form.html', form_context)

    else:
        raise_permission_denied("Password reset", "Invalid URL accessed. Consider requesting a new link if issue persists")

def profile_view(request, username_slug):
    user = User.objects.filter(username_slug=username_slug).first()
    owner = (request.user == user)

    if not user:
        raise_permission_denied("Profile", "Profile does not exist")
    
    users_collections = user.get_all_minted_collections()


    return render(request, 'user_profile.html', context={"owner":owner, "user":user, "users_collections":users_collections})

def mint_view(request, username_slug, contract_address):
    user = User.objects.filter(username_slug=username_slug).first()
    # owner = (request.user == user)
    if user:
        context ={}
        context["owner"] = user
        context["isOwner"] = (request.user == user)
        # ask artem if better way to do this
        user_collection = UserCollectionMint.objects.filter(user=user, contract_address=contract_address).first()
        user_collection_public = UserCollectionMintPublic.objects.filter(user=user, contract_address=contract_address).first()
        if user_collection:
            if user_collection.contract_type == 2:
                context['contract_address'] = user_collection.contract_address
                context['chain_id'] = user_collection.chain_id
                context['description'] = user_collection.description
                context['collection_name'] = user_collection.collection_name
                
        elif user_collection_public:
            if user_collection_public.contract_type == 2:
                context['contract_address'] = user_collection_public.contract_address
                context['chain_id'] = user_collection_public.chain_id
                context['description'] = user_collection_public.description
                context['collection_name'] = user_collection_public.collection_name
            else:
                raise_permission_denied("Collection", "Permission Error")
        else:
            raise_permission_denied("Collection", "This Collection does not exist")
    elif not user:
        raise_permission_denied("Profile", "Profile does not exist")

    return render(request, "user_mint.html", context)

@requires_user_logged_in
def all_collections_view(request, username_slug):
    context = {}

    if request.user.is_authenticated and request.user.username_slug != username_slug: #if logged in but trying to view someone elses collection..
        raise_permission_denied("Collections", "You are not authorised to view this collection.")
        
    user = User.objects.filter(username_slug=username_slug).first()
    context["user"] = user

    if user: ##user exists and is the owner of the profile
        users_collections = UserCollection.objects.filter(user=user)
        print(users_collections)
        if users_collections:
            context["users_collections"] = users_collections
        # else:
        #     # print("User has no collections.")
        #     return clientside_error_with_redirect(request, "You have no collections!", 'main:all_collections')
    else:
        raise_permission_denied("Collections", "User does not exist")

    return render(request, "all_collections.html", context)

def collection_view(request, username_slug, collection_name_slug):
    context = {}

    user = User.objects.filter(username_slug=username_slug).first()
    context["user"] = user
    
    if user:
        if request.user.is_authenticated:
            if request.user != user: #if non owner tries to view collection
                raise_permission_denied("Collection", "You are not authorised to view this collection.")

            user_collection = UserCollection.objects.filter(user=user, collection_name_slug=collection_name_slug).first()
            
            if user_collection or not user_collection.public_mint:
                context["ajax_url"] = reverse("main:collection", args=[username_slug, collection_name_slug])
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
                    messages.error(request, "Warning - this collection does not have any images!")
                    return render(request, "collection.html", context)
            else:
                raise_permission_denied("Collection", "This collection does not exist.")
        else:
            raise_permission_denied("User not authenticated", "You are not logged in. Please log in to be able to view this page.")
    else:
        raise_permission_denied("Collection", "Error - collection does not exist.")

    if request.method == "POST":
        if request.user.is_authenticated:
            if 'image_car' in request.POST:

                if user_collection.collection_ifps_bool:
                    return JsonResponse(
                        {"server_message": "Collection already upladed to IPFS"},
                        status=202,
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
                        # print(response['value']['cid'])
                        user_collection.image_uri = response['value']['cid']
                        user_collection.save()
                        metadata_list = []    
                        for count, entry in enumerate(collection_images):
                            metadata = json.loads(entry.metadata)
                            metadata["image"] = f"https://{response['value']['cid']}.ipfs.dweb.link/{count}.png"
                            metadata_list.append(metadata)
                            entry.metadata = json.dumps(metadata)
                            entry.save()
                
                return JsonResponse(
                    {
                        "image_uri" : json.dumps(metadata_list)
                    },
                    status=200,
                )
            if 'base_car' in request.POST:

                if not user_collection.image_uri:
                    return JsonResponse(
                        {"server_message": "Images not deployed"},
                        status=202,
                    )
                if user_collection.collection_ifps_bool:
                    return JsonResponse(
                        {"server_message": "Collection already upladed to IPFS"},
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

                        # print(response['value']['cid'])
                        user_collection.base_uri = response['value']['cid']
                        user_collection.collection_ifps_bool = True
                        user_collection.save()
                        if DEPLOYMENT_INSTANCE:
                            user_collection.wipe_linked_aws_images()
                    

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

                    return redirect(reverse("main:collection", args=[username_slug, collection_name_slug]))
            ##AJAX HANDLING SECTION START
            try:
                received_json_data = json.loads(request.body)
                # make this a async function for speed!!!!! Will need db changes

                if "address_set" in received_json_data:
                    if request.user.is_authenticated:
                        cocker = UserCollectionMint.objects.create(
                            collection = user_collection,
                            user = request.user, 
                            contract_address = received_json_data["address_set"],
                            chain_id = received_json_data["chain_id"],
                            contract_type = 2
                        )
                        print("KINERMAN")
                        print(cocker.collection)
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
        user = User.objects.filter(username=request.user.username_slug).first()
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
                        user_collection = UserCollectionMintPublic.objects.create(
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
                    return ajax_redirect(reverse("main:user_mint", args=[user.username_slug, received_json_data["contract_address"]]))
            except RawPostDataException:  # NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
                pass   
            ##AJAX HANDLING SECTION END         
                

    return render(request, "minting_page.html", context)

def login_options_view(request):
    return render(request, "login_options.html", {"ajax_url": reverse("main:login_metamask_handler")})