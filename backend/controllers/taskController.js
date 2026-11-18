const Task = require("../models/Task");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    const formattedTasks = tasks.map((task) => ({
      id: task._id.toString(),
      title: task.title,
      completed: task.completed,
    }));

    res.json(formattedTasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const createTask = async (req, res) => {
  const newTask = {
    title: req.body.title,
    completed: req.body.completed,
  };
  try {
    // check 1: is the title a string?
    if (typeof req.body.title !== "string") {
      return res.status(400).json({ message: "Task title must be a string" });
    }
    // check 2: is the title empty or just whitespace?
    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400).json({ message: "Invalid task data" });
    }

    // check 3: is the title !boolean?
    if (
      req.body.completed !== undefined &&
      typeof req.body.completed !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: "Task completed must be a boolean" });
    }
    //check 4: is the title too long?
    if (req.body.title.length > 100) {
      return res
        .status(400)
        .json({ message: "Task title cannot exceed 100 characters" });
    }

    const savedTask = await Task.create(newTask);

    const formattedTask = {
      id: savedTask._id.toString(),
      title: savedTask.title,
      completed: savedTask.completed,
    };

    res.status(201).json(formattedTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
      return res.status(400).json({ message: "No valid data provided" });
    }
    const updatedData = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ message: "Invalid task title" });
      }
      if (title.length > 100) {
        return res
          .status(400)
          .json({ message: "Task title cannot exceed 100 characters" });
      }
      updatedData.title = title;
    }
    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res
          .status(400)
          .json({ message: "Task completed must be a boolean" });
      }
      updatedData.completed = completed;
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        returnDocument: "after",
      },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    const formattedTask = {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
      completed: updatedTask.completed,
    };

    res.json(formattedTask);
  } catch (err) {
    return res.status(500).json({ message: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
