from django.urls import path
from .views import register_view, login_view, logout_view, user_view, UserProfileUpdateView, PostListCreateView, PostDetailView

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', user_view, name='user-view'),
    path('user/update/<int:pk>/', UserProfileUpdateView.as_view(), name='user-update'),
    path('posts/', PostListCreateView.as_view(), name='posts'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post'),
]
