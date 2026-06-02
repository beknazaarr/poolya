from django.shortcuts import render

from rest_framework import generics
from .models import Document
from .serializers import DocumentSerializer

class DocumentListCreateView(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        contract_id = self.request.query_params.get('contract')
        if contract_id:
            return Document.objects.filter(contract_id=contract_id)
        return Document.objects.all()

class DocumentDetailView(generics.RetrieveDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer