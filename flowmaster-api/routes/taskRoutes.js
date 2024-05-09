// taskRoutes.js
const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

// Define  taskRoutes
router.get("/", taskController.getAllTasks);
router.post("/add", taskController.addTask);
router.put("/update/:id", taskController.updateTask);

module.exports = router;
