from rest_framework import serializers
from .models import User, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'full_name', 'profile_img', 'date_joined', 'password']
        extra_kwargs = {'password': {'write_only': True}}


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True) # to access the user data who made the post

    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'content', 'date_posted']


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content']