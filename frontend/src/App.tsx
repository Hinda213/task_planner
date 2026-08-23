import TaskList from "./components/TaskList";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import { useState , useEffect} from "react";


function App() {
const [tasks, setTasks] = useState<Task[]>([]);

useEffect(() => {
  fetch("http://localhost:5000/tasks")
    .then((response) => response.json())
    .then((data) => setTasks(data))
    .catch((error) => console.error("Error fetching tasks:", error));
}, []);


 const addTask = (task: Task) => {
  fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => {
      setTasks((prevTasks) => [...prevTasks, data]);
    })
    .catch((error) => console.error("Error adding task:", error));
  
 };

 const updateTaskTitle = (taskId: number, newTitle: string) => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    )
  );
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
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-slate-800">
          Task Planner
        </h1>
        <TaskForm onAddTask={addTask} />
        <TaskList
          title="My Tasks"
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          onUpdateTaskTitle={updateTaskTitle}
        />
      </div>
    </main>
  );
}

export default App;
