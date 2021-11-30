# Things to note:

1. Codebase in typescript
2. Application is dockerized, so you just need to have docker installed to run
3. Implemented Unit test using jest, and load test for the pivot-csv/transform api endpoint
4. Set up Github Actions, and linked the pipeline to run tests on push
5. Added a swagger interface to test the API with file upload

# Run the project:

_Note:_ _Make sure to have Docker installed_

- RUN: **docker-compose up -d** (installs NodeJS and python and needed dependencies, artillery for load test and typesctip globally)

## Endpoint:
    - POST **http://localhost:8000/pivot-csv/transform** (Accepts a csv file, as seen in swagger docs)

# API Docs:
    - http://localhost:8000/docs

# Tests:

## Unit Tests:
    - Run: **npm test**

## Load Test:
    - Run: **artillery run loadtest.yml**