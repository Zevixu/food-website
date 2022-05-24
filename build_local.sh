docker build -t ece651foodie.azurecr.io/ece651foodie/ece651_backend:dev -f ./Dockerfile --build-arg ENV_FILE="local.env" .
docker build -t ece651foodie.azurecr.io/ece651foodie/ece651_frontend:dev -f frontend/Dockerfile --build-arg FILES_DIR="frontend" --build-arg ENV_FILE="local.env" .
#docker-compose up --build -d
#docker-compose down
#docker-compose logs
# az acr login --name ece651foodie
# docker push ece651foodie.azurecr.io/ece651foodie/ece651_backend:dev
# docker push ece651foodie.azurecr.io/ece651foodie/ece651_frontend:dev
# az webapp config container set --resource-group ece651 --name ece651-foodie --multicontainer-config-type compose --multicontainer-config-file docker-compose.yml
# az webapp log tail --name ece651-foodie --resource-group ece651
