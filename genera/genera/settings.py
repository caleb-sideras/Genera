"""
Django settings for genera project.

Generated by 'django-admin startproject' using Django 3.2.8.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
import mimetypes

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = os.path.join(BASE_DIR, 'static')
MEDIA_DIR = os.path.join(BASE_DIR, 'media')
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-!h$vhss##+00p6$09#!6ejcmx1+!q#x%-+#uj^@(vghcn%)-!o'

BASE_URL = 'http://localhost:8000'

#Email Setup
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

EMAIL_PORT = 587
EMAIL_ACTIVE_FIELD = 'is_active'
EMAIL_SERVER = 'smtp.gmail.com'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PASSWORD = 'xlstriwxtynxjftg'
EMAIL_HOST_PASSWORD = 'xlstriwxtynxjftg'
EMAIL_HOST_USER = "generanft@gmail.com"
EMAIL_ADDRESS = 'generanft@gmail.com'
EMAIL_FROM_ADDRESS = 'generanft@gmail.com'
DEFAULT_FROM_EMAIL = 'generanft@gmail.com'
EMAIL_USE_TLS = True

DEBUG = True #TODO:
#'172.31.24.181', 'ec2-3-134-42-144.us-east-2.compute.amazonaws.com'
ALLOWED_HOSTS = ['genera.link','www.genera.link', 'genera.us-east-2.elasticbeanstalk.com']
DEPLOYMENT_INSTANCE = 'RDS_DB_NAME' in os.environ
if DEPLOYMENT_INSTANCE:
    import requests
    try:
        internal_ip = requests.get('http://instance-data/latest/meta-data/local-ipv4').text
    except requests.exceptions.ConnectionError:
        pass
    else:
        ALLOWED_HOSTS.append(internal_ip)
    del requests

    BASE_URL = 'https://www.genera.link'
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    DEBUG = False
else:
    ALLOWED_HOSTS.append('localhost')

mimetypes.add_type("application/javascript", ".js", True) #TODO: IDK IF THIS NEEDS BE IN PROD!

#172.31.24.181 is the single EC2 instance private ip !!!!
#ec2-3-134-42-144.us-east-2.compute.amazonaws.com

# Application definition
APPS = ['main', 'payments']
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'storages',
] + APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'genera.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 'genera.context_processors.protecc',
            ],
        },
    },
]

WSGI_APPLICATION = 'genera.wsgi.application'

if DEPLOYMENT_INSTANCE:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ['RDS_DB_NAME'],
            'USER': os.environ['RDS_USERNAME'],
            'PASSWORD': "ruE4abvB9TA6yNLx", 
            'HOST': os.environ['RDS_HOSTNAME'],
            'PORT': os.environ['RDS_PORT'],
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

USE_TZ = True

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTHENTICATION_BACKENDS = ( 'django.contrib.auth.backends.ModelBackend', 'init_backend.CustomBackend', )

AUTH_USER_MODEL = 'main.User'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    # os.path.join(BASE_DIR, 'static/dist')
]
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
STATIC_ROOT = 'static_prod'

MEDIA_ROOT  = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
MAX_UPLOAD_SIZE = "5242880000"

#TEST
STRIPE_PUBILC_KEY = "pk_test_51K9ckjDlWp2mVdKSIZtZWcEmEIogg5LG2Vx9p8IjIM38bOo8CbGqddJuYeDEvbPUCdM11b7MeFD8YGC82V5m2Xqo00cHqVNc07"
STRIPE_PRIVATE_KEY = "sk_test_51K9ckjDlWp2mVdKSxhtGeV44FHSaO7z89AYlxltSqY6hnSRHP3zhcOfWlQDqUmX8rqtHvjkEnpTconUyBS7K4H5Q00dGzl4yTg"

#LIVE
STRIPE_PUBILC_KEY_LIVE = "pk_live_51K9ckjDlWp2mVdKSm5NVgmeByiDBjHuIQQIW3xheApnLgbPYLvpBe84ANirJlu2F6T4vRv1dw0860XQiNacW8Lt000ve7MFMzu"
STRIPE_PRIVATE_KEY_LIVE = "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"

STRIPE_WEBHOOK_SECRET = "cbya-zuur-cfbo-smeo-help"#maybe

#AWS BUCKET STUFF
AWS_STORAGE_BUCKET_NAME = 'genera-media'
if DEPLOYMENT_INSTANCE: #NOTE: remove this if statement if you want to test s3 locally!!!
    AWS_ACCESS_KEY_ID = 'AKIAYWR7VJZHQI73U2X4'
    AWS_SECRET_ACCESS_KEY = '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'
    AWS_S3_REGION_NAME = 'us-east-2'
    AWS_S3_SIGNATURE_VERSION = 's3v4'
    AWS_S3_CUSTOM_DOMAIN = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com/'
    DEFAULT_FILE_STORAGE = 'genera.s3_storage.AwsMediaStorageManipulator'