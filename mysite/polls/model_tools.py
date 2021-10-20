import os
from functools import partial
import uuid

def _hash_file_into_folder(media_subfolder, instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4().hex[:5], ext)
    return os.path.join(media_subfolder, filename)

def hash_file_into_folder(media_subfolder):
    return partial(_hash_file_into_folder, media_subfolder)

def user_asset_location(self, filename):
    extension = filename.split('.')[-1]
    filename = '{}/{}/{}.{}'.format(self.user.username, self.name.lower(), uuid.uuid4().hex[:5], extension)
    return os.path.join('user_asset_storage', filename)