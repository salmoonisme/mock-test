const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// route API
router.get("/home", userController.home);
router.post("/login", userController.loginUser);

router.use((req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.send("You have to login first");
  }
});

router.get("/user", userController.userPage);
router.get("/create", userController.createPage);
router.get("/remove", userController.removePage);
router.post("/create/:id", userController.addList);
router.patch("/update/:id", userController.editList);

module.exports = router;
