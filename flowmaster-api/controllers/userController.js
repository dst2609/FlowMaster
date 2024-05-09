// userController.js
const db = require("../db/database.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersCollection = db.getUsersCollection();

const userController = {
  async getAllUsers(req, res) {
    try {
      const usersCollection = db.getUsersCollection();
      const users = await usersCollection
        .find(
          {},
          {
            projection: { _id: 1, email: 1 }, // Only fetch _id and email
          }
        )
        .toArray();

      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(users);
    } catch (err) {
      console.error("Error retrieving users: ", err);
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  },

  async getUserByEmail(req, res) {
    const email = req.params.email; // Get the email from the route parameter
    try {
      const usersCollection = db.getUsersCollection();
      const user = await usersCollection.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (err) {
      console.error("Error retrieving user: ", err);
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  },

  async regUser(req, res) {
    try {
      const usersCollection = db.getUsersCollection();

      // Hash the password before saving the user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        _id: new ObjectId(), // Generate unique ID
        ...req.body, //Include other item properties from the request body
        password: hashedPassword, // Override the plain text password with the hashed one
      };

      const result = await usersCollection.insertOne(newUser);
      console.log("result.acknowledged: ", result.acknowledged);
      console.log("result is: ", result);

      if (result.acknowledged) {
        res.status(201).json(result.insertedId);
      } else {
        throw new Error("Failed to register user ");
      }
    } catch (err) {
      console.error("Failed to register user: ", err);
      res.status(500).json({ error: "Failed to create menu item" });
    }
  },

  async loginUser(req, res) {
    try {
      const usersCollection = db.getUsersCollection();
      const user = await usersCollection.findOne({ email: req.body.email });

      // If no user with that email found
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // If password doesn't match
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid password" });
      }

      // Sign a JWT token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("token is : ", token);

      // Respond with the token
      res.status(200).json({ token, message: "Logged in successfully" });
    } catch (err) {
      console.error("Failed to login user: ", err);
      res.status(500).json({ error: "Failed to login user" });
    }
  },
};

module.exports = userController;
