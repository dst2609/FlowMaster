// const { Configuration, OpenAIApi } = require("openai");
const { apiLimiter } = require("../security/security");
const axios = require("axios");

// Handle GET /greeting route
async function handleGreeting(req, res) {
  res.send("Greetings, this is Flow Master Dashboard");
}

// Handle POST /chat route
async function handleChat(req, res) {
  const { message } = req.body;

  try {
    const response = await apiLimiter.post(
      `${process.env.OPEN_AI_POST_URL}`, //"https://api.openai.com/v1/chat/completions"

      {
        model: "gpt-4-0125-preview", //using newer gpt, gpt 3.5 was not learning as expected.
        messages: [
          {
            role: "system",
            content:
            "You are a helpful assistant expert in agile methodology and SCRUM master. Respond by creating tasks in the JSON format. The JSON should consist of an object containing an array called 'tasks', each with the following keys: id, Ticket_Name, Description, Due_Date, Status, and Priority. Each task object should include realistic and detailed information appropriate for these categories. Default all Status keys to have the value 'To Do'",
          },
          {
            role: "user",
            content: `${message}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ message: reply });
  } catch (error) {
    console.error("OpenAI API request failed:", error.message);
    res.status(500).json({ error: "Failed to process the request" });
  }
}

module.exports = { handleGreeting, handleChat };
