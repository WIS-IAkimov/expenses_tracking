from django.db import models
from django.conf import settings

# Create your models here.

class Expense(models.Model):
    """Model that stores a certain expense."""
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    amount = models.IntegerField()
    comment = models.TextField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='expenses',
        on_delete=models.CASCADE
    )
