const router = require("express").Router();
const Post = require("../models/Post");

const authentication = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

router.post("/", authentication, async (req, res) => {
  const body = req.body;
  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", authentication, async (req, res) => {
  try {
    const rows = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (rows > 0) {
      res.status(200).end();
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", authentication, async (req, res) => {
  try {
    const rows = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (rows > 0) {
      res.status(200).end();
    } else {
      res.status(404).json({ error: "No Post Found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
