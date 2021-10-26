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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    collection_name = models.CharField(max_length=50, unique=False)
    ## Folder will be created EG. media/{user.name}/collections/{collection_name}/[list of imgs...]

    description = models.CharField(max_length=150, unique=False)

    metadata = models.JSONField() #store {"img_name": {"path/link": img_location_on_server, "overall_rarity": overaLl_rarity, "dimensions": dimensions, "assets": {"asset_name": asset_name, "asset_rarity": asset_rarity }}}
    ##I THINK no need for img field actually - since the paths are hardcoded in the views - we can store reference during creation.
    #When collection deleted/published we can easily either delete whole folder, or access individual paths by img_name or id or smthn.

