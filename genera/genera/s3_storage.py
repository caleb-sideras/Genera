from storages.backends.s3boto3 import S3Boto3Storage
from .settings import AWS_STORAGE_BUCKET_NAME

class AwsMediaStorageManipulator(S3Boto3Storage):
    bucket_name = AWS_STORAGE_BUCKET_NAME
    location = 'media'

    def create_folder(self, folder_path): #not really necessary :)
        folder_path = f"{self.location}/{folder_path}"
        self.bucket.meta.client.put_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=(folder_path+'/'))
    
    def create_secure_url(self, path_to_object, parameters=None, expire=None, http_method=None):
        name = self._normalize_name(self._clean_name(path_to_object))

        params = parameters.copy() if parameters else {}
        params['Bucket'] = self.bucket.name
        params['Key'] = name
        url = self.bucket.meta.client.generate_presigned_url('get_object', Params=params, ExpiresIn=expire, HttpMethod=http_method)
        return url