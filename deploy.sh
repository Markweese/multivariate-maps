docker build -t markweldonbrewer/checktheflows_client:latest -t markweldonbrewer/checktheflows_client:$SHA -f ./client/Dockerfile ./client
docker build -t markweldonbrewer/checktheflows_api:latest -t markweldonbrewer/checktheflows_api:$SHA -f ./api/Dockerfile ./api

docker push markweldonbrewer/checktheflows_client:latest
docker push markweldonbrewer/checktheflows_api:latest

docker push markweldonbrewer/checktheflows_client:$SHA
docker push markweldonbrewer/checktheflows_api:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=markweldonbrewer/checktheflows_client:$SHA
kubectl set image deployments/api-deployment api=markweldonbrewer/checktheflows_api:$SHA
