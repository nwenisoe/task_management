import { useState, useEffect } from "react";

function TaskForm({ task = null, onSubmit }) {
  // Form state
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "todo");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [dueDate, setDueDate] = useState(task?.due_date || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    const taskData = {
      id: task?.id || undefined,
      title,
      description,
      status,
      priority,
      due_date: dueDate,
    };

    onSubmit(taskData);
  };

  return (
    <form
      className="bg-white p-6 shadow rounded max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Create Task"}</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title *</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Status</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Priority</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Due Date</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}

export default TaskForm;
