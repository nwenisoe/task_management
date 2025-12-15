import { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState("dashboard"); // "dashboard" | "create" | {edit, id}
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchTasks = () => {
    fetch("/api/tasks")
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
      })
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => fetchTasks(), []);

  // Navigation handlers
  const handleEditClick = (id) => {
    setEditTaskId(id);
    setPage("edit");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`/api/tasks/${id}`, { method: "DELETE" })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete task');
          return res.text();
        })
        .then(() => fetchTasks())
        .catch(err => alert(err.message));
    }
  };

  // Page routing
  if (page === "create") {
    return <CreateTaskPage onCreated={() => { fetchTasks(); setPage("dashboard"); }} />;
  }

  if (page === "edit" && editTaskId) {
    return <EditTaskPage taskId={editTaskId} onUpdated={() => { fetchTasks(); setPage("dashboard"); }} />;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setPage("create")}
        >
          Create Task
        </button>
      </div>

      <TaskTable tasks={tasks} onEdit={handleEditClick} onDelete={handleDelete} />
    </div>
  );
}

export default App;
