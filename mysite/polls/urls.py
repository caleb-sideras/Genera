from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from polls.views import *

app_name = 'polls'
urlpatterns = [

    # include other apps
    path('', main_view, name="main_view"),
    path('temp', temp_view, name="temp_view"),
    path('upload', upload_view, name="upload"),
    path('login', login_view, name="login")

]
