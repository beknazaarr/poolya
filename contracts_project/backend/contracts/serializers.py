from rest_framework import serializers
from .models import Client, Contract

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()
    offer_name = serializers.SerializerMethodField()

    class Meta:
        model = Contract
        fields = '__all__'

    def get_client_name(self, obj):
        return f"{obj.client.last_name} {obj.client.first_name}"

    def get_offer_name(self, obj):
        return obj.offer.name