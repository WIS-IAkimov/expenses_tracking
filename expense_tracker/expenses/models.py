from django.db import models
from django.conf import settings
from django.contrib.auth.models import User as BaseUser, Group


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


class User(BaseUser):

    def _set_role(self, value):
        print(value)
        try:
            group = Group.objects.get(name=value)
        except:
            return
        print(group)
        self.groups.clear()
        self.groups.add(group)

    def _get_role(self):
        group = self.groups.last()
        if group:
            return group.name
        return None

    role = property(_get_role, _set_role)

    class Meta:
        proxy = True
