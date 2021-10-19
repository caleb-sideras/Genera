from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from polls.views import main_view
from polls.views import temp_view
from polls.views import upload

urlpatterns = [

    # include other apps
    path('', main_view, name="main_view"),
    path('temp', temp_view, name="temp_view"),
    path('upload', upload, name="upload")

]
