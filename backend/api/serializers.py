from rest_framework import serializers
from .models import User, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'full_name', 'profile_img', 'date_joined', 'password']


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer() # to access the user data who made the post

    class Meta:
        model = Post
        fields = ['id', 'author', 'title', 'content', 'date_posted']

        read_only_fields = ['author']


class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content']