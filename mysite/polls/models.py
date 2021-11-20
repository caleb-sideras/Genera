from django.db import models
import uuid
import os
from django.contrib.auth.models import User
from functools import partial
from polls.model_tools import *
# Create your models here.


#use this class as the basis for any further classes in the project - every model should have an UUID!
class Model(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False)
    class Meta:
        abstract = True

class UserAsset(Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=False)

    image = models.ImageField(upload_to=user_asset_location, blank=True, null=True)

    def __str__(self):
        return str(self.name)

class UserCollection(Model):
    collection_name = models.CharField(max_length=50, unique=False)
    description = models.CharField(max_length=150, unique=False)
    dimension_x = models.IntegerField(default=4000)
    dimension_y = models.IntegerField(default=4000)
    collection_size = models.IntegerField(default=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    path = models.CharField(max_length=250)

class CollectionImage(Model):
    linked_collection = models.ForeignKey(UserCollection, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, unique=False)

    path = models.FilePathField()
    metadata = models.JSONField(null = True, blank = True)









