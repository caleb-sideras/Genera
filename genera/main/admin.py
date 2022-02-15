from django.contrib import admin
from main.models import *
from django.contrib.auth import admin as auth_admin

#MIXINS
class AdminNotVisibleMixin():
    def get_model_perms(self, request):
        return {}
#END MIXINS

class User_Admin(auth_admin.UserAdmin):
    fieldsets = (
        (None, {'fields': ('username','email', 'password', 'credits', 'is_active', 'is_superuser', 'is_metamask_user',)}),
    )

    list_display = ['username', 'email']
    readonly_fields = ['is_metamask_user', 'is_active', 'is_superuser']
    search_fields = []
    list_filter = []
    exclude = ["groups", "user_permissions"]
    change_password_form = auth_admin.AdminPasswordChangeForm
    actions = []
# class UserAsset_Admin(admin.ModelAdmin):
#     list_display = ['user', 'name']
#     search_fields = []
#     list_filter = []

class CollectionImage_Admin(AdminNotVisibleMixin, admin.ModelAdmin):
    list_display = ['linked_collection','name', 'path', 'path_compressed', 'metadata']
    search_fields = []
    list_filter = []

class CollectionImage_Inline(admin.TabularInline):
    readonly_fields = ['name', 'path', 'path_compressed', 'metadata']
    model = CollectionImage

class UserCollection_Admin(admin.ModelAdmin):
    list_display = ['collection_name', 'user']
    search_fields = []
    list_filter = []
    # inlines = [CollectionImage_Inline]

class FailedGeneratioins_Admin(admin.ModelAdmin):
    list_display = ['user', 'collection_name', 'collection_size', 'error_message']
    search_fields = []
    list_filter = []

admin.site.register(User, User_Admin)
# admin.site.register(UserAsset, UserAsset_Admin)
admin.site.register(UserCollection, UserCollection_Admin)
# admin.site.register(CollectionImage, CollectionImage_Admin)
admin.site.register(FailedUserCollection_Tracker, FailedGeneratioins_Admin)
admin.site.register(MetamaskUserAuth)
admin.site.register(UserCollectionMintPublic)
admin.site.register(UserProblemReport)