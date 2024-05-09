// taskController.js
const db = require("../db/database.js");
const { ObjectId } = require("mongodb");

const taskCollection = db.getTasksCollection();

const taskController = {
  async getAllTasks(req, res) {
    try {
      const taskCollection = db.getTasksCollection();
      const tasks = await taskCollection
        .find(
          {},
          {
            projection: { _id: 1, title: 1, description: 1 }, // Only fetch _id and email and description
          }
        )
        .toArray();

      if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found" });
      }

      res.status(200).json(tasks);
    } catch (err) {
      console.error("Error retrieving tasks: ", err);
      res.status(500).json({ error: "Failed to retrieve tasks" });
    }
  },

  async addTask(req, res) {
    try {
      const taskCollection = db.getTasksCollection();

      const newTask = {
        _id: new ObjectId(), // Generate unique ID
        ...req.body, //Include other item properties from the request body
      };

      const result = await taskCollection.insertOne(newTask);
      console.log("result.acknowledged: ", result.acknowledged);
      console.log("result is: ", result);

      if (result.acknowledged) {
        res.status(201).json(result.insertedId);
      } else {
        throw new Error("Failed to add task ");
      }
    } catch (err) {
      console.error("Failed to add task: ", err);
      res.status(500).json({ error: "Failed to add task" });
    }
  },

  async updateTask(req, res) {
    const taskId = req.params.id;
    const updates = req.body;

    if (!ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const taskCollection = db.getTasksCollection();
      const result = await taskCollection.updateOne(
        { _id: new ObjectId(taskId) },
        { $set: updates }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (result.modifiedCount === 0) {
        return res.status(304).json({ message: "No changes made to the task" });
      }

      res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
      console.error("Failed to update task: ", err);
      res.status(500).json({ error: "Failed to update task" });
    }
  },
};

module.exports = taskController;
