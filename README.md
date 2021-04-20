# DuckDuckHo
A crowdsourcing Web Application intending to understand Duck's Feeding Patterns around the world

## App Specification Doc
https://docs.google.com/document/d/1xSmekME37RG_pqRCUoXZZe8E_r4PGdMCjx9KwR8Xq0Q/edit?usp=sharing

## Prerequisites

* Angular (preferably v10.x)
* Node.js (preferably v14.x)

## Build with MEAN stack

* add following contents to config/.env file
    * PORT = 8000
    * kDatabasePath = mongodb+srv://backend-user:<password>@cluster0.ybzfq.mongodb.net/duckduckho?retryWrites=true&w=majority
    * kDatabaseUserName = backend-temp-user
    * kDatabasePassword = backend-temp-password
* please note above user is only authorized to login Mongo Cluster until Apr 27
* cd <root folder> [containing config, client, server]
* npm start
* To start hourly Cron execution, start another terminal session and run
    * cd server
    * node cron.js
* Open browser --> http://localhost:8000 - which should have application running

## Author

* Kushal Arora - work.kushalarora@gmail.com