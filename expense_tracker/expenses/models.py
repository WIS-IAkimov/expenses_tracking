from django.db import models
from django.conf import settings


class Expense(models.Model):
    """Model that stores a certain expense."""
    created_at = models.DateTimeField()
    description = models.TextField()
    amount = models.IntegerField()
    comment = models.TextField(blank=True, default='')
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='expenses',
        on_delete=models.CASCADE
    )
