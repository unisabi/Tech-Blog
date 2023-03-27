const router = require("express").Router();
const Post = require("../models/Post");

const authentication = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

router.get("/", authentication, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    res.render("userposts", {
      layout: "dashboard",
      posts: posts.map((post) => post.get({ plain: true })),
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});

router.get("/create", authentication, (req, res) => {
  res.render("create", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", authentication, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (post) {
      res.render("edit", {
        layout: "dashboard",
        post: post.get({ plain: true }),
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
