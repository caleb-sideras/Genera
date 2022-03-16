from json.decoder import JSONDecodeError
from django.shortcuts import render
import string
from main.helper_functions import nft_storage_api_store
from main.view_tools import *
from genera.settings import DEFAULT_FROM_EMAIL, STRIPE_PRIVATE_KEY_LIVE, DEPLOYMENT_INSTANCE
from genera.s3_storage import AwsMediaStorageManipulator
from main.models import User
from main.forms import *
from main.generator_alg import *
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import login, logout
from django.contrib import messages
from django.http import HttpResponseRedirect
import json
from django.http import JsonResponse, RawPostDataException, HttpResponse, Http404
from django.core import serializers
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
from eth_account.messages import encode_defunct,defunct_hash_message
# from eth_account import messages
# Create your views here.
stripe.api_key = STRIPE_PRIVATE_KEY_LIVE

def home_view(request):
# , chain_id="0x4" or "0x13881"
# chain_id__in=["0x1","0x89"]
    recent_collections = json.dumps(list(UserCollectionMint.objects.filter(fully_minted = False).order_by('-created').values('collection_name', 'description', 'image_uri', 'user__username_slug', 'contract_address','chain_id' )[:10]))
    popular_collections = json.dumps(list(UserCollectionMint.objects.filter(fully_minted = False ).order_by('-collection_views').values('collection_name', 'description', 'image_uri', 'user__username_slug', 'contract_address', 'user__username','chain_id' )[:10]))
    print(popular_collections)
    return render(request, "home2.html", context={"recent": recent_collections,"popular": popular_collections})

def main_view(request):
    context = {}

    context['products'] = generate_stripe_products_context()
    
    return render(request, "home.html", context)

def upload_view(request):
    
    context = {}
    context["ajax_url"] = reverse("main:upload")

    if request.user.is_authenticated:        
        user = request.user
        if user:
            collection_names = list(UserCollection.objects.filter(user=user).values_list('collection_name', flat=True))
            print(json.dumps(collection_names))
            context['collection_names'] = json.dumps(collection_names)
            context['collections_generating'] = user.has_collections_currently_generating

    def file_to_pil_no_resize(file, res_x, res_y, res_thereshold):
        PIL_image = Image.open(BytesIO(file.read()))
        height, width = PIL_image.size
        if height != res_x or width != res_y or height > res_thereshold or width > res_thereshold:
            raise RawPostDataException #TODO: Consider different raise for optimization
        return PIL_image

    def pil_to_bytes(pil_img):
        imageBytes = BytesIO()
        pil_img.save(imageBytes, format='PNG')
        return base64.b64encode(imageBytes.getvalue()).decode('utf-8')

    calebs_gay_dict = {}
    
    if request.method == "POST":
    
        if len(request.FILES) != 0:
            # Generation Handling - PAID and UNPAID for now.
            coll_size = int(float(request.POST.get("size", default="10001")))
            res_x = int(float(request.POST.get("resolution_x", None)))
            res_y = int(float(request.POST.get("resolution_y", None)))
            default_thereshold = 500
            paid_generation = True
            if request.user.is_authenticated: #ONLY CAN BE PAID
                default_thereshold = 4000
                if coll_size > 10000:
                    messages.error(request, message=f"You've attempted to generate a collection with {coll_size} images. Maximum collection size is 10000!")
                    return ajax_redirect(reverse("main:upload"))

                if coll_size > request.user.credits:
                    messages.error(request, message=f"Not enough credits for collection size of {coll_size}.")
                    return ajax_redirect(reverse("main:upload"))
            else:
                if coll_size > 20:
                    messages.error(request, message="Maximum 20 images in Free Generations allowed.")
                    return ajax_redirect(reverse("main:upload"))
                if res_x > 500 or res_y > 500:
                    messages.error(request, message="Free generations cannot go over 500px in either dimensions!")
                    return ajax_redirect(reverse("main:upload"))
                paid_generation = False
            
            if not paid_generation:
                messages.error(request, message="Not a Paid generation. Abort")
                return ajax_redirect(reverse("main:home"))
            
            calebs_gay_dict["CollectionName"] = request.POST.get("collection_name")
            calebs_gay_dict["ImageName"]= request.POST.get("image_name")
            calebs_gay_dict["Description"] = request.POST.get("description")
            calebs_gay_dict["Resolution_x"] = res_x
            calebs_gay_dict["Resolution_y"] = res_y
            calebs_gay_dict["CollectionSize"] = coll_size
            calebs_gay_dict["TextureColor"] = request.POST.get("color")

            # print(calebs_gay_dict["CollectionSize"])

            new_dict = json.loads(request.POST.get("image_dict"))
            for value in calebs_gay_dict.values():
                if not value:
                    messages.error(request, message=f"An Error has occured - data is missing. Please try again.")
                    return ajax_redirect(reverse("main:upload"))

            layers = {}
            
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
                db_collection.path = f"users/{request.user.username_slug}/collections/{db_collection.collection_name_slug}" #TODO: make sure the the 2 parameters a filepath safe
            else:
                db_collection.path = f"/media/users/{request.user.username_slug}/collections/{db_collection.collection_name_slug}"

            try:
                db_collection.save()
            except Exception as e:
                messages.error(request, message="Critical Backend error. Unable to create collection.")
                return ajax_redirect(reverse("main:upload"))
            
            try:
                for filename in request.FILES.keys():
                    for file in request.FILES.getlist(filename): ##for this set of file get layer name and layer type
                        layer_type = filename.split(".")[0]
                        layer_name = filename.split(".")[1]
                        file_name = file.name
                        file_name_no_extension = file.name.split(".")[0]
                        file_name_extension = file.name.split(".")[1]

                        if file_name_extension.lower() != "png":
                            continue

                        if layer_name not in layers:
                            layers[layer_name] = {
                                "Assets": [],
                                "Textures": [],
                            }

                        if layer_name in layers:
                            if layer_type == "Assets":
                                print(calebs_gay_dict["CollectionSize"])
                                print(int(float(new_dict[layer_name]['Assets'][file_name]['Rarity'])))
                                if  0 < int(float(new_dict[layer_name]['Assets'][file_name]['Rarity'])) <= calebs_gay_dict["CollectionSize"]:  # if  0 < rarity < collectionsize 
                                    layers[layer_name]["Assets"].append(
                                        {
                                            "Name": file_name_no_extension,
                                            "PIL": file_to_pil_no_resize(file,
                                                calebs_gay_dict["Resolution_x"],
                                                calebs_gay_dict["Resolution_y"],
                                                default_thereshold),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                            "Rarity": int(float(new_dict[layer_name]['Assets'][file_name]['Rarity'])),
                                        }
                                    )
                                else:
                                    db_collection.delete()
                                    messages.error(request, message="Data mismatch. Please try again.")
                                    return ajax_redirect(reverse("main:upload"))

                            if layer_type == "Textures":

                                if 0 < int(float(new_dict[layer_name]['Textures'][file_name]['Rarity'])) <= calebs_gay_dict["CollectionSize"]:  # if  0 < rarity < collectionsize 
                                    layers[layer_name]["Textures"].append(
                                        {
                                            "Name": file_name_no_extension,
                                            "PIL": file_to_pil_no_resize(
                                                file,
                                                calebs_gay_dict["Resolution_x"],
                                                calebs_gay_dict["Resolution_y"],
                                                default_thereshold
                                            ),  # REPLACE WITH file_to_pil(file) WHEN NEED ACTUAL FILE OBJECT IN NUMPY
                                            "Rarity": int(float(new_dict[layer_name]['Textures'][file_name]['Rarity'])),
                                        }
                                    )
                                else:
                                    db_collection.delete()
                                    messages.error(request, message="Data mismatch. Please try again.")
                                    return ajax_redirect(reverse("main:upload"))
                                    
            except RawPostDataException:
                messages.error(request, "Critical error - collection size exceeds allowance.")
                # user.delete()
                ajax_redirect(reverse("main:home"))

            calebs_gay_dict["Layers"] = layers  # calebs gay dict complete
            
            try:
                required_dicts = instantiate_collection(calebs_gay_dict, db_collection) ##this updates collection size and stuff.
            except Exception as msg:
                FailedUserCollection_Tracker.objects.create(user=user, collection=db_collection, error_message=str(msg))
                db_collection.delete()
                messages.error(request, message="Something went wrong. Generation failed. Sorry! Your credits have not been deducted.")
                return ajax_redirect(reverse("main:home"))
            
            user.credits -= db_collection.collection_size
            user.save()

            if db_collection.collection_size > 20: #put on a thread if > 20, else we can handle normally
                if create_and_save_collection_paid_thread(calebs_gay_dict, db_collection, required_dicts[0], required_dicts[1], request.user): #checks if thread has started! if so - redirect to all collections page!
                    messages.success(request, message="Your collection is quite large and is being generated. You've been redirected to your collections page! Thank you for your patience.")
                    return ajax_redirect(reverse("main:all_collections", args=[request.user.username_slug]))
                else:
                    messages.error(request, message="Something went wrong. Generation failed. Sorry! Your credits have been refunded.")
                    return ajax_redirect(reverse("main:home"))
            else:       
                if create_and_save_collection_paid(calebs_gay_dict, db_collection, required_dicts[0], required_dicts[1], request.user):
                    messages.success(request, message="Collection generated. Redirected to collection page!")
                    return ajax_redirect(reverse("main:collection", args=[user.username_slug, db_collection.collection_name_slug]))
                else:
                    messages.error(request, message="Something went wrong. Generation failed. Sorry! Your credits have been refunded.")
                    return ajax_redirect(reverse("main:home"))
            
        else:  # no files submitted
            messages.error(request, message="No files recieved by the server")
            return ajax_redirect(reverse("main:upload"))

    return render(request, "upload.html", context)

def search_view(request, search_query):

    # serializers.serialize('json'

    all_accounts = json.dumps(list(User.objects.filter(username_slug=search_query).values('username', 'username_slug')))
    all_collections = json.dumps(list(UserCollectionMint.objects.filter(collection_name_slug=search_query).order_by('collection_views').values('collection_name', 'description', 'image_uri', 'contract_address', 'user__username_slug')))
    
    return render(request, "search_result.html", context={'collections': all_collections, 'accounts' : all_accounts, 'query' : search_query})

def metamask_login_handler_view(request):
    #consider storing the IP for the request in each MetamaskUserAuth object. Track if an IP is ajaxing the login button with different public_addresses. Each time a unique public address is passed - a small table is created in a database.
    if request.method == "POST":
        try:
            received_json_data = json.loads(request.body)

            #Add 'metamask_request_nonce': '' to the json data in frontend pls - empty key but so we can distinguish here in the backend
            if "metamask_request_nonce"  in received_json_data: #WHEN USER FIRST CLICKS LOGIN WITH METAMASK - shoot a request here and handle the response
                if not Web3.isAddress(received_json_data["public_address"]): #to prevent spamming the server with requests that create a model. consider isChecksumAddress idk?
                    return JsonResponse({"error": "Invalid address"}, status=400)
                created_temp_user = MetamaskUserAuth.objects.get_or_create(public_address=received_json_data["public_address"])[0] #create the temporary user here.
                # created_temp_user.nonce = "NONCE"
                created_temp_user.nonce = ''.join(random.choice(string.ascii_lowercase) for _ in range(5)) #1 in a thousand, assuming low level understood
                created_temp_user.save()
                return JsonResponse({"nonce": created_temp_user.nonce}, status=200) #Catch this in frontned - and sign web3.personal.sign(nonce, public_address) please
            
            #Add 'metamask_auth_user': '' to the json data in frontend pls - empty key but so we can distinguish here in the backend
            elif "metamask_auth_user"  in received_json_data:  #After u generate the signatre in frontend, shoot the request here. Pass the public_address and signature to the server.
                def verify_signature_ecRecover(nonce, signature, public_address):
                    w3 = Web3(Web3.HTTPProvider("https://mainnet.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba")) #TODO: Plug the URL here @Caleb
                    message_hash = encode_defunct(text=nonce)

                    try:
                        decrypted_public_address = w3.eth.account.recover_message(message_hash, signature=signature)
                    except Exception as e:
                        return False

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

                    metamask_user = authenticate(metamask_user=metamask_user)
                    login(request, metamask_user)
                    messages.success(request, "Succesfully logged in with metamask!")
                    return ajax_redirect(reverse("main:home")) #redirect home page - make sure to catch this in frontend. NOTE: perhaps redirect to profile edit page - to change username/email..
                else: #if signature verification fails - delete the MetamaskUserAuth object. User needs to do the whole process again.
                    found_user.delete()
                    messages.error(request, "Metamask verification failed. Please try again.")
                    return ajax_redirect(reverse("main:login_options")) #redirect home page - make sure to catch this in frontend. NOTE: perhaps redirect to profile edit page - to change username/email..

                
        except RawPostDataException:
            return Http404()
        except JSONDecodeError:
            return Http404()
    else:
        return Http404()

def login_view(request):
    # print("WHY ARE WE STILL HERE")
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
                return redirect(reverse("main:home"))
            except ValidationError as msg:
                msg = msg.args[0]
                messages.error(request, str(msg))
                login_form.add_error(None, msg)

    form_context = {"form": login_form, "button_text": "Log in", "identifier": form_id, "title": "Log in to Genera", "extra" : True}

    return render(request, 'base_form.html', form_context)

def logout_view(request, current_extension=None):
    if not request.user.is_authenticated:
        raise_permission_denied("Logout", "Attempt to Log out when not logged in.")

    logout(request)
    messages.success(request, 'Logged out Succesfully!')
    if current_extension:
        return HttpResponseRedirect(current_extension)
    return redirect(reverse("main:home"))

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
            return clientside_error_with_redirect(request, "It has been more than one week, so the activation link has expired - please register again", reverse('main:register'))

        #if the time difference is less than one week, then activate the user.
        token_instance.user.is_active = True
        token_instance.user.save()
        token_instance.delete()
        login(request, token_instance.user, backend='django.contrib.auth.backends.ModelBackend')
        # print(f"{token_instance.user.username} has been activated")
        return clientside_success_with_redirect(request, "Account activated! You have been logged in automatially!")
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
            return clientside_error_with_redirect(request, "It has been more than one week, so the activation link has expired - please request a new password reset referral", reverse('main:password_reset'))
            
        identified_user = token.user

        form_id = "password_reset_req"

        if request.method == "POST" and form_id in request.POST:
            password_reset_form = Password_Reset_Form(request.POST, label_suffix="")

            if password_reset_form.is_valid():
                password_reset_form.update_user_password(identified_user)
                token.delete()
                clientside_success_with_redirect(request, "Password Reset Succesful. You may now log in with your new password.", reverse('main:login'))
            else:
                pass

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
        print(user)
        context["isOwner"] = (request.user == user)
        # ask artem if better way to do this
        user_collection = UserCollectionMint.objects.filter(user=user, contract_address=contract_address).first()
        if user_collection:
            if user_collection.contract_type == 2:
                context['contract_address'] = user_collection.contract_address
                context['chain_id'] = user_collection.chain_id
                context['description'] = user_collection.description
                context['collection_name'] = user_collection.collection_name
                if not context["isOwner"]:
                    user_collection.collection_views += 1
                    user_collection.save()
            else:
                raise_permission_denied("Collection", "Permission Error")
        else:
            raise_permission_denied("Collection", "This Collection does not exist!")
    elif not user:
        raise_permission_denied("Profile", "Profile does not exist")

    if request.method == "POST":
            ##AJAX HANDLING SECTION START
        try:
            received_json_data = json.loads(request.body)
            if "contract_minted_check" in received_json_data:
                if not user_collection.fully_minted:
                    with open("static/Contracts/erc1155_public_contract.json", "r") as myfile:
                        data = json.loads(myfile.read())
                    w3 = Web3(Web3.HTTPProvider("https://rinkeby.infura.io/v3/d6c7a2d0b9bd40afa49d2eb06cc5baba"))
                    contract = w3.eth.contract(address=user_collection.contract_address, abi=data['abi'])
                    total_supply = contract.functions.totalSupply().call()
                    supply = contract.functions.supply().call()
                    if supply >= total_supply:
                        user_collection.fully_minted = True
                        user_collection.save()
                        return JsonResponse(
                            {"server_message": "success"},
                            status=200,
                        )
        except RawPostDataException:  # NO AJAX DATA PROVIDED - DIFFERENT POST REQUEST INSTEAD
            pass  

    return render(request, "user_mint.html", context)

@requires_user_logged_in
def all_collections_view(request, username_slug):
    context = {"handler_url": ""}

    if request.user.is_authenticated and request.user.username_slug != username_slug: #if logged in but trying to view someone elses collection..
        raise_permission_denied("Collections", "You are not authorised to view this collection.")
        
    # user = User.objects.filter(username_slug=username_slug).first()
    user = request.user
    context["user"] = user

    if user: ##user exists and is the owner of the profile
        users_collections = UserCollection.objects.filter(user=user)
        if users_collections:
            context["users_collections"] = users_collections
            incomplete_collection_names = "$$$".join(list(users_collections.filter(generation_complete=False).values_list("collection_name_slug", flat=True)))
            if incomplete_collection_names:
                context["handler_url"] = reverse("main:collection_loaded_handler", args=[user.username_slug, incomplete_collection_names])
        # else:
        #     # print("User has no collections.")
        #     return clientside_error_with_redirect(request, "You have no collections!", 'main:all_collections')
    else:
        raise_permission_denied("Collections", "User does not exist")

    return render(request, "all_collections.html", context)

def collection_view_loaded_handler(request, username_slug, collection_name_slugs):
    if request.method == "GET":
        if request.user.is_authenticated and request.user.username_slug == username_slug: #request from collection owner user
            if UserCollection.objects.filter(user=request.user, collection_name_slug__in=collection_name_slugs.split("$$$"), generation_complete=True).exists():
                return JsonResponse({"complete": True}, status=200)
            return JsonResponse({"complete": False}, status=200)
    return Http404()

def collection_view(request, username_slug, collection_name_slug):
    context = {"collection_data": None, "collection_images": None}

    user = request.user
    context["user"] = user
    
    if user:
        if user.is_authenticated:
            if user.username_slug != username_slug: #if non owner tries to view collection
                raise_permission_denied("Collection", "You are not authorised to view this collection.")

            user_collection = UserCollection.objects.filter(user=user, collection_name_slug=collection_name_slug).first()
            if not user_collection.generation_complete:
                # print(f"REDIRECTING to {reverse('main:all_collections', args=[username_slug])}")
                return clientside_error_with_redirect(request, "This collection is still being generated. Please wait a few minutes and try again.", reverse('main:all_collections', args=[username_slug]))
            
            if user_collection or not user_collection.public_mint:
                context["ajax_url"] = reverse("main:collection", args=[username_slug, collection_name_slug])
                collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)

                if collection_images:
                    if presigned_url_is_expired(collection_images[0].path): ##check if first image url is expired - if so - renew the presigned urls for all images
                        aws_media_storage_manipulator = AwsMediaStorageManipulator()
                        for image in collection_images:
                            image.path = aws_media_storage_manipulator.create_secure_url(path_to_object=f"{user_collection.path}/{image.name}.png", expire=604800)
                            if image.path_compressed:
                                image.path_compressed = aws_media_storage_manipulator.create_secure_url(path_to_object=f"{user_collection.path}/{image.name}_tbl.png", expire=604800)
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
                if "image_uri" in received_json_data:

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

                    user_collection.image_uri = received_json_data["image_uri"]
                    user_collection.save()
                    metadata_list = []    
                    for count, entry in enumerate(collection_images):
                        metadata = json.loads(entry.metadata)
                        metadata["image"] = f"https://{received_json_data['image_uri']}.ipfs.dweb.link/{count}.png"
                        metadata_list.append(metadata)
                        entry.metadata = json.dumps(metadata)
                        entry.save()
                    
                    return JsonResponse(
                        {
                            "image_uri" : json.dumps(metadata_list)
                        },
                        status=200,
                    )
                if "base_uri" in received_json_data:

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
   
                    user_collection.base_uri = received_json_data["base_uri"]
                    user_collection.collection_ifps_bool = True
                    user_collection.save()
                    if DEPLOYMENT_INSTANCE:
                        user_collection.wipe_linked_aws_images()
                        

                    return JsonResponse(
                        {
                            "base_uri" : received_json_data["base_uri"]
                        },
                        status=200,
                    )
                if "address_set" in received_json_data:
                    if request.user.is_authenticated:
                        UserCollectionMint.objects.create(
                            collection = user_collection,
                            user = request.user, 
                            contract_address = received_json_data["address_set"],
                            chain_id = received_json_data["chain_id"],
                            contract_type = 2
                        )
                        # print("KINERMAN")
                        # print(cocker.collection)
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
                        # print(f"deleted {received_json_data['delete_entry']}")
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
                # elif "delete_duplicates" in received_json_data:
                #     if request.user.is_authenticated:
                #         if user_collection.duplicates_deleted == False:
                #             i = 0
                #             while i < len(collection_images):
                #                 # print(f"{len(collection_images)} LENGTH OF QUERY")
                #                 entry_metadata = json.loads(collection_images[i].metadata)
                #                 # print(f"{entry_metadata} COMPARISON METADATA {i}")
                #                 for j in range(len(collection_images) - 1 - i):           
                #                     value_metadata = json.loads(collection_images[j + 1 + i].metadata)
                #                     # print(f"{value_metadata} CURRENT METADATA {j + 1 + i}")
                #                     if entry_metadata['attributes'] == value_metadata['attributes']:
                #                         # print(collection_images[j + 1 + i])
                #                         collection_images[j + 1 + i].delete()
                #                         user_collection.collection_size = user_collection.collection_size - 1
                #                         # print(user_collection.collection_size)
                #                         # print(f"{collection_images[j + 1 + i]} deleted {j + 1 + i}")
                #                     # user_collection.save()
                #                     collection_images = CollectionImage.objects.filter(linked_collection__id=user_collection.id)
                #                 i = i + 1

                #         user_collection.duplicates_deleted = True
                #         user_collection.save()


                #         return JsonResponse(
                #             {"server_message": "Deleted duplicates"},
                #             status=200,
                #         )
                #     else:
                #         return JsonResponse(
                #             {"server_message": "USER NOT LOGGED IN"},
                #             status=202,
                #         )
                elif "delete_collection" in received_json_data:
                    if request.user.is_authenticated:
                        user_collection.delete()
                        user.save()
                        messages.success(request, f"Collection '{user_collection.collection_name}' deleted succesfully!")
                        return ajax_redirect(reverse("main:all_collections", args=[request.user.username_slug]))
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
                                # print(data)
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
    

    if request.method == "POST":
        if request.user.is_authenticated:
            ##AJAX HANDLING SECTION START
            try:
                received_json_data = json.loads(request.body)
                # print(received_json_data)
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
                        UserCollectionMint.objects.create(
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
                    except Exception as e:
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
    if request.user.is_authenticated:
        raise_permission_denied("Login", "Attempt to Log in when already logged in.")
    return render(request, "login_options.html", {"ajax_url": reverse("main:login_metamask_handler")})

def policy_view(request):
    return render(request, "privacy_policy.html")

def terms_view(request):
    return render(request, "terms_and_conditions.html")

@requires_user_logged_in
def problem_report_view(request):
    problem_report_form = User_Problem_Report_Form(label_suffix="")
    form_id = "problem_report_view"
    if request.method == "POST" and form_id in request.POST:
        if request.user.number_of_unresolved_issues > 8:
            return clientside_error_with_redirect(request, "You exceeded the maximum limit of (unresolved) open tickets (8).", reverse('main:reported_issues'))

        problem_report_form = User_Problem_Report_Form(request.POST, label_suffix="")
        if problem_report_form.is_valid():
            form_model_object = problem_report_form.save(commit=False)
            form_model_object.user = request.user
            form_model_object.save()
            return clientside_success_with_redirect(request, "Your issue has been submitted. Please wait for us to come back to you!", reverse('main:reported_issues'))
        else:
            return clientside_error_with_redirect(request, "There was an error submitting your issue. Please try again.", reverse('main:problem_report'))

    form_context = {"form": problem_report_form, "button_text": "Submit problem!", "identifier": form_id, "title": "Report a problem"}

    return render(request, "base_form.html", form_context)

@requires_user_logged_in
def reported_issues_view(request):    
    return render(request, "reported_issues.html", {"reports": request.user.userproblemreport_set.all()})

def robots_txt_view(request):

    return render(request, "robots.txt", content_type="text/plain")