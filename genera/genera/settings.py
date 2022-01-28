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

from django.db.models.query import InstanceCheckMeta

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
EMAIL_PASSWORD = 'yycgppubwhmfqgcx'
EMAIL_HOST_USER = "artemlimo@gmail.com"
EMAIL_HOST_PASSWORD = 'yycgppubwhmfqgcx'
EMAIL_ADDRESS = 'artemlimo@gmail.com'
EMAIL_FROM_ADDRESS = 'artemlimo@gmail.com'
DEFAULT_FROM_EMAIL = 'artemlimo@gmail.com'
EMAIL_USE_TLS = True

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

if DEBUG:
    import mimetypes
    mimetypes.add_type("application/javascript", ".js", True)

ALLOWED_HOSTS = ['localhost','3.141.72.59', 'genera.link', 'www.genera.link']

# Application definition
APPS = ['main', 'payments']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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
            ],
        },
    },
]

WSGI_APPLICATION = 'genera.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


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

AUTHENTICATION_BACKENDS = (
    'init_backend.CustomBackend',
)
AUTH_USER_MODEL = 'main.User'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
STATIC_ROOT = 'static_root'
MEDIA_ROOT  = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
MAX_UPLOAD_SIZE = "5242880000"

#TEST
STRIPE_PUBILC_KEY = "pk_test_51K9ckjDlWp2mVdKSIZtZWcEmEIogg5LG2Vx9p8IjIM38bOo8CbGqddJuYeDEvbPUCdM11b7MeFD8YGC82V5m2Xqo00cHqVNc07"
STRIPE_PRIVATE_KEY = "sk_test_51K9ckjDlWp2mVdKSxhtGeV44FHSaO7z89AYlxltSqY6hnSRHP3zhcOfWlQDqUmX8rqtHvjkEnpTconUyBS7K4H5Q00dGzl4yTg"
STRIPE_WEBHOOK_SECRET = "cbya-zuur-cfbo-smeo-help"#maybe