import type { NewTask, Task } from "../types/task";
import { useState } from "react";
import type { FormEvent } from "react";

type TaskFormProps = {
  onAddTask: (task: NewTask) => void;
};

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title,
      completed: false,
    });

    setTitle("");
  };

  return (
    <>
      <form
        className="mb-8 rounded-xl bg-white p-6 shadow-sm"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="title"
          className="mb-2 block font-medium text-slate-700"
        >
          Task Title
        </label>{" "}
        <input
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          type="text"
          value={title}
          placeholder=" Type a task"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 rounded-lg bg-blue-600 px-5 py-3 text-white font-medium transition hover:bg-blue-700 "
        >
          Add Task
        </button>
      </form>
    </>
  );
}
