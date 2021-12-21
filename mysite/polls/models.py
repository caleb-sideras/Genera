from django.db import models
import uuid
import os
from django.contrib.auth.models import User
from functools import partial
from polls.model_tools import *
from django.contrib.auth import get_user_model  # gets the user_model django  default or your own custom
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.utils.timezone import make_aware
from django.template.defaultfilters import default, slugify
import datetime

# Create your models here.
class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()

        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        if username is None or password is None:
            return
        try:
            user = UserModel.objects.filter(
                Q(username__iexact=username) |
                Q(email__iexact=username)
            ).first()
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

#use this class as the basis for any further classes in the project - every model should have an UUID!
class Model(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False)
    class Meta:
        abstract = True

class UserProfile(models.Model):
    # This line is required. Links UserProfile to a User model instance.
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    private = models.BooleanField(default=True)
    # The additional attributes we wish to include.
    picture = models.ImageField(upload_to=generate_filename_userpic, blank=True)
    
    def __str__(self):
        return self.user.username

class UserAsset(Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=False)

    image = models.ImageField(upload_to=user_asset_location, blank=True, null=True)

    def __str__(self):
        return str(self.name)

class UserCollection(Model):
    collection_name = models.CharField(max_length=50, unique=False)
    # image_name = models.CharField(max_length=9, unique=False) # new
    # contract_symbol = models.CharField(max_length=50, unique=False) # new
    description = models.CharField(max_length=150, unique=False)
    dimension_x = models.IntegerField(default=4000)
    dimension_y = models.IntegerField(default=4000)
    collection_size = models.IntegerField(default=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    path = models.CharField(max_length=250)

    # IFPS
    collection_ifps_bool = models.BooleanField(default=False)

    # Smart Contract
    contract_address = models.CharField(max_length=50, unique=False, blank = True, null = True)
    contract_bool =  models.BooleanField(default=False)
    tokens_deployed = models.BooleanField(default=False)
    tokens_deployed_counter = models.IntegerField(default=1)

class CollectionImage(Model):
    linked_collection = models.ForeignKey(UserCollection, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=False)

    path = models.FilePathField()
    path_compressed = models.FilePathField()
    # metadata = models.JSONField(null = True, blank = True)
    metadata = models.TextField(null = True, blank = True)

    # IPFS
    ipfs_image_path = models.URLField(null = True, blank = True, max_length=50) #CharField
    ipfs_metadata_path =  models.URLField(null = True, blank = True, max_length=50)
    ipfs_bool = models.BooleanField(default=False)

    # Smart Contract
    deployed_bool =  models.BooleanField(default=False)
    deployed_txhash = models.CharField(max_length=150, null = True, blank = True)

class Token(Model):
    hash = models.UUIDField(default=uuid.uuid4, editable=True) #editable since we will generate new hashes every time this is requested
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) #can be empty - if no user is tracked by the token (AnonymousUser)

    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Types(models.TextChoices):
        PASSWORD_RESET = 'P', 'password reset token',
        ACCOUNT_VERIFICATION = 'A', 'account verification token',

    type = models.CharField(max_length=1, choices=Types.choices, verbose_name="typ")

    def save(self, *args, **kwargs):
        self.created = make_aware(datetime.now())
        super(Token, self).save(*args, **kwargs)
    
    def __str__(self):
        return str(self.slug)
    









