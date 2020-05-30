<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo-text.png" width="300px" />
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diazevedo/fast-feet">

  <a href="https://github.com/diazevedo">
    <img alt="Made by Di Azevedo" src="https://img.shields.io/badge/made%20by-DiAzevedo-%2325b0e6">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

### Description

This is the backend code of a project developed as the final challenge from [Rockeseat Bootcamp](https://rocketseat.com.br/gostack).

FastFeet is an application designed to be used by a shipping company.

The API is consumed by the frontend and the mobile versions.

- [FastFeet web](https://github.com/diazevedo/fast-feet-web)
- [FastFeet mobile](https://github.com/diazevedo/fast-feet-mobile)

### Features

- Authentication
- Recipients management
- Couriers management
- Deliveries management
- Deliveries Problems
- Files management
- Email alerts

Technologies / Libraries

- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Nodemon](https://nodemon.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Yup](https://github.com/jquense/yup)
- [date-fns](https://date-fns.org/)
- [bee-queue](https://github.com/bee-queue/bee-queue)
- [multer](https://github.com/expressjs/multer)

### Running the project

Requirements

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/) — I am using yarn commands over this step-by-step

```bash
# Clone the repository
$ git clone git@github.com:diazevedo/fast-feet.git

# Go to the repository folder
$ cd fast-feet

# Install dependencies
$ yarn install

# It is optional but I use Docker.
# If you do not have yet you can follow these steps https://docs.docker.com/get-started/

# Create images of each database used
# Redis
docker run --name redis -p 6379:6379 -d -t redis:alpine

# Postgres
docker run --name fastfeet -e POSTGRES_PASSWORD=fastfeet -p 5432:5432 -d postgres
* In this case, both user and password are fastfeet

# Mongo
docker run --name mongo -p 27017:27017 -d -t

# Starting databases
docker start redis mongo postgres

```

I suggest you have a look at the `.env.example` file and set up some variables.

Now we need to create our database structure into Postgres.

```bash
# Running migrations
yarn sequelize db:migrate

# Putting data into that, it comes with an administrator user
yarn sequelize db:seed:all

# Starting the application
yarn dev

# Email queue
yarn queue
```

:bulb: Feel free to comment or to contribute with this project any thoughts on how to improve this are welcome.
