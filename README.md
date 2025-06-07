#### Dependencies:

```bash
node -v # 24.1.0
nvm -v  # 0.39.0
```

All scripts in this project are intended to be run in a bash shell or a z-shell. Make sure you have these versions of Node.js and nvm installed before installing dependencies for the frontend, backend and Docker.

After installing all dependencies, you can start all services by running `./start.sh` in the root directory of this repository. If any of the services fail to start, refer to the following guides to run them manually. 

Instructions for stopping the services are also included below.



#### Install Frontend, Backend, and MongoDB Dependencies

**Frontend: Vue.js**

Install dependencies:

```bash
cd frontend-vue
npm install
```

Create a `.env` file in the `frontend-vue` directory:
```bash
touch .env
nano .env   # or use vi if you like!

# Put your key into .env
VITE_GOOGLE_MAPS_API_KEY=<your_key_here>
```


Build and run:

```bash
npm run build
npx serve dist
```

**Backend: Node.js**

Install dependencies:

```bash
cd backend-nodejs    # run ../backend-nodejs if you are currently in /frontend-vue
npm install
```

Run:

```bash
node index.js
```

**Database: MongoDB**

Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) if you haven't already.

Start MongoDB container:

```bash
cd database-mongodb  # run ../database-mongodb if you are in backend-nodejs
docker compose up -d mongodb    # build and start MongoDB container
```

Import `us-states-and-territories` data into the MongoDB container:

```bash
docker exec us-map-mongo mongosh us-options --eval "db.states.drop()" 
docker cp us-states-and-territories.json us-map-mongo:/tmp/states.json
docker exec us-map-mongo mongoimport \
  --db us-options \
  --collection states \
  --file /tmp/states.json \
  --jsonArray \
  --quiet
```

Get into your MongoDB container:

```bash
docker exec -it us-map-mongo mongosh
```

Check data inside the database:

```js
use us-options  // In the container, switch to the us-options database
db.states.countDocuments()  // should be 55
```


#### Stop Services

Shut down both frontend and backend:

```bash
lsof -ti :5137,4000,3000 | xargs kill
```

Stop MongoDB container:

```bash
cd database-mongodb
docker compose down # If you'd like to remove data as well, run `docker compose down -v` instead
```
