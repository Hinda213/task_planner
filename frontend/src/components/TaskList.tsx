import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type TaskListProps = {
  title: string;
  tasks: Task[];
  toggleTaskCompletion: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTaskTitle: (taskId: string, newTitle: string) => void;
};

export default function TaskList(props: TaskListProps) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold text-slate-800">
        {props.title}
      </h2>
      <ul className="space-y-3">
        {props.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={props.toggleTaskCompletion}
            onDeleteTask={props.onDeleteTask}
            onUpdateTaskTitle={props.onUpdateTaskTitle}
          />
        ))}
      </ul>
    </>
  );
}