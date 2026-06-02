from django.db import models
from contracts.models import Contract

class Document(models.Model):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name