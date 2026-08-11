import TaskList from "./components/TaskList";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import { useState } from "react";

function App() {
const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Learn Typscript", completed: true },
    { id: 3, title: "Create TaskTracker", completed: false },
  ]);

 const addTask = (task: Task) => {
  setTasks((prevTasks) => [...prevTasks, task]);
 };

 const toggleTaskCompletion = (taskId: number) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  );
 };

 const deleteTask = (taskId: number) => {
  setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
 }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-linear-to-r from-blue-300 to-blue-500">
      <h1 className="text-3xl font-bold underline border-2 border-blue-500 p-4 rounded-lg bg-blue-100 text-blue-800 shadow-lg hover:bg-blue-200 transition duration-300 ease-in-out">
        Task Planner
      </h1>
      <TaskForm onAddTask={addTask} />
      <TaskList title="My Tasks" tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} onDeleteTask={deleteTask} />
    </main>
  );
}

export default App;
