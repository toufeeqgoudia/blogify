from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer


class RegisterView(APIView):
    def post(request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data['email'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(request):
        user = get_object_or_404(User, email=request.data['email'])
        if not user.check_password(request.data['password']):
            return Response({"error": "Wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({'token': token.key, 'user': serializer.data})


class UserView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(request):
        return Response('Authenticated')



class LogoutView(APIView):
    def post(request):
        user = get_object_or_404(User, email=request.data['email'])
        token = Token.objects.delete(user=user)
        return Response("Logged out")