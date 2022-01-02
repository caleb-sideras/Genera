from django.contrib import admin
from .models import *


class Product_Admin(admin.ModelAdmin):
    list_display = ['name', 'price','price_id', 'description', 'metadata']
    search_fields = []
    list_filter = []

admin.site.register(Product, Product_Admin)
