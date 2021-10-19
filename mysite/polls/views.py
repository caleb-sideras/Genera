from django.shortcuts import render
from polls.generator_alg import *
from django.templatetags.static import static
from django.core.files.storage import FileSystemStorage

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


def upload(request):
    if request.method == 'POST' and request.FILES['upload']:
        upload = request.FILES['upload']
        fss = FileSystemStorage()
        file = fss.save(upload.name, upload)
        file_url = fss.url(file)
        return render(request, 'upload.html', {'file_url': file_url})
    return render(request, 'upload.html')
