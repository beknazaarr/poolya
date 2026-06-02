from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import Client, Contract
from .serializers import ClientSerializer, ContractSerializer

class ClientListCreateView(generics.ListCreateAPIView):
    serializer_class = ClientSerializer

    def get_queryset(self):
        queryset = Client.objects.all()
        org_id = self.request.query_params.get('organization')
        if org_id:
            queryset = queryset.filter(organization_id=org_id)
        return queryset

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ContractListCreateView(generics.ListCreateAPIView):
    serializer_class = ContractSerializer

    def get_queryset(self):
        queryset = Contract.objects.all()
        manager_id = self.request.query_params.get('manager')
        status_param = self.request.query_params.get('status')
        org_id = self.request.query_params.get('organization')
        if manager_id:
            queryset = queryset.filter(manager_id=manager_id)
        if status_param:
            queryset = queryset.filter(status=status_param)
        if org_id:
            queryset = queryset.filter(offer__organization_id=org_id)
        return queryset

class ContractDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

class ExpiringContractsView(APIView):
    def get(self, request):
        today = timezone.now().date()
        in_30 = today + timedelta(days=30)
        contracts = Contract.objects.filter(
            end_date__lte=in_30,
            end_date__gte=today,
            status='active'
        )
        serializer = ContractSerializer(contracts, many=True)
        return Response(serializer.data)

class WebhookContractView(APIView):
    permission_classes = []  # публичный endpoint для внешних платформ

    def post(self, request):
        data = request.data
        try:
            client, _ = Client.objects.get_or_create(
                email=data['client_email'],
                organization_id=data['organization_id'],
                defaults={
                    'first_name': data.get('first_name', ''),
                    'last_name': data.get('last_name', ''),
                    'phone': data.get('phone', ''),
                }
            )
            from offers.models import Offer
            from datetime import date, timedelta
            offer = Offer.objects.get(id=data['offer_id'])
            signed_date = date.today()
            end_date = signed_date + timedelta(days=offer.duration_days)
            contract = Contract.objects.create(
                offer=offer,
                client=client,
                signed_date=signed_date,
                end_date=end_date,
                status='active',
                source='api'
            )
            return Response({'message': 'Договор создан', 'contract_id': contract.id}, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)