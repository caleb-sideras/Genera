from re import S
from django.db import models
import uuid
from genera.settings import DEPLOYMENT_INSTANCE

from main.model_tools import *
from genera.s3_storage import AwsMediaStorageManipulator
from django.utils import timezone
from django.utils.timezone import make_aware
from django.template.defaultfilters import slugify
import datetime
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from main.managers import *
import math
# Create your models here.

#use this class as the basis for any further classes in the project - every model should have an UUID!
class Model(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False)
    class Meta:
        abstract = True

##User modifications stuff
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        
        user = self.model(username=username, email=email, **extra_fields)

        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email="",password=1234, **extra_fields):
        if email == "":
            email = username + "@gmail.com"
            
        return self._create_user(username, email, password, **extra_fields)
    
    def get_or_create_metamask_user(self, metamask_public_address): #this will always create a user entry in db. figure out if there is a way to protect this somehow ?
        existing_user = User.objects.filter(metamask_public_address=metamask_public_address).first()
        if existing_user:
            return existing_user
        else:
            random_username = metamask_public_address
            random_password = str(uuid.uuid4())
            return self.create_user(username=random_username, email=random_username + "@genera-temp.com", password=random_password, metamask_public_address=metamask_public_address, is_metamask_user=True)

    def create_superuser(self, username, password, email="", **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if email == "":
            email = username + "@gmail.com"

        return self._create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    
    credits = models.IntegerField(default=0)

    is_metamask_user = models.BooleanField(default=False)
    metamask_public_address = models.CharField(max_length=150, unique=True, null=True, blank=True)

    username_slug = models.SlugField(unique=True) #Username slug

    class Admin:
        in_admin = True
        id_fields = ['username', 'email', 'date_joined', 'last_login']
    
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    objects = UserManager()

    def __str__(self):
        return str(self.email)
    
    def save(self, *args, **kwargs):
        self.username_slug = slugify(self.username)
        super(User, self).save(*args, **kwargs)
    
    #Custom functions
    def get_all_minted_collections(self):
        return [collection for collection in self.usercollectionmintpublic_set.all()] + [collection for collection in self.usercollectionmint_set.all()]

class MetamaskUserAuth(Model):
    public_address = models.CharField(max_length=150, unique=True)

    nonce = models.CharField(max_length=32, null=True, blank=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True) #store reference to the user, if already created. results in faster lookup.
        
##End of User modifications stuff
class UserProfile(Model):
    # This line is required. Links UserProfile to a User model instance.
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # The additional attributes we wish to include.
    private = models.BooleanField(default=True)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    collection_name = models.CharField(max_length=50, unique=False) 
    collection_name_slug = models.SlugField(unique=False)

    description = models.CharField(max_length=300, unique=False) # not needed?
    dimension_x = models.IntegerField() # not needed?
    dimension_y = models.IntegerField() # not needed?
    collection_size = models.IntegerField(default=0)

    path = models.CharField(max_length=250)

    duplicates_deleted = models.BooleanField(default=False)

    collection_ifps_bool = models.BooleanField(default=False)
    image_uri = models.CharField(max_length=100, unique=False, blank=True, null=True)
    base_uri = models.CharField(max_length=100, unique=False, blank=True, null=True)

    def __str__(self):
        return str(self.collection_name)

    def save(self, *args, **kwargs):
        self.collection_name_slug = slugify(self.collection_name)
        super(UserCollection, self).save(*args, **kwargs)
    
    def delete(self):
        for image in self.collectionimage_set.all(): #explicitly call delete() since ONCASCADE delete does not do that..
            image.delete()
        super(UserCollection, self).delete()
        if DEPLOYMENT_INSTANCE: #delete the collection folder after all else is gone
            storage_manipulator = AwsMediaStorageManipulator()
            storage_manipulator.delete_object_from_bucket(self.path)

    #custom functions
    def get_all_minted_collections(self):
        return self.usercollectionmint_set.all()

    def wipe_linked_aws_images(self):
        if DEPLOYMENT_INSTANCE:
            storage_manipulator = AwsMediaStorageManipulator()
            storage_manipulator.delete_object_from_bucket(self.path)

class CollectionMint_Shared(Model): #NOT A TABLE IN THE DATABASE - is abstract class
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    #collection info
    collection_name = models.CharField(max_length=50, unique=False) 
    description = models.CharField(max_length=300, unique=False)
    contract_type = models.IntegerField(default=0) # 0 = nothing, 1 = privateV1, 2 = publicV1

    #IPFS
    image_uri = models.CharField(max_length=100, unique=False)
    base_uri = models.CharField(max_length=100, unique=False)

    #Smart Contract
    contract_address = models.CharField(max_length=50, unique=True)
    chain_id = models.CharField(max_length=10, unique=False)

    class Meta:
        abstract = True
    
class UserCollectionMint(CollectionMint_Shared):
    collection = models.ForeignKey(UserCollection, on_delete=models.SET_NULL, null=True) #store reference to collection. if collection deleted, this will be set to NULL.

    def save(self, *args, **kwargs): #update the collection field names when saving, if a collection is referenced
        if self.collection:
            self.collection_name = self.collection.collection_name
            self.description = self.collection.description
            self.image_uri = self.collection.image_uri
            self.base_uri = self.collection.base_uri
        super(UserCollectionMint, self).save(*args, **kwargs)

class UserCollectionMintPublic(CollectionMint_Shared):
    pass

class CollectionImage(Model):
    linked_collection = models.ForeignKey(UserCollection, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=False) # not needed

    path = models.TextField(null = True, blank = True, max_length=500)
    path_compressed = models.TextField(null = True, blank = True, max_length=500)
    metadata = models.TextField(null = True, blank = True, max_length=2048)


    def delete(self):
        if DEPLOYMENT_INSTANCE:
            storage_manipulator = AwsMediaStorageManipulator()
            storage_manipulator.delete_object_from_bucket(self.path)
            if self.path_compressed:
                storage_manipulator.delete_object_from_bucket(self.path_compressed)
        super(CollectionImage, self).delete()

    def __str__(self):
        return str(self.name)

class Token(Model):
    hash = models.UUIDField(default=uuid.uuid4, editable=True) #editable since we will generate new hashes every time this is requested
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) #can be empty - if no user is tracked by the token (AnonymousUser)

    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Types(models.TextChoices):
        PASSWORD_RESET = 'P', 'password reset token',
        ACCOUNT_VERIFICATION = 'A', 'account verification token',

    type = models.CharField(max_length=1, choices=Types.choices, verbose_name="typ")

    def save(self, *args, **kwargs):
        self.created = make_aware(datetime.datetime.now())
        super(Token, self).save(*args, **kwargs)

 








