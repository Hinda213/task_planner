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

app.patch("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  
  const task = tasks.find(task => task.id === taskId)
  if(!task){
   return res.status(404).json({ message: "Task not found"})
  }
  if(req.body.title !== undefined){
    task.title = req.body.title
  }
  if(req.body.completed !== undefined){
    task.completed = req.body.completed
  }

  res.json(task)
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});