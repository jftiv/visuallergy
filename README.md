# Visuallergy

## What for?
Currently logging all my meals in a notebook that I keep on me at all times. Would like to have a PWA I can use on my phone to track these things. As well as tracking my meals would like a way to visualize my exposure to certain allergens so I can monitor exposure. 

## Notes to myself (or whoever)
Currently this is not hosting anywhere. Once this is in a state I feel its useable would like to put on a digital ocean droplet. To run locally and test use the runLocal.sh in the /scripts folder. 

This script will spin up a mysql db in docker and use some junk creds to set up the api/db connection. If you want to connect to the db manually using mysql admin (currently using beekeeper studio) you can pull the creds from this file as well. 


## Running Locally

### Prerequisites

- Docker installed
- (Air)[https://github.com/air-verse/air] installed 

1. Run the server with the runLocal.sh script in ./scripts/
2. Run the client with npm run dev
3. Access the interface on localhost:5173, server is on localhost:3001
