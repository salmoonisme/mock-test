const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// route API
router.get("/home", userController.home);
router.post("/login", userController.loginUser);
router.get("/user/:id", userController.userPage);
router.post("/create/:id", userController.addList);
router.post("/delete/:id", userController.deleteList);

module.exports = router;
