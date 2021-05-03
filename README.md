# Teacher Allocation System (TAS)

TAS is an Adonisjs project built to dynamically allocate academics to units.

## Installation

### Install AdonisJS CLI
```bash
> npm i -g @adonisjs/cli
```

### Install Dependencies
(Make sure that you are in the tas directory)

```bash
npm install dependencies 
```

### Environment Setup
Copy the '.env.example' file to a '.env' file and configure environment variables.

## Usage

### Run the app:
```bash
adonis serve --dev
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

### Refresh Data
```bash
adonis migration:refresh
```
### Stand down the database:
```bash
docker-compose down
```
