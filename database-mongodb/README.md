# copy data into the container:

docker cp us-states-and-territories.json us-map-mongo:/tmp/states.json

# get into mongodb container

docker exec -it us-map-mongo mongosh      

# fill data into mongodb database

docker exec -it us-map-mongo mongoimport \
  --db us-options \
  --collection states \
  --file /tmp/states.json \
  --jsonArray \
  --quiet



# check data existence in database:

use us-options  # switch to db: us-options

db.states.countDocuments()  # 55
