// db.js
require("dotenv").config();
const { MongoClient } = require("mongodb");

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

let db;
let usersCollection;
let taskCollection;

async function connectToDB() {
  try {
    const client = await MongoClient.connect(mongoURI, {});
    db = client.db("FlowMaster"); // Explicitly specify the database name here
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

async function createUsersCollection() {
  try {
    usersCollection = db.collection("users");
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === "users"
    );
    if (!collectionExists) {
      await usersCollection.createIndex({ title: "text" }); // Optional: Create an index for text search
      console.log("usersCollection collection created");
    }
  } catch (err) {
    console.error("Failed to create usersCollection :", err);
    process.exit(1);
  }
}

async function createTasksCollection() {
  try {
    taskCollection = db.collection("tasks");
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === "tasks"
    );
    if (!collectionExists) {
      await taskCollection.createIndex({ title: "text" }); // Optional: Create an index for text search
      console.log("taskCollection collection created");
    }
  } catch (err) {
    console.error("Failed to create taskCollection :", err);
    process.exit(1);
  }
}

function getUsersCollection() {
  return usersCollection;
}

function getTasksCollection() {
  return taskCollection;
}

module.exports = {
  connectToDB,
  createUsersCollection,
  createTasksCollection,
  getUsersCollection,
  getTasksCollection,
};
