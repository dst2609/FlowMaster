import ChatUI from "../ChatUI/ChatUI";
import TaskDetails from "../TaskDetails/TaskDetails"
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <div className="app-container">
      <ChatUI />
      <div className="task-details-wrapper">
        <TaskDetails /> 
      </div>
    </div>
  );
}
export default Dashboard;

