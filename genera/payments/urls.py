    

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .views import *

app_name = "payments"
urlpatterns = [
    # include other apps
    path("checkout/", checkout_view, name="checkout"),
    path("checkout/<str:session_id>/", handle_checkout_session_view, name="handle_checkout_session"),

    # path("create-checkout-session", checkout_session, name="create-checkout-session")
]