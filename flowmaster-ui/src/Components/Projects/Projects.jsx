import { NavLink } from 'react-router-dom';
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./Projects.css";
import Column from "./Column";

const Projects = () => {
    const scrollToSprintBoard = () => {
        const sprintBoardElement = document.getElementById('sprint-board');
        if (sprintBoardElement) {
            sprintBoardElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [completed, setCompleted] = useState([
        { id: "1", title: 'Task 1', completed: true },
        { id: "2", title: 'Task 2', completed: true },
        { id: "3", title: 'Task 3', completed: true }
    ]);
    const [inProgress, setInProgress] = useState([
        { id: "4", title: 'Task 4', completed: false },
        { id: "5", title: 'Task 5', completed: false },
        { id: "6", title: 'Task 6', completed: false }
    ]);
    const [inTest, setIntest] = useState([
        { id: "7", title: 'Task 7', completed: false },
        { id: "8", title: 'Task 8', completed: false },
        { id: "9", title: 'Task 9', completed: false }
    ]);
    const [todo, setToDo] = useState([
        { id: "10", title: 'Task 10', completed: false },
        { id: "11", title: 'Task 11', completed: false },
        { id: "12", title: 'Task 12', completed: false }
    ]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...inProgress, ...completed, ...todo, ...inTest]);

        setNewState(destination.droppableId, task);
    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setInProgress(removeItemById(taskId, inProgress));
                break;
            case "2":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "3":
                setToDo(removeItemById(taskId, todo));
                break;
            case "4":
                setIntest(removeItemById(taskId, inTest));
                break;
        }
    }

    function setNewState(destinationDroppableId, task) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, completed: false };
                setInProgress([...inProgress, updatedTask]);
                break;
            case "2":  // In Progress
                updatedTask = { ...task, completed: true };
                setCompleted([...completed, updatedTask]);
                break;
            case "3":  // IN Test
                updatedTask = { ...task, completed: false };
                setToDo([...todo, updatedTask]);
                break;
            case "4":  // Done
                updatedTask = { ...task, completed: false };
                setIntest([...inTest, updatedTask]);
                break;
        }
    }

    function findItemById(id, array) {
        return array.find((item) => item.id === id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id !== id);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <nav>
                    <ul>
                        <li><NavLink to="/projects" className="nav-link">Summary</NavLink></li>
                        <li><NavLink onClick={scrollToSprintBoard} className="nav-link">Sprint Board</NavLink></li>
                    </ul>
                </nav>
            </div>
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
                        <Column title={"To Do"} tasks={inProgress} id={"1"} />
                        <Column title={"In Progress"} tasks={completed} id={"2"} />
                        <Column title={"In Test"} tasks={todo} id={"3"} />
                        <Column title={"Done"} tasks={inTest} id={"4"} />
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Projects;