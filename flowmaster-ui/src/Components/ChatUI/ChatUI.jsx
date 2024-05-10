import React, { useState } from "react";
import axios from "axios";
import "./ChatUI.css";

const ChatUI = ({setResponseJson}) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  function cleanJSONString(response) {
    const cleanedString = response.replace(/```json|```/g, '').trim();
    return cleanedString;
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  //get the frotend message to backend, get the response and display it on frontend
  const handleSendMessage = async () => {
    try {
      const result = await axios.post("http://localhost:3000/chat", {
        message,
      });
      console.log("Response from server:", result.data.message);

      const cleanedString = cleanJSONString(result.data.message);

      setResponse(cleanedString);
      setResponseJson(cleanedString)
      
      console.log("Response from server Cleaned string:", cleanedString);
      // console.log(result.data.message);
      await axios.post("http://localhost:3000/tasks/add", {
      title: "Generated Task Tickets", 
      description: cleanedString, 
    });

    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Failed to get response");
    }
  };

  return (
    <div className="chat-wrapper">
      <header className="chat-header">FlowMaster Chat</header>
      <div className="chat-body">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Give me your task details, I shall auto generate tickets..."
          className="chat-input"
        />
        <div className="chat-buttons">
          <button className="button-send" onClick={handleSendMessage}>
            Send
          </button>
          <button className="button-cancel" onClick={() => setMessage("")}>
            Cancel
          </button>
        </div>
        <div className="chat-response">{response}</div>
      </div>
      
    </div>
  );
};

export default ChatUI;
