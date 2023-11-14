from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('A user email is needed.')
        
        if not password:
            raise ValueError('A user password is needed.')
        
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('A superuser email is needed.')
        
        if not password:
            raise ValueError('A superuser password is needed.')
        
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
    

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    profile_img = models.ImageField(upload_to='profile_img', default='default.jpg')
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()