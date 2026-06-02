from django.urls import path
from .views import UserListCreateView, UserDetailView, MeView, ChangePasswordView, BlockUserView

urlpatterns = [
    path('', UserListCreateView.as_view()),
    path('<int:pk>/', UserDetailView.as_view()),
    path('me/', MeView.as_view()),
    path('change-password/', ChangePasswordView.as_view()),
    path('<int:pk>/block/', BlockUserView.as_view()),
]