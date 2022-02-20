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
    path("", home_view, name="home"),
    path("learn", main_view, name="main_view"),
    path("upload", upload_view, name="upload"),

    path("login/options", login_options_view, name="login_options"),

    path("login/regular", login_view, name="login"),

    path("login/metamask", metamask_login_handler_view, name="login_metamask_handler"), #no template for this view - just a url to handle the metamask login stuff

    path("logout", logout_view, name="logout"),
    path("logout/<path:current_extension>", logout_view, name="logout"),

    path("register", register_view, name="register"),
    path("register/<uuid:token_url>", account_activation_view, name="account_activation"),

    path("reset", password_reset_view, name="password_reset"),
    path("reset/<uuid:token_url>", password_reset_handler_view, name="password_reset_handler"),

    path("about", about_view, name="about"),
    path("documentation", documentation_view, name="documentation"),
    path("user/<slug:username_slug>/profile", profile_view, name="profile"),
    
    path("user/<slug:username_slug>/profile/<str:contract_address>", mint_view, name="user_mint"),

    path("user/<slug:username_slug>/collections", all_collections_view, name="all_collections"),
    path("user/<slug:username_slug>/collections/<slug:collection_name_slug>", collection_view, name="collection"),
    path("user/<slug:username_slug>/collections/<str:collection_name_slugs>/request_status", collection_view_loaded_handler, name="collection_loaded_handler"),
    # path("create-checkout-session", checkout_session, name="create-checkout-session")
    path("mint", public_mint_view, name="mint"),
    path("privacy", policy_view, name="privacy"),
    path("terms", terms_view, name="terms"),
    path("contact_us/problem_report", problem_report_view, name="problem_report"),
    path("dashboard/reported_issues", reported_issues_view, name="reported_issues"),
]
 