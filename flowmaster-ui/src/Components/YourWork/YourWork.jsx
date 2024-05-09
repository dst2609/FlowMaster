import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './YourWork.css'; 

const YourWork = () => {
  const task1Data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 500 },
    { name: 'May', value: 100 },
  ];

  const task2Data = [
    { name: 'Jan', value: 200 },
    { name: 'Feb', value: 100 },
    { name: 'Mar', value: 300 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 500 },
  ];
  
  const task3Data = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
    { name: 'Mar', value: 300 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 500 },
  ];

  return (
    <div className="your-work-container">
      <div className = "title">Your Work and Analysis</div>
      
        <div className="timeline">
        <h3>Timeline for Task 1</h3>
        {/* Render the timeline chart for Task 1 */}
        <LineChart width={500} height={300} data={task1Data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>

      <div className="timeline">
        <h3>Timeline for Task 2</h3>
        {/* Render the timeline chart for Task 2 */}
        <LineChart width={500} height={300} data={task2Data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
          
        <div className="timeline">
        <h3>Timeline for Task 3</h3>
        {/* Render the timeline chart for Task 3 */}
        <LineChart width={500} height={300} data={task3Data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ffc658" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
          
        
       
      <div className="personal-calendar">
        <h3>Personal Calendar</h3>
        <div className="calendar-placeholder">Calendar View Here</div>
      </div>
    </div>
  );
}

export default YourWork;
