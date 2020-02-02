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
  });
  newRequest.save().then((newRequest) => {
    Request.find({ product: req.body.product }).then((requests) => {
      matches = requests;
      const PRODUCT_DETAILS = {
        flour: [
          { unitPrice: "$1.00", minUnits: "30" },
          { unitPrice: "$2.00", minUnits: "10" },
        ],
        sugar: [{ unitPrice: "$2.00", minUnits: "20" }],
        paper: [{ unitPrice: "$3.00", minUnits: "30" }],
        bricks: [{ unitPrice: "$4.00", minUnits: "40" }],
        stone: [{ unitPrice: "$5.00", minUnits: "50" }],
        bread: [{ unitPrice: "$6.00", minUnits: "60" }],
      };
      // let i;
      // let total = 0;
      // let ids = [];
      // for (i = 0; i < matches.length; i++) {
      //   total += Number(matches[i].units);
      //   ids.push(matches[i]._id);
      // }
      let name = req.body.product;
      let thresholds = PRODUCT_DETAILS[name];
      let i = 0;
      // first calculation of total
      let total = 0;
      let ids = [];
      let j;
      for (j = 0; j < matches.length; j++) {
        if (Number(matches[j].price) <= thresholds[i].unitPrice) {
          total += Number(matches[j].units);
          ids.push(matches[j]._id);
        }
      }
      while (total < Number(thresholds[i].minUnits)) {
        i++;
        total = 0;
        ids = [];
        if (i === thresholds.length) {
          res.send([]);
        }
        for (j = 0; j < matches.length; j++) {
          if (Number(matches[j].price) <= thresholds[i].unitPrice) {
            total += Number(matches[j].units);
            ids.push(matches[j]._id);
          }
        }
      }
      Request.find({ _id: ids }).then((matchedRequests) => {
        matchedRequests.forEach((request) => {
          request.isMatched = true;
          request.save();
        });
        res.send(ids);
      });
      // if (total >= Number(PRODUCT_DETAILS[name][0].minUnits)) {
      //   Request.find({ _id: ids }).then((matchedRequests) => {
      //     matchedRequests.forEach((request) => {
      //       request.isMatched = true;
      //       request.save();
      //     });
      //     res.send(ids);
      //   });
      // } else {
      //   res.send([]);
      // }
    });
  });
});

// should pass {product: ""}
router.get("/requests", (req, res) => {
  Request.find({ user: req.user._id }).then((requests) => {
    res.send(requests);
  });
});

router.post("/cancel", auth.ensureLoggedIn, (req, res) => {
  Request.findOneAndDelete({ _id: req.body._id }).then((deletedRequest) =>
    res.send(deletedRequest)
  );
});

// router.get("/matches", (req, res) => {
// Request.find({ product: req.query.product }).then((requests) => {
//   matches = requests;
//   const PRODUCT_DETAILS = {
//     flour: [
//       { unitPrice: "$1", minUnits: "10" },
//       { unitPrice: "$2", minUnits: "30" },
//     ],
//     sugar: [{ unitPrice: "$2", minUnits: "20" }],
//     paper: [{ unitPrice: "$3", minUnits: "30" }],
//     bricks: [{ unitPrice: "$4", minUnits: "40" }],
//     stone: [{ unitPrice: "$5", minUnits: "50" }],
//     bread: [{ unitPrice: "$6", minUnits: "60" }],
//   };
//   let i;
//   let total = 0;
//   let users = [];
//   for (i = 0; i < matches.length; i++) {
//     total += Number(matches[i].units);
//     users.push(matches[i].user);
//   }
//   let name = req.query.product;
//   console.log(name);
//   console.log(total);
//   if (total >= Number(PRODUCT_DETAILS[name][0].minUnits)) {
//     res.send(users);
//   } else {
//     res.send([]);
//   }
// });
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
