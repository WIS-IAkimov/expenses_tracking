import random
import datetime
import urllib.request
from django.core.management.base import BaseCommand, CommandError
from expenses.models import Expense

DICT_URL = "http://svnweb.freebsd.org/csrg/share/dict/words?view=co&content-type=text/plain"

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
            date = datetime.date.today()
            time = datetime.time()
            e = Expense(
                description=description, amount=amount,
                date=date, time=time, comment=''
            )
            e.save()

        # for poll_id in options['poll_id']:
        #     try:
        #         poll = Poll.objects.get(pk=poll_id)
        #     except Poll.DoesNotExist:
        #         raise CommandError('Poll "%s" does not exist' % poll_id)
        #
        #     poll.opened = False
        #     poll.save()
        #
        #     self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % poll_id))
        self.stdout.write('abc')
