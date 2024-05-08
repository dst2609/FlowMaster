import React from 'react';
import './OverviewContent.css'; 
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Task 1', 'Task 2', 'Task 3'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

const OverviewContent = () => {
  return (
    <div className="overview-content">
      <div className="recent-projects">
        <h2>Recent Projects</h2>
        <ul>
          <li>Project 1</li>
          <li>Project 2</li>
          <li>Project 3</li>
          <li>Project 4</li>
        </ul>
      </div>
      <div className="your-work">
        <h2>Your Work</h2>
        <div className="task-summary">
          <p>Summary, due date of assigned tasks</p>
        </div>
        
      </div>
      <div className="plot">
        <div className="analysis-plot">
          <h3>Pie Chart of Status Overview</h3>
          <div className="pie-chart-placeholder">Pie Chart Here</div>
          
        </div>
      </div>
    </div>
  );
}

export default OverviewContent;
