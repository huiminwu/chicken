/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
// const User = require("./models/user");

const Request = require("./models/request");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// should pass {user: "", product: "", units: "", id: ""}
router.post("/requests", auth.ensureLoggedIn, (req, res) => {
  const newRequest = new Request({
    user: req.user._id,
    product: req.body.product,
    price: req.body.price,
    units: req.body.units,
    id: req.body.id,
  });
  newRequest.save().then((request) => res.send(request));
});

// should pass {product: ""}
router.get("/requests", (req, res) => {
  Request.find({ user: req.user.c_id }).then((requests) => res.send(requests));
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/matches", (req, res) => {
  let matches;
  Request.find({ product: req.query.product }).then((requests) => {
    matches = requests;
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
