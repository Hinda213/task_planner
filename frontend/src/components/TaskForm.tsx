import type { Task } from "../types/task";
import { useState } from "react";
import type { FormEvent } from "react";

type TaskFormProps = {
  onAddTask: (task: Task) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: Date.now(),
      title,
      completed: false,
    });

    setTitle("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          className="font-bold text-2xl mt-7
 "
          htmlFor="title"
        >
          Task Title
        </label>{" "}
        <br />
        <input
          className="bg-white p-2 m-5"
          type="text"
          value={title}
          placeholder=" Type a task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}
