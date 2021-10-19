from django.contrib import admin
from .models import *

# Register your models here.
class UserAsset_Admin(admin.ModelAdmin):
    list_display = ['user', 'name']
    search_fields = []
    list_filter = []

admin.site.register(UserAsset, UserAsset_Admin)