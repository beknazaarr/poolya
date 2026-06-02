from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Organization
from .serializers import OrganizationSerializer

class OrganizationListCreateView(generics.ListCreateAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class BlockOrganizationView(APIView):
    def post(self, request, pk):
        try:
            org = Organization.objects.get(pk=pk)
            org.is_active = not org.is_active
            org.save()
            status_str = 'активирована' if org.is_active else 'заблокирована'
            return Response({'message': f'Организация {status_str}'})
        except Organization.DoesNotExist:
            return Response({'error': 'Не найдена'}, status=404)