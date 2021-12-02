const express = require("express");
const middleware = require("../middleware/middleware");
const modelUser = require("./users-model");
const modelPost = require("../posts/posts-model");

const router = express.Router();

router.get("/", middleware.logger, async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const users = await modelUser.get();
  res.status(200).json(users);
});

router.get("/:id", middleware.validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", middleware.validateUser, async (req, res) => {
  const { name } = req.body;
  const newUser = await modelUser.insert({ name });
  res.status(201).json(newUser);
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const modifiedUser = await modelUser.update(id, { name });
    res.status(201).json(modifiedUser);
  }
);

router.delete("/:id", middleware.validateUserId, async (req, res) => {
  const { id } = req.params;
  const result = await modelUser.remove(id);
  if (result) {
    res.status(200).json(req.user);
  } else {
    res.status(500).json({ message: `fail to delelte user ${id}` });
  }
});

router.get("/:id/posts", middleware.validateUserId, async (req, res) => {
  const { id } = req.params;
  const posts = await modelPost.get();
  console.log("id = ", id, ", posts.length = ", posts.length);
  res
    .status(200)
    .json(posts.filter((element) => String(element.user_id) === String(id)));
});

router.post(
  "/:id/posts",
  middleware.validateUserId,
  middleware.validatePost,
  async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const newPost = await modelPost.insert({ user_id: id, text });
    res.status(201).json(newPost);
  }
);

router.use(middleware.errorHandling);

module.exports = router;
