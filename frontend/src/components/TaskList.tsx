import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type TaskListProps = {
    title: string;
    tasks: Task[];
    toggleTaskCompletion: (taskId: number) => void;
    onDeleteTask: (taskId: number) => void;
};
export default function TaskList(props: TaskListProps) {

   


    return (
      <>
        <h2> {props.title} </h2>
        <ul>
          {props.tasks.map((task) => (
            <TaskItem
            key={task.id}
            task={task}
            onToggle={props.toggleTaskCompletion}
            onDeleteTask={props.onDeleteTask}
            />
          ))}
        </ul>
      </>
    );
}
