require("dotenv").config(); // Load environment variables from .env file
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/routes");
const { setupSecurity } = require("./security/security");

//user routers and db connection:
const {
  connectToDB,
  createUsersCollection,
  createTasksCollection,
} = require("./db/database.js");

const app = express();

// Configure CORS options to allow access only from localhost:5173
// const corsOptions = {
//   origin: "http://localhost:5173",
// };

// app.use(cors(corsOptions)); // Enable CORS with the specified options

// Morgan middleware for logging requests
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

// Security setup
setupSecurity(app);

// Define the default GET route for "/"
app.get("/", (req, res) => {
  res.send("Hello, this is Flow Master - Chat GPT Dashboard");
});

// Routes setup
routes(app);

// Connect to MongoDB
connectToDB().then(() => {
  //Create users collection
  createUsersCollection();
  // Create tasks collection
  createTasksCollection();

  // Routes
  const userRoutes = require("./routes/userRoutes");
  app.use("/users", userRoutes);
  const taskRoutes = require("./routes/taskRoutes");
  app.use("/tasks", taskRoutes);

  // Start the server
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
