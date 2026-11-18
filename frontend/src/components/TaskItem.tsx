import type { Task } from "../types/task"
import { useState, useEffect } from "react";

type TaskItemProps ={
    task: Task;
    onToggle: (taskId: string) => void;
    onDeleteTask: (taskId: string) => void;
    onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
};

export default function TaskItem ({task, onToggle, onDeleteTask, onUpdateTaskTitle}: TaskItemProps){
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
 
  useEffect(() => {
    if(!isEditing) {
      setEditedTitle(task.title);
    }
  }, [isEditing, task.title]);

 const  handleSave = () =>{
if(!editedTitle.trim()) return;
onUpdateTaskTitle(task.id, editedTitle);
setIsEditing(false);
  } 

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

    return (
      <li className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSave();
                  }
                }}
              />
            </div>
          ) : (
            <p className="font-medium text-slate-800"> {task.title} </p>
          )}
          <p className={task.completed ? "text-green-500" : "text-slate-500"}>
            {task.completed ? "Completed" : "Not Completed"}
          </p>
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
                type="button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button type="button"
                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button type="button"
                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                onClick={() => onToggle(task.id)}
              >
                Toggle
              </button>
              <button type="button"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                onClick={() => onDeleteTask(task.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </li>
    );
    }