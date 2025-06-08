#!/bin/bash
set -e

# nvm use 20.14.0

echo "Now trying to run MongoDB container"
cd database-mongodb
docker compose up -d mongodb
cd ..
echo "--------------------------------"

echo "Now starting frontend"
cd frontend-vue
npm run build
npx serve dist &
cd ..
echo "--------------------------------"

echo "Now starting backend"
cd backend-nodejs
node index.js &
cd ..
echo "--------------------------------"

echo "Startup completed. Please go to http://localhost:3000 in your browser."
