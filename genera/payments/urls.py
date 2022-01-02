    

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .views import *

app_name = "payments"
urlpatterns = [
    # include other apps
    path("checkout", checkout_view, name="checkout"),
    path("checkout/success/<str:reference>", success_view, name="success"),
    path("checkout/cancel/<str:reference>", cancel_view, name="cancel"),

    # path("create-checkout-session", checkout_session, name="create-checkout-session")
]