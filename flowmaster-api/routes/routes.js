const { handleGreeting, handleChat } = require("../controllers/controllers");

module.exports = function (app) {
  // GET route
  app.get("/greeting", handleGreeting);

  // POST route for chat requests
  app.post("/chat", handleChat);
};
