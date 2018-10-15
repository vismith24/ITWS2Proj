from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    """ Gives additional details to the users """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name =  models.CharField(max_length=50)
    last_name =  models.CharField(max_length=50)
    dob = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)


class GroupProfile(models.Model):
    """ Chat groups for users """

    name = models.CharField(max_length=100)
    admin = models.ForeignKey(User, related_name="group_admin", 
        on_delete=models.CASCADE)
    users = models.ManyToManyField(User)

class Message(models.Model):
    """ Messages being sent """

    text = models.CharField(max_length=300)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(GroupProfile, on_delete=models.CASCADE)