#!/bin/bash
docker run --name jtsql-local -e MYSQL_ROOT_PASSWORD="my-super-secret-pw" -e MYSQL_DATABASE="jtsql-local" -p 3306:3306 -v ./data:/var/lib/mysql -d mysql:9.0

# Update to real values in production env
export DB_HOST="127.0.0.1"
export DB_PORT="3306"
export DB_USER="root"
export DB_PASSWORD="my-super-secret-pw"
export DB_NAME="jtsql-local"

trap 'docker stop jtsql-local && docker rm jtsql-local' EXIT

# wait for the database to be ready
echo "Waiting for MySQL container to start..."
until docker exec jtsql-local mysqladmin ping -h"localhost" -u"$DB_USER" -p"$DB_PASSWORD" --silent 2>/dev/null; do
  echo "Waiting for MySQL to be ready..."
  sleep 2
done

echo "MySQL is ready! Starting air..."
$(go env GOPATH)/bin/air
# go run ../api 
