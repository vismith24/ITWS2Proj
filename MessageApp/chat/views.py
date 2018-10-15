from django.shortcuts import render, get_object_or_404, HttpResponse
from django.utils.safestring import mark_safe
from django.contrib.auth.models import User
from .models import GroupProfile
from django.contrib.auth.decorators import login_required
import json

# Create your views here.

@login_required
def index(request):
    """ Default Page """

    return render(request, 'chat/index.html')


@login_required
def add_group(request):
    """ add a group """
    
    name = request.POST['name']
    admin_pk = request.POST['admin_pk']
    admin = get_object_or_404(User, pk=admin_pk)
    g = GroupProfile(name = name, admin=admin)
    g.save()
    g.users.add(admin)
    g.save()
    return HttpResponse(g.pk)


