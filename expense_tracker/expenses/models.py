from django.db import models

# Create your models here.

class Expense(models.Model):
    """Model that stores a certain expense."""
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    amount = models.IntegerField()
    comment = models.TextField()
