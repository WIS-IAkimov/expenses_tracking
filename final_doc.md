# Installation

## NGINX
You'll need to setup NGINX server for this app. It will serve both static files
and redirected pages.

`TODO` config

## Project setup
First of all, you'll need to initialize Python Virtualenv, which is used to isolate Python packages and project directories.
To do that, open the directory you need and use initialization command.

	python3 -m venv env

You need to update some packages first, so the setup process will work properly.

	pip install --upgrade pip

Or this one, if previous doesn't work:

	python -m pip install -U pip

You'll need to update wheel package, too:

	pip install wheel

Now you can use your Virtualenv shell.

	source ./env/bin/activate

Now you'll need to install required libraries.

	pip install -r requirements.txt

Finally, you can initialize your project. This command will update the database.

	cd expense_tracker && python manage.py makemigrations && python manage.py migrate

Now you need to create your admin user; use these parameters and the command below: login: `admin`, email: `admin@example.com`, password: `testpw123`.

	python manage.py createsuperuser

Please collect Django static files for NGINX to work properly. **TODO** moving angular bundle, compiling it, whatever!

	python manage.py collectstatic

Finally, you can launch your server.

	python manage.py runserver

**TODO** Gunicorn WSGI

	pip  install  gunicorn
	gunicorn myproject.wsgi
	http://docs.gunicorn.org/en/latest/deploy.html
