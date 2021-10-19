from django.db import models
import uuid
import os
from django.contrib.auth.models import User
# Create your models here.


#use this class as the basis for any further classes in the project - every model should have an UUID!
class Model(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable = False)
    class Meta:
        abstract = True

def generate_filename_userasset(instance, filename):
    part = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex, part)
    return os.path.join('user_asset_storage', filename)

# class UserProfile(Model):
#     # This line is required. Links UserProfile to a User model instance.
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
    
#     # The additional attributes we wish to include.
#     picture = models.ImageField(upload_to=generate_filename_userpic, blank=True, null=True)
    
#     def __str__(self):
#         return self.user.username

class UserAsset(Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50, unique=False)

    image = models.ImageField(upload_to=generate_filename_userasset, blank=True, null=True)

    def __str__(self):
        return str(self.name)
