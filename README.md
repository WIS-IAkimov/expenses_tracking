# Expenses tracker

## Project specification
This projects provides a Django application to track user expenses.

* User must be able to create an account and log in.
* When logged in, a user can see, edit and delete expenses he entered.
* Implement at least three roles with different permission levels:
  a regular user would only be able to CRUD on their owned records,
  a user manager would be able to CRUD users, and an admin would be able
  to CRUD all records and users.
* When an expense record is entered, each one has:
  date, time, description, amount, comment.
* User can filter expenses.
* User can print expenses per week with the total amount and average daily spending.
* Minimal UI/UX design is needed.
* REST API. Make it possible to perform all user actions via the API, including authentication.
* Must be a single-page application. All actions need to be done client side using AJAX,
  refreshing the page is not acceptable.
* Minimal UI/UX design is needed.

## Details
For now, project uses `runserver` command and internal Django means to serve static files.
It is possible to connect any other server like Nginx and serve these separately.

# Project initialization

There are the steps required to initialize our project.

    # Create VirtualEnv
    python3 -m venv env
    # Log onto the environment
    source ./env/bin/activate
    # Install requirements
    pip install -r requirements.txt
    # Change the dir to the backend
    cd expense_tracker
    # Initialize the db
    python manage.py makemigrations
    python manage.py migrate
    # Create admin user
    # Login: admin
    # Email: admin@example.com
    # Password: testpw123
    python manage.py createsuperuser
    # Collect static files
    python manage.py collectstatic
    # Run the server
    python manage.py runserver

# Using auth
**For frontend developers only.**

To test authentication on this project, you can add jQuery and
make several requests.

Use this code to add jQuery on the page:

    var jq = document.createElement('script');
    jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);

Use this query to test login feature and get `JWT` token.

    $.post(
       'api/login/',
        {
            "username": "admin",
            "password": "testpw123"
        }
    )

Use this query to test registration feature:

    $.post(
       'api/registration/',
        {
            "username": "USERNAME",
            "password1": "my_p2_4302",
            "password2": "my_p2_4302",
            "email": "user@lastmail.com"
        }
    )
