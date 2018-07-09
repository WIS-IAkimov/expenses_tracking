import random
import datetime
import urllib.request
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone

from expenses.models import Expense

DICT_URL = ("http://svnweb.freebsd.org/csrg/share/dict/words?"
            "view=co&"
            "content-type=text/plain")

class Command(BaseCommand):
    help = 'Generates a number of random expenses for the sake of testing'

    def handle(self, *args, **options):
        response = urllib.request.urlopen(DICT_URL)
        long_txt = response.read().decode()
        words = long_txt.splitlines()

        for _ in range(25):
            description = ' '.join(
                random.sample(words, random.randint(5, 17))
            ).capitalize() + '.'
            amount = random.randint(3, 1450)
            expense_instance = Expense(
                description=description, amount=amount,
                created_at=timezone.now(),
                comment='', user_id=1
            )
            expense_instance.save()

        self.stdout.write('abc')
