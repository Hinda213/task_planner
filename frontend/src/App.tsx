import TaskList from "./components/TaskList";
import type { NewTask, Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:5000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setTimeout(() => setLoading(false), 1000);
      })

      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again later.");
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = (task: NewTask) => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
        return response.json();
      })
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const updateTaskTitle = (taskId: number, newTitle: string) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update task title");
        }
        return response.json();
      })
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === data.id ? data : task)),
        );
      })
      .catch((error) => console.error("Error updating task title:", error));
  };

  const toggleTaskCompletion = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) return;

    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to toggle task completion");
        }
        return response.json();
      })

      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === data.id ? data : task)),
        );
      })
      .catch((error) =>
        console.error("Error toggling task completion:", error),
      );
  };

  const deleteTask = (taskId: number) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-4xl font-bold text-slate-800">Task Planner</h1>
        <TaskForm onAddTask={addTask} />
        {loading ? (
          <p>Tasks are loading</p>
        ) : error ? (
          <div>
            <p className="text-red-500">{error}</p>
            <button
              className="border-none  py-2 px-2 font-semibold bg-green-500 text-white"
              onClick={fetchTasks}
            >
              Try Again
            </button>
          </div>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Add your first task</p>
        ) : (
          <TaskList
            title="My Tasks"
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            onDeleteTask={deleteTask}
            onUpdateTaskTitle={updateTaskTitle}
          />
        )}
      </div>
    </main>
  );
}

export default App;
