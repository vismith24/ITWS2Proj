from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect

# Create your views here.


def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        redirect('/chat')
    else:
        
