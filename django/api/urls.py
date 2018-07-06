from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url('rest/', include('rest_auth.urls')),
    url('rest/registration/', include('rest_auth.registration.urls')),
]