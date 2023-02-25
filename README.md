# Guild Vault

Guild Vault is a personal finance tool that allows users to set up accounts to track income and expenses. It's built on MVC architecture with user authorization using the MERN stack.

# Client

Here is the [Client Repo](https://github.com/stacylear/guildvault-client).

The client was created with React. It uses HTML, TailwindCSS, and JavaScript. It connects to the server API using URLs specified in the utils/apiURL.js file. Authorization was implemented using jsonwebtoken. 

## Packages/Dependencies Used in the Client:

react, react-dom, react-router-dom, axios

## How to use the Client locally:

Make sure you are in the client directory and install all the dependencies or node packages used for development via Terminal by using the following command:

`npm install` 

You may wish to edit src/utils/apiURL.js if you wish to use the server locally. The default configuration points to the API deployed on Cyclic.

# Server API

Here is the [Server Repo](https://github.com/stacylear/guildvault-server-api).

## Packages/Dependencies Used in the Server API:

express, mongoose, jsonwebtoken, dotenv, concurrently, nodemon, cors

## How to use the Server API locally:

Make sure you are in the server directory and install all the dependencies or node packages used for development via Terminal by using the following command:

`npm install` 

## To run the full-stack application locally:

- Create a `.env` file in the root of the server folder, and add the following entries as `key: value` 
  - PORT: `1313` (can be any port, example: 3000) 
  - DB_STRING: `your database URI` 
  - JWT_KEY: `your JWT key`

To run only the client, make sure you are in the client directory and run:

`npm start`

To run only the server using nodemon, make sure you are in the server directory and run:

`npm run server`

To run client and server concurrently, make sure you are in the server directory and run:

`npm run dev`

# Lessons Learned

My goal in creating this full-stack application was to better understand the structure of the MVC software architectural pattern. I was determined to comment as much code on the server API as possible in order to drill down to the details, cement my comprehension, and truly grok MVC.

However, the thing I spent most of my time doing was learning to read errors and the stack trace and track down what were primarily pesky syntax errors. "Why do my tests run on Postman but not on my server?" A single semicolon, that's why. 

Surprisingly, I really enjoyed the debugging process. In building this application, I loved reading other people's code, figuring out how it worked, and then using bits of that information to add features to my own application when I learned something that could improve my product.

