import React, { useState } from "react";
import { Chart } from "react-google-charts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./YourWork.css";

const projectData = [
  {
    name: "User Authentication",
    dueDate: "2024-06-01",
    status: "In Progress",
    priority: "High",
  },
  {
    name: "Checkout feature",
    dueDate: "2024-06-15",
    status: "Completed",
    priority: "Medium",
  },
  {
    name: "Integration of AI",
    dueDate: "2024-10-15",
    status: "In Progress",
    priority: "High",
  },
  {
    name: "Campaign webpage",
    dueDate: "2024-07-01",
    status: "Not Started",
    priority: "Low",
  },
  {
    name: "Data Analysis Tab",
    dueDate: "2024-07-20",
    status: "In Progress",
    priority: "High",
  },
  {
    name: "Product design review",
    dueDate: "2024-08-01",
    status: "Completed",
    priority: "Medium",
  },
  {
    name: "Event planning page",
    dueDate: "2024-10-01",
    status: "Not Started",
    priority: "Low",
  },
];

const timelineData = [
  [
    { type: "string", id: "Task" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  ...projectData.map((project, index) => [
    index.toString(),
    project.name,
    new Date(2024, 0, 1), // Assuming tasks start from January 1, 2024
    new Date(project.dueDate),
  ]),
];

const YourWork = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="your-work-container">
      <div className="title">Your Work and Analysis</div>

      <div className="work-content">
        <div className="timeline">
          <h3>Project Timeline</h3>
          <Chart
            chartType="Timeline"
            data={timelineData}
            width="100%"
            height="400px"
          />
        </div>

        <div className="personal-calendar">
          <h3>Personal Calendar</h3>
          <Calendar
            onChange={onChange}
            value={value}
            tileContent={({ date, view }) => {
              const project = projectData.find(
                (proj) =>
                  new Date(proj.dueDate).toDateString() === date.toDateString()
              );
              return project ? (
                <div className="calendar-entry">
                  <strong>{project.name}</strong>
                </div>
              ) : null;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default YourWork;
