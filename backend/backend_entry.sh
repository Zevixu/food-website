#!/bin/sh

printenv
echo "---- running migrations ----"
PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv run python manage.py makemigrations
echo "---- migrating ----"
PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv run python manage.py migrate
echo "running gunicorn"
PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv run gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --pythonpath /home/app/backend/