# frontend container -> builds and copies react code, copies admin staticfiles and serves using NGINX


# compile and build REACT code
FROM node:alpine as react
RUN mkdir -p /home/app
WORKDIR /home/app
ENV PATH /home/app/frontend/node_modules/.bin:$PATH
RUN pwd && ls -lah

# copy package.json
COPY frontend frontend
RUN ls -lah /home/app
RUN ls -lah /home/app/frontend
WORKDIR /home/app/frontend

RUN pwd && ls -lah
RUN rm -rf build
RUN rm -rf node_modules

# generate package-lock
RUN npm install --package-lock-only
RUN pwd && ls -lah
RUN npm ci
RUN npm install react-scripts -g
RUN npm run build
RUN pwd && ls -lah
RUN ls -lah build


# multi stage build
FROM python:3.9-alpine as django_static_files
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache mariadb-dev
RUN mkdir -p /home/app
WORKDIR /home/app
RUN pwd && ls -lah
COPY backend backend
RUN pwd && ls -lah
RUN pip install --upgrade pip
RUN pip install pipenv wheel
ARG ENV_FILE "dev.env"
RUN pwd && ls -lah
COPY Pipfile ./
COPY Pipfile.lock ./
COPY $ENV_FILE ./
RUN PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv install --deploy
RUN apk del build-deps
# ARG DB_HOST
# ARG DB_USER
# ARG DB_PASSWORD
# ARG DB_NAME
# ARG DB_SSL_CERT_LOCATION
# ENV DB_HOST=$DB_HOST
# ENV DB_USER=$DB_USER
# ENV DB_PASSWORD=$DB_PASSWORD
# ENV DB_NAME=$DB_NAME
# ENV DB_SSL_CERT_LOCATION=$DB_SSL_CERT_LOCATION
RUN printenv
RUN PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv run python backend/manage.py collectstatic --no-input --clear -n
RUN PIPENV_DOTENV_LOCATION=$ENV_FILE pipenv run python backend/manage.py collectstatic --no-input --clear
RUN cd backend && pwd && ls -lah


# generate nginx container
FROM nginx:alpine as nginx

ARG FILES_DIR="frontend"

RUN rm /etc/nginx/conf.d/default.conf
COPY $FILES_DIR/nginx.conf /etc/nginx/conf.d

RUN apk add openssh
RUN echo "root:Docker!" | chpasswd
COPY $FILES_DIR/sshd_config /etc/ssh/
RUN mkdir -p /tmp
COPY $FILES_DIR/ssh_setup.sh /tmp

RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh)

COPY ${FILES_DIR}/runssh.sh /docker-entrypoint.d
RUN ls -lah /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/runssh.sh

# copying react code
RUN mkdir -p /home/app/frontend/
WORKDIR /home/app/frontend
COPY --from=react /home/app/frontend/build /home/app/frontend/build
RUN pwd && ls -lah
RUN ls -lah build

# copy django staticfiles
RUN mkdir -p /home/app/backend/
WORKDIR /home/app/backend/
COPY --from=django_static_files /home/app/backend/staticfiles /home/app/backend/staticfiles
RUN pwd && ls -lah
RUN ls -lah staticfiles

EXPOSE 80 2222
CMD ["nginx", "-g", "daemon off;"]