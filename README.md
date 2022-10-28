# Teacher Allocation System (TAS)

TAS is an Adonisjs project built to dynamically allocate academics to units.
# Development Setup
## Installation

### Install AdonisJS CLI
```bash
npm i -g @adonisjs/cli
```

### Install Dependencies
(Make sure that you are in the tas directory)

```bash
npm install dependencies 
```

## Database

### Install docker and docker-compose:
https://docs.docker.com/get-docker/
https://docs.docker.com/compose/install/

### Stand up the database:
```bash
docker-compose up -d
```

### Check if Database is running:
```bash
docker-compose ps
```

### Setup Database Schema
```bash
adonis migration:run
```


### Run the app:
```bash
adonis serve --dev
```


### Installation complete - http://localhost:3000/



### EXTRA COMMANDS
### Refresh Data
```bash
adonis migration:refresh
```
### Stand down the database:
```bash
docker-compose down
```

# Production Setup
The Teacher Allocation System project contains a [Docker Compose](https://docs.docker.com/compose/) script to automate the deployment of a production environment.

For this environment the `.env` file will need to be created in the `tas` directory and the secrets correctly filled out.

### Running the database standalone
There are situations, such as development where you will want to run the database but not the production container because it is being run locally on the host. 
```bash
# Starting the database
docker-compose up -d
# Stopping the database
docker-compose down
```
### Running the database and production container
running both containers makes use of the [profiles](https://docs.docker.com/compose/profiles/) feature of Docker Compose. The `--build` argument forces a rebuild of the containers, this can be useful when you are making changes to the application but is not strictly required.
```bash
# Run the database and application
docker-compose --profile production up -d --build
# Stop the containers
docker-compose down 
```
