from django.db import models
import uuid
from main.model_tools import *
from django.utils import timezone
from django.utils.timezone import make_aware
# from genera.settings import AUTH_USER_MODEL
import datetime
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager
from main.managers import *
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

    def create_superuser(self, username, password, email="", **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have type="S"')

        if email == "":
            email = username + "@gmail.com"

        return self._create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)

    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    is_staff = models.BooleanField(default=False)
    credits = models.IntegerField(default=50) # discuss

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    class Admin:
        in_admin = True
        id_fields = ['username', 'email', 'date_joined', 'last_login']

    objects = UserManager()

    def __str__(self):
        return str(self.email)
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

    collection_name = models.CharField(max_length=50, unique=False)
    description = models.CharField(max_length=300, unique=False)
    dimension_x = models.IntegerField(default=4000)
    dimension_y = models.IntegerField(default=4000)
    collection_size = models.IntegerField(default=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    path = models.CharField(max_length=250)
    token_name = models.CharField(max_length=9) # wait till deploy?
    image_name = models.CharField(max_length=10)
    duplicates_deleted = models.BooleanField(default=False)

    # IFPS
    collection_ifps_bool = models.BooleanField(default=False)
    image_uri = models.CharField(max_length=100, unique=False)

    # Smart Contract Universal
    contract_address = models.CharField(max_length=50, unique=False, blank = True, null = True)
    contract_bool =  models.BooleanField(default=False) # probs not needed
    chain_id = models.CharField(max_length=10, unique=False)
    contract_type = models.IntegerField(default=0) # 0 = nothing, 1 = privateV1, 2 = publicV1
    
    # Smart Contract Public
    base_uri = models.CharField(max_length=100, unique=False)
    minting_cost = models.CharField(max_length=50, unique=False)
    
    # Smart Contract Private
    tokens_deployed = models.BooleanField(default=False)

class CollectionImage(Model):
    linked_collection = models.ForeignKey(UserCollection, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=False) # not needed

    path = models.FilePathField()
    path_compressed = models.FilePathField(null=True, blank=True)
    metadata = models.TextField(null = True, blank = True)

    # IPFS
    ipfs_metadata_path =  models.URLField(null = True, blank = True, max_length=50) # not needed 

    # Private Contract
    ipfs_bool = models.BooleanField(default=False)

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
    
    def __str__(self):
        return str(self.slug)









