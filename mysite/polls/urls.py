from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from polls.views import main_view

urlpatterns = [

    # include other apps
    path('', main_view, name="main_view"),
    # path('', main_view, name="main_view"),

]
