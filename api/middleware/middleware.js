const modelUsers = require("../users/users-model");

function logger(req, res, next) {
  console.log("logger middleware");
  console.log(`${req.method} ${req.path} at ${Date.now()}`);
  next();
}

async function validateUserId(req, res, next) {
  console.log("validateUserId middleware");
  const { id } = req.params;
  if (id) {
    const user = await modelUsers.getById(id);
    req.user = user;
    next();
  } else {
    res.status(404).json({ message: `${id} not found` });
  }
}

function validateUser(req, res, next) {
  console.log("validateUser middleware");
  next();
}

function validatePost(req, res, next) {
  console.log("validatePost middleware");
  next();
}

module.exports = { logger, validatePost, validateUser, validateUserId };
