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
# class UserAsset_Admin(admin.ModelAdmin):
#     list_display = ['user', 'name']
#     search_fields = []
#     list_filter = []

class CollectionImage_Admin(admin.ModelAdmin):
    list_display = ['linked_collection','name', 'path', 'path_compressed', 'metadata']
    search_fields = []
    list_filter = []

class CollectionImage_Inline(admin.TabularInline):
    model = CollectionImage

class UserCollection_Admin(admin.ModelAdmin):
    list_display = ['collection_name']
    search_fields = []
    list_filter = []
    inlines = [CollectionImage_Inline]

admin.site.register(User, User_Admin)
# admin.site.register(UserAsset, UserAsset_Admin)
admin.site.register(UserCollection, UserCollection_Admin)
admin.site.register(CollectionImage, CollectionImage_Admin)