import React from 'react';
import './YourWork.css'; 

const YourWork = () => {
  return (
    <div className="your-work-container">
      <div className = "title">Your Work and Analysis</div>
      
      <div className="timeline">
        <h3>Timeline</h3>
        <div className="timeline-item">
          <div className="timeline-content">Task 1</div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">Task 2</div>
        </div>
        <div className="timeline-item">
          <div className="timeline-content">Task 3</div>
        </div>
      </div>
      <div className="personal-calendar">
        <h3>Personal Calendar</h3>
        <div className="calendar-placeholder">Calendar View Here</div>
      </div>
    </div>
  );
}

export default YourWork;
