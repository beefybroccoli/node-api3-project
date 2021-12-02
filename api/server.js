const express = require("express");

const server = express();
server.use(express.json());
const routeUsers = require("./users/users-router");

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use("/api/users", routeUsers);

// do not forget to export the router
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
