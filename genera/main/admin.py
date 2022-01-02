from django.contrib import admin
from main.models import *
from django.contrib.auth import admin as auth_admin

class User_Admin(auth_admin.UserAdmin):
    fieldsets = (
        (None, {'fields': ('username','email', 'password', 'credits')}),
    )

    list_display = ['username', 'email']
    search_fields = []
    list_filter = []
    exclude = ["groups", "user_permissions"]
    change_password_form = auth_admin.AdminPasswordChangeForm
    actions = []

# Register your models here.
class UserAsset_Admin(admin.ModelAdmin):
    list_display = ['user', 'name']
    search_fields = []
    list_filter = []

class UserCollection_Admin(admin.ModelAdmin):
    list_display = ['collection_name']
    search_fields = []
    list_filter = []

admin.site.register(User, User_Admin)
admin.site.register(UserAsset, UserAsset_Admin)
admin.site.register(UserCollection, UserCollection_Admin)