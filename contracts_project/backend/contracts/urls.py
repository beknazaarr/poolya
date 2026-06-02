from django.urls import path
from .views import (
    ClientListCreateView, ClientDetailView,
    ContractListCreateView, ContractDetailView,
    ExpiringContractsView, WebhookContractView
)

urlpatterns = [
    path('clients/', ClientListCreateView.as_view()),
    path('clients/<int:pk>/', ClientDetailView.as_view()),
    path('', ContractListCreateView.as_view()),
    path('<int:pk>/', ContractDetailView.as_view()),
    path('expiring/', ExpiringContractsView.as_view()),
    path('webhook/', WebhookContractView.as_view()),
]