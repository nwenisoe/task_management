import TaskForm from "../components/TaskForm";

export default function CreateTaskPage({ onCreated }) {
  const handleCreate = (taskData) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create task');
        return res.json();
      })
      .then(() => onCreated())
      .catch(err => alert(err.message));
  };

  return <TaskForm onSubmit={handleCreate} />;
}
