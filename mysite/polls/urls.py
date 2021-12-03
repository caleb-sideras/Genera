from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from polls.views import *

app_name = "polls"
urlpatterns = [
    # include other apps
    path("", main_view, name="main_view"),
    path("temp", temp_view, name="temp_view"),
    path("upload", upload_view, name="upload"),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("register", register_view, name="register"),
    path("mint", mint_view, name="mint"),
    path("user/<str:username>/profile", profile_view, name="profile"),
    # path("metamask", metamask_view, name="metamask"),
    path("user/<str:username>/collections", all_collections_view, name="all_collections"),
    path("user/<str:username>/collections/<str:collection_name>", collection_view, name="collection"),
]
