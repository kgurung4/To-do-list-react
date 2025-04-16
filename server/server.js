// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5003;

app.use(cors());
app.use(express.json());

let tasks = []; // our in-memory "database"

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

// Delete a task by id
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id != id);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
