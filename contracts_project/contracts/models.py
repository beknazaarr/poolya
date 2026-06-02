from django.db import models
from offers.models import Offer
from organizations.models import Organization
from users.models import User

class Client(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='clients')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.last_name} {self.first_name}"

class Contract(models.Model):
    STATUS_CHOICES = [
        ('active', 'Действующий'),
        ('expired', 'Истёк'),
        ('terminated', 'Расторгнут'),
        ('renewal', 'На продлении'),
    ]
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='contracts')
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='contracts')
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='contracts')
    signed_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    source = models.CharField(max_length=50, default='manual')  # manual / api
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Договор #{self.id} — {self.client}"