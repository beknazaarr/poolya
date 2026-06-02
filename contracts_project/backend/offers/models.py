from django.db import models
from organizations.models import Organization

class Offer(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='offers')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    offer_type = models.CharField(max_length=100)
    duration_days = models.IntegerField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.organization.name}"