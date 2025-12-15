import { useState } from "react";

export default function TaskTable({ tasks, onEdit, onDelete }) {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [sortOption, setSortOption] = useState("");

  const displayedTasks = (tasks || [])
    .filter(t => !filterStatus || t.status === filterStatus)
    .filter(t => !filterPriority || t.priority === filterPriority)
    .sort((a, b) => {
      if (!sortOption) return 0;
      if (a[sortOption] < b[sortOption]) return -1;
      if (a[sortOption] > b[sortOption]) return 1;
      return 0;
    });

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className="border rounded px-2 py-1"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="border rounded px-2 py-1"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="due_date">Due Date</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Priority</th>
              <th className="py-2 px-4 text-left">Due Date</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTasks.map(t => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 truncate max-w-xs">{t.title}</td>
                <td className="py-2 px-4 break-words max-w-sm">{t.description}</td>
                <td className="py-2 px-4">{t.status}</td>
                <td className="py-2 px-4">{t.priority}</td>
                <td className="py-2 px-4">{t.due_date}</td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button className="text-blue-500 mr-2" onClick={() => onEdit(t.id)}>Edit</button>
                  <button className="text-red-500" onClick={() => onDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
