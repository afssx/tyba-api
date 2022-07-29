#  Tyba API - Backend Engineer test

## Requirements

- [Node v16+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Running

_Easily set up a local development environment with single command!_

- clone the repo
- `npm run docker:dev` 🚀

Visit [localhost:4000](http://localhost:4000/) or if using Postman grab [config](/postman).

### _What happened_ 💥

Containers created:

- Postgres database
- Node (v16 Alpine) container with running RESTful API service
- and one Node container instance to run tests locally or in CI


### Test Data

- at=40.74917,-73.98529&q=chrysler