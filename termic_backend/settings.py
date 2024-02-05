"""
Django settings for termic_backend project.

Generated by 'django-admin startproject' using Django 4.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os #import the os for locate the static and templates for  project 
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR2 = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


TEMPLATES_DIR =  os.path.join(BASE_DIR,'build')

STATIC_DIR = os.path.join(BASE_DIR2,"base/static") # locate the static file like image and js and css file and images for project


IMAGES_DIR = os.path.join(BASE_DIR2,"base/static/images/products")



# print('look below')
# print('directry is  ' , TEMPLATES_DIR)
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-iy#in_a@gd+4yx_f_k#-0bie_xg&zh8ev0t774g1w=@vgor$hj'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','localhost','termic.onrender.com']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',  
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    #new install below 
    'base.apps.BaseConfig',    # this is for config the backends in django
    'rest_framework',
    "corsheaders",
    'storages',
]

# this is for authenticate the user from jwtAuthentcation
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}


# Django project settings.py

from datetime import timedelta
...
# this for session management in here single user can able to login for 30 days this is fromj wtbfreamwork 
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,

    "ALGORITHM": "HS256",
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,

    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",

    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}



MIDDLEWARE = [
     # new install 
    "corsheaders.middleware.CorsMiddleware",
    # "django.middleware.common.CommonMiddleware",
     "whitenoise.middleware.WhiteNoiseMiddleware",


    #default imports
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
   
]

#in here urls for set the urls for base config
ROOT_URLCONF = 'termic_backend.urls'


#this is for templates like htlm file needs to be declared in here
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
           os.path.join(BASE_DIR , 'termic_frontend/build'),
            # TEMPLATES_DIR,
        ],
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

WSGI_APPLICATION = 'termic_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


# this configured for mysql database db bd named termic 
# create database termic.     and use this 

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'termic',
        'USER': os.environ.get('MYSQL_DB_PASS'),
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'termicdb',
#         'USER': 'harikrishnan',
#         'PASSWORD': os.environ.get('DB_PASS'),
#         'HOST': 'termic-identifier.cl2wgi84ya05.eu-north-1.rds.amazonaws.com',
#         'PORT': '5432',
#     }
# }


# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'termic',
#         'USER': 'postgres',
#         'PASSWORD': os.environ.get('DB_PASS'),
#         'HOST': 'monorail.proxy.rlwy.net',
#         'PORT': '22825',
#     }
# }
# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/' # this is a folder to stores  static file for project inetilation
MEDIA_URL = 'images/' # this folder stores images for frontend to render

STATICFILES_DIRS =[
    # STATIC_DIR,  # inherited from static files
    BASE_DIR / 'base/static',
    BASE_DIR / 'termic_frontend/build/static'

    
]

# print('static file dir is  : ' ,STATICFILES_DIRS)

MEDIA_ROOT = IMAGES_DIR # this for set the images
# print('media root dir i s :',MEDIA_ROOT)
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_ROOT = BASE_DIR / 'staticfiles'
# allow the react ot access the urls in django
CORS_ALLOW_ALL_ORIGINS = True

#aws sttings
# AWS_QUERYSTRING_AUTH =False
    
# DEFAULT_FILE_STORAGE = "storages.backends.s3.S3Storage"




# AWS_ACCESS_KEY_ID=os.environ.get('AWS_ACCESS_KEY_ID')


# AWS_SECRET_ACCESS_KEY=os.environ.get('AWS_SECRET_ACCESS_KEY')


# AWS_STORAGE_BUCKET_NAME = 'termic-bucket'


# if os.getcwd() == "/app":
#     DEBUG = False
# DEBUG = False 