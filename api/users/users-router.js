const express = require("express");
const middleware = require("../middleware/middleware");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const modelUser = require("./users-model");
const modelPost = require("../posts/posts-model");

const router = express.Router();

router.get("/", middleware.logger, async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const users = await modelUser.get();
  res.status(200).json(users);
});

router.get("/:id", middleware.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post("/", middleware.validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const { name } = req.body;
  const newUser = await modelUser.insert({ name });
  res.status(201).json(newUser);
});

router.put(
  "/:id",
  middleware.validateUserId,
  middleware.validateUser,
  async (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const { id } = req.params;
    const { name } = req.body;
    const modifiedUser = await modelUser.update(id, { name });
    res.status(201).json(modifiedUser);
  }
);

router.delete("/:id", middleware.validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  const result = await modelUser.remove(id);
  res.status(200).json(result);
});

router.get("/:id/posts", middleware.validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  const posts = await modelPost.get();
  console.log("id = ", id, ", posts.length = ", posts.length);
  res
    .status(200)
    .json(posts.filter((element) => String(element.user_id) === String(id)));
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use(middleware.errorHandling);

module.exports = router;
