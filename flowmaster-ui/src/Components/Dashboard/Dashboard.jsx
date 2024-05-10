import ChatUI from "../ChatUI/ChatUI";
import TaskDetails from "../TaskDetails/TaskDetails"
import "./Dashboard.css"
import React, { useState } from 'react';


const Dashboard = () => {
  const [responsejson, setResponseJson] = useState("");


  return (
    <div className="app-container">
      <ChatUI setResponseJson={setResponseJson} />
      <div className="task-details-wrapper">
        <TaskDetails response = {responsejson}/>
        
      </div>
    </div>
  );
}
export default Dashboard;

