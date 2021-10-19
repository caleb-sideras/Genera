from django.shortcuts import render
from polls.generator_alg import *
from django.templatetags.static import static
from django.core.files.storage import FileSystemStorage
from django.shortcuts import redirect
from django.urls import reverse 
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
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


def upload_view(request):
    users_imgs = UserAsset.objects.filter(user=request.user)

    if request.method == 'POST' and request.FILES['upload']:
        upload = request.FILES['upload']

        asset_db = UserAsset.objects.create(user=request.user)
        asset_db.name = request.POST["name"]
        asset_db.image = upload
        asset_db.save()
        users_imgs = UserAsset.objects.filter(user=request.user)
        
        print("SAVED TO DB")
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
