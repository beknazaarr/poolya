from django.urls import path
from .views import OrganizationListCreateView, OrganizationDetailView, BlockOrganizationView

urlpatterns = [
    path('', OrganizationListCreateView.as_view()),
    path('<int:pk>/', OrganizationDetailView.as_view()),
    path('<int:pk>/block/', BlockOrganizationView.as_view()),
]