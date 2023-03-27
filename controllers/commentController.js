const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

const authentication = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

router.post("/", authentication, (req, res) => {
  Comment.create({ ...req.body, userId: req.session.userId })
    .then((newComment) => {
      res.json(newComment);
    })
    .catch((error) => {
      res.status(500).json("Error Is :- ", error);
    });
});

module.exports = router;

