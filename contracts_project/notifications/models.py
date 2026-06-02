from django.db import models
from contracts.models import Contract
from users.models import User

class Notification(models.Model):
    TYPE_CHOICES = [
        ('expiring_30', 'Истекает через 30 дней'),
        ('expiring_14', 'Истекает через 14 дней'),
        ('expiring_7',  'Истекает через 7 дней'),
        ('expired',     'Истёк'),
    ]
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='notifications')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.notification_type} — Договор #{self.contract.id}"