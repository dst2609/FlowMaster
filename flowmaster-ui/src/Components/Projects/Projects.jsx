import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./Projects.css";
import Column from "./Column";
import axios from 'axios';

const Projects = () => {
    const scrollToSprintBoard = () => {
        const sprintBoardElement = document.getElementById('sprint-board');
        if (sprintBoardElement) {
            sprintBoardElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [completed, setCompleted] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [inTest, setIntest] = useState([]);
    const [todo, setToDo] = useState([]);

    const [tasks, setTasks] = useState([]);

    const normalizeTaskData = (task) => {
        return {
            id: task.id ,  
            title: task.title || task.Ticket_Name,
            description: task.description || task.Description,
            dueDate: task.dueDate || task.Due_Date,
            status: task.status || task.Status,
            priority: task.priority || task.Priority
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tasks"); // for POST:  axios.post("http://localhost:3000/tasks/add");
                console.log("Fetched data:", response.data); 

                if (response.data && response.data.length > 0) {
                    const latestTaskData = response.data[response.data.length - 1];
                    const rawTasks = JSON.parse(latestTaskData.description).tasks;
                    const tasks = rawTasks.map(normalizeTaskData);  
                    console.log("Normalized tasks:", tasks); 

                    setTasks(tasks);

                    setToDo(tasks.filter(task => task.status === "To Do"));
                    console.log("Filtered tasks:", tasks.filter(task => task.status === "To Do")); 
                    // setInProgress(tasks.filter(task => task.status === "In Progress"));
                    // setIntest(tasks.filter(task => task.status === "In Test"));
                    // setCompleted(tasks.filter(task => task.status === "Done" || task.status === "ToDo"));
                }
                
                // const tasksData = JSON.parse(response.data[1].description).tasks;
                // console.log("Parsed tasks:", tasksData); 
                // setTasks(tasksData);
                // setToDo(tasksData.filter(task => task.status == "To Do"));
                
                
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();
    }, []);

    
    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination || source.droppableId === destination.droppableId) {
            return;}

        deletePreviousState(source.droppableId, draggableId);
        const task = findItemById(draggableId, [...todo, ...inProgress, ...completed, ...inTest]);
        setNewState(destination.droppableId, task);
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setToDo(removeItemById(taskId, todo));    
                break;
            case "2":
                setInProgress(removeItemById(taskId, inProgress));
                break;
            case "3":
                setIntest(removeItemById(taskId, inTest));
                break;
            case "4":
                setCompleted(removeItemById(taskId, completed));
                break;
        }
    }

    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task };  // Update status to "To Do"
                updatedTask.status = "To Do"
                setToDo([...todo, updatedTask]);
                break;
            case "2":  // In Progress
                updatedTask = { ...task };  // Update status to "In Progress"
                updatedTask.status = "In Progress"
                setInProgress([...inProgress, updatedTask]);
                console.log("inProgress: ", ...inProgress)
                break;
            case "3":  // IN Test
                updatedTask = { ...task};  // Update status to "In Test"
                updatedTask.status = "In Test"
                setIntest([...inTest, updatedTask]);
                break;
            case "4":  // Done
                updatedTask = { ...task};  // Update status to "Done"
                updatedTask.status = "Done"
                setCompleted([...completed, updatedTask]);
                break;
        }
    }

    function findItemById(id, array) {
          const foundItem = array.find((item) => {
            return item.id == id;
        });
        return foundItem;
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div className="app">
            {/* <div className="sidebar">
                <nav>
                    <ul>
                        <li><NavLink to="/projects" className="nav-link">Summary</NavLink></li>
                        <li><NavLink onClick={scrollToSprintBoard} className="nav-link">Sprint Board</NavLink></li>
                    </ul>
                </nav>
            </div> */}
            <div className="content">
                <h1 id="sprint-board"></h1>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <h2 style={{ textAlign: "center" }}>Sprint Board</h2>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            width: "1300px",
                            margin: "0 auto",
                            color: "#ffffff"
                        }}
                    >
                        <Column title={"To Do"} tasks={todo} id={"1"} />
                        <Column title={"In Progress"} tasks={inProgress} id={"2"} />
                        <Column title={"In Test"} tasks={inTest} id={"3"} />
                        <Column title={"Done"} tasks={completed} id={"4"} />
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Projects;