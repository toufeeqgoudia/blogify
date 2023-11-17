from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer, PostSerializer, PostUpdateSerializer
from .models import User, Post

@csrf_exempt
@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data['email'])
            user.set_password(request.data['password'])
            user.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return Response({'message': 'Logout successful'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetailView(APIView):
    def get(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            serializer = PostSerializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            serializer = PostUpdateSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            post.delete()
            return Response({"message": "Post deleted successfully"})
        except Post.DoesNotExist:
            return Response({"message": "Post not found"}, status=status.HTTP_404_NOT_FOUND)