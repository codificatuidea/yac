from django.conf.urls import include, url
from django.contrib import admin

from . import views

urlpatterns = [
    url('', views.UserListView.as_view()),
]