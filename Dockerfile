FROM python:3.9-alpine

RUN mkdir -p /home/app

# set work directory
WORKDIR /home/app
# copy project
COPY ./backend .

RUN pwd && ls -lah

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
# COPY ./backend/requirements.txt .
RUN ls -lah

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev

RUN pip install pipenv wheel
ARG ENV_FILE "dev.env"
RUN pwd && ls -lah
COPY Pipfile ./
COPY Pipfile.lock ./
COPY $ENV_FILE ./
RUN PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv install --deploy

RUN apk del build-deps

RUN apk add openssh

RUN echo "root:Docker!" | chpasswd

ENV SSH_FILES_DIR="frontend"

COPY $SSH_FILES_DIR/sshd_config /etc/ssh/

RUN mkdir -p /tmp
COPY $SSH_FILES_DIR/ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh)

RUN ls -lah /home/app
RUN ls -lah /home/app/backend

RUN chmod +x backend_entry.sh

EXPOSE 8000 2222

CMD ["/home/app/backend_entry.sh"]