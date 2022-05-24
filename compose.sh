# az acr login --name ece651foodie
SP_APP_ID="7ce78fde-fccc-46e8-b8fe-5399158453e0"
SP_PASSWD="q_eHpj8UgQDKhZCGc1uhY2-DZN9qR1v.v-"

# Log in to Docker with service principal credentials
docker login ece651foodie.azurecr.io --username $SP_APP_ID --password $SP_PASSWD
docker-compose -f docker-compose.dev.yml stop
docker-compose -f docker-compose.dev.yml down --remove-orphans
docker-compose -f docker-compose.dev.yml rm -f
docker-compose -f docker-compose.dev.yml pull
docker-compose -f docker-compose.dev.yml up --build
