from django.shortcuts import render
from polls.generator_alg import *
from django.templatetags.static import static

# Create your views here.


def main_view(request):

    # if request.METHOD == "POST":

    created = createImage

    # x = generateRandomNumber(1, 3, 5)
    context = {}

    return render(request, 'home.html', context={"created": created})
