import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]); // list of tasks
  const [newTask, setNewTask] = useState(""); // text for a new task

  // Fetch tasks from the server when the component mounts.
  useEffect(() => {
    fetch("http://localhost:5003/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new task: POST to the backend, then update state.
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = { name: newTask, id: Date.now() }; // create a simple task object

    fetch("http://localhost:5003/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((savedTask) => {
        setTasks([...tasks, savedTask]); // append the new task
        setNewTask(""); // clear input
      })
      .catch((err) => console.error(err));
  };

  // Remove a task: send DELETE request to the backend.
  const removeTask = (id) => {
    fetch(`http://localhost:5003/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.error(err));
  };
  return (
    <div className="main">
      <div className="title">
        <h2>To Do List</h2>
      </div>
      <div className="task-editor-container">
        <div className="task-editor">
          <input
            type="text"
            placeholder="Enter a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask} style={{ backgroundColor: "green" }}>
            Add
          </button>
        </div>
      </div>
      <div className="box-container">
        <div className="to-do-box">
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.name}{" "}
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => removeTask(task.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
