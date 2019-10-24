# instalura

## :rotating_light: Disclaimer

Make sure:
- You have Docker and Docker-Compose installed;
- You have Java 8 installed (expected candidate is `8.0.232-zulu` in SDKMAN!);
- You have Node LTS installed.

## :building_construction: Setup

1. Make a first access to `server/` folder and run `docker-compose up`
  - It will pull the Docker image for the database and set some things up for the first load;
  - This may take a while (...);
  - Wait until you see `[Note] mysqld: ready for connections.`
2. Perform a GET request over `http://localhost:8080/gera/dados`
  - This will generate the necessary data for testing purposes;
3. Stop the server by pressing `Ctrl+C`;
4. On the project root folder, perform a `npm install`.

## :zap: Running the App

- Start the server
  - `npm run server`;
- Start the application
  - `npm start`.
