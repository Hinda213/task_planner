import type { Task } from "../types/task"

type TaskItemProps ={
    task: Task;
    onToggle: (taskId: number) => void;
    onDeleteTask: (taskId: number) => void;
};

export default function TaskItem ({task, onToggle, onDeleteTask}: TaskItemProps){

    return(
            <li> {task.title} -- {task.completed ? "Completed" : "Not Completed"}
              <button className="bg-white p-2 ml-3 text-red-500 " onClick={() => onToggle(task.id)}>
                Click
              </button>
              <button className="bg-white p-2 ml-3 text-red-500 " onClick={() => onDeleteTask(task.id)}>
                Delete
              </button>
            </li>
             
           
        );
    }