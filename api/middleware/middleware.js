const modelUsers = require("../users/users-model");

function logger(req, res, next) {
  console.log("logger middleware");
  console.log(`${req.method} ${req.path} at ${Date.now()}`);
  next();
}

async function validateUserId(req, res, next) {
  console.log("validateUserId middleware");
  try {
    const { id } = req.params;
    const user = await modelUsers.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "unknown error" });
  }
}

function validateUser(req, res, next) {
  console.log("validateUser middleware");
  const { name } = req.body;
  if (!name || name.trim().length === 0) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  console.log("validatePost middleware");
  const { text } = req.body;
  if (!text || text.trim().length === 0) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

function errorHandling(err, req, res, next) {
  res.status(err.satus || 500).json({
    message: `unknown error occured: ${err.message}`,
    stack: err.stack,
  });
}

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
  errorHandling,
};
