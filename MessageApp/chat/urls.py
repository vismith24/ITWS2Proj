from django.urls import path

from . import views

urlpatterns = [
    path('', views.index),
    path('add_group/', views.add_group)
]