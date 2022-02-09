from re import A
import xdrlib
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from main.views import *

app_name = "main"
urlpatterns = [
    # include other apps
    path("", main_view, name="main_view"),
    path("upload", upload_view, name="upload"),
    path("loginweb2", login_view, name="login"),
    path("loginweb2/<path:current_extension>", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("logout/<path:current_extension>", logout_view, name="logout"),
    path("register", register_view, name="register"),
    path("register/<uuid:token_url>", account_activation_view, name="account_activation"),
    path("reset", password_reset_view, name="password_reset"),
    path("reset/<uuid:token_url>", password_reset_handler_view, name="password_reset_handler"),
    path("about", about_view, name="about"),
    path("documentation", documentation_view, name="documentation"),
    path("user/<str:username>/profile", profile_view, name="profile"),
    path("user/<str:username>/profile/<str:contract_address>", mint_view, name="user_mint"),
    path("user/<str:username>/profile/mint2/<str:contract_address>", mint_view2, name="user_mint2"),
    path("user/<str:username>/collections", all_collections_view, name="all_collections"),
    path("user/<str:username>/collections/<str:collection_name>", collection_view, name="collection"),
    # path("create-checkout-session", checkout_session, name="create-checkout-session")
    path("mint", public_mint_view, name="mint"),
    path("login", login_options_view, name="login_options")
]
 