const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());


const tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Learn TypeScript", completed: true },
  { id: 3, title: "Create TaskTracker", completed: false },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {

const newTask = {
  id: Date.now(),
  title: req.body.title,
  completed: req.body.completed,
};
tasks.push(newTask);

res.status(201).json(newTask)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});