// userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

// Define  userRoutes
router.get("/", userController.getAllUsers);
router.post("/register", userController.regUser);
router.get("/:email", userController.getUserByEmail);

router.post("/login", userController.loginUser);

module.exports = router;
