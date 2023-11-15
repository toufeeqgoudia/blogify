from django.urls import path
from .views import register_view, login_view, logout_view, user_view, PostListCreateView, PostDetailView

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', user_view, name='user-view'),
    path('posts/', PostListCreateView.as_view()),
    path('post/<int:pk>/', PostDetailView.as_view()),
]
