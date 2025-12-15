import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";

export default function EditTaskPage({ taskId, onUpdated }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`/api/tasks/${taskId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch task');
        return res.json();
      })
      .then(data => setTask(data))
      .catch(err => console.error(err));
  }, [taskId]);

  const handleUpdate = (taskData) => {
    fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task');
        return res.text(); // since it returns "Task updated successfully"
      })
      .then(() => onUpdated())
      .catch(err => alert(err.message));
  };

  if (!task) return <p>Loading...</p>;

  return <TaskForm task={task} onSubmit={handleUpdate} />;
}
