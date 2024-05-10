import React from 'react';
import "./TaskDetails.css";

function cleanJSONString(response) {
    // Remove the Markdown code block syntax
    const cleanedString = response.replace(/```json|```/g, '').trim();
    return cleanedString;
}

function parseJSON(response) {
    const cleanedResponse = cleanJSONString(response);
    try {
        return JSON.parse(cleanedResponse);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null; 
    }
}

const TaskDetails = ({ response }) => {

    const jsonData = response ? parseJSON(response) : null;
    console.log("Response in TaskDetails :", jsonData);

    const renderCard = (task) => {
        
        const desiredKeys = ['id', 'Ticket_Name', 'Description', 'Due_Date', 'Status', 'Priority'];
        const entries = Object.entries(task);

        return (
            <div className="card">
                {entries.map(([key, value]) => {
                    if(key != 'id')
                    {
                        if (desiredKeys.includes(key)) {
                            const cssClass = `task-${key}`; 
                            return <p key={key} className={cssClass}><strong>{key.replace('_', ' ')}:</strong> {value}</p>;
                        }
                    }
                    
                    return null; 
                })}
            </div>
        );
    };

    return (
        <div className="task-container">
            <div className='ticket-container'>
                {jsonData && jsonData.tasks ? jsonData.tasks.map((task, index) => (
                    <div key={index}>{renderCard(task)}</div>
                )) : <div>No task details are available at the moment, ask FlowMaster to auto-generate tickets for your tasks.</div>}
            </div>
        </div>
    );
}

export default TaskDetails;
