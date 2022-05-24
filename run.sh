#!/bin/sh
# PIPENV_DOTENV_LOCATION=/path/to/.env pipenv shell
# PIPENV_DOTENV_LOCATION=./local.env pipenv run python backend/manage.py makemigrations
# PIPENV_DOTENV_LOCATION=./local.env pipenv run python backend/manage.py migrate
# PIPENV_DOTENV_LOCATION=./local.env pipenv run python backend/manage.py test
# PIPENV_DOTENV_LOCATION=./local.env pipenv run python backend/manage.py runserver
PIPENV_DOTENV_LOCATION=./local.env pipenv shell
