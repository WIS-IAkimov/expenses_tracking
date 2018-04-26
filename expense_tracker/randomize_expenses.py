import random
import urllib.request

# Generate a dictionary with a number of words
# https://stackoverflow.com/questions/18834636/random-word-generator-python
word_url = "http://svnweb.freebsd.org/csrg/share/dict/words?view=co&content-type=text/plain"
response = urllib.request.urlopen(word_url)
long_txt = response.read().decode()
words = long_txt.splitlines()

for i in range(5):
     description = ' '.join(random.sample(words, random.randint(5, 21))) + '.'
     amount = random.randint(10, 1450)
     print('You spent ${}\n'.format(amount))
     print('Description: "{}".\n\n'.format(description))