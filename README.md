Task Management System
Table of Contents

Technologies Used

Project Structure

Installation & Setup

Database Setup & Schema

API Endpoints

Example JSON Body

Frontend Usage

Notes

Technologies Used

Backend (Go):

Golang

net/http for API routing

Database: MySQL

Packages: time package for timestamp handling

Frontend (React):

React 18

TailwindCSS

Vanilla JS for fetch calls

Other Tools:

npm/yarn for frontend package management

Golang database/sql for DB operations

Project Structure
backend/
├─ controllers/
├─ models/
├─ dao/
├─ main.go
frontend/
├─ public/
├─ src/
│   ├─ components/
│   ├─ pages/
│   ├─ App.jsx
│   ├─ index.jsx
│   └─ index.css
├─ package.json

Installation & Setup
Backend (Go)

Clone repository:

git clone <repo-url>
cd backend


Install dependencies:

go mod tidy


Configure database connection in the config package.

Run backend server:

go run main.go

Frontend (React)

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start development server:

npm start


The frontend will run on http://localhost:3000 and call backend APIs at http://localhost:8080.

Database Setup & Schema

Tasks Table Schema:

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,       -- todo, in-progress, done
    priority VARCHAR(50) NOT NULL,     -- low, medium, high
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_status_priority ON tasks(status, priority);

API Endpoints
Method	Endpoint	Description	Request Body / Params
GET	/api/tasks	Get all tasks	None
POST	/api/tasks	Create new task	JSON: title, description, status, priority, due_date
GET	/api/tasks/:id	Get task by ID	URL param id
PUT	/api/tasks/:id	Update task by ID	URL param id, JSON body same as create
DELETE	/api/tasks/:id	Delete task by ID	URL param id
Example JSON Body
{
  "title": "Finish report",
  "description": "Complete the monthly report",
  "status": "in-progress",
  "priority": "high",
  "due_date": "2025-12-20"
}

Frontend Usage

Dashboard: Displays all tasks in a table with filter and sort by status and priority.

Create Task: Click "Create Task" → fill form → submit → calls POST /api/tasks.

Edit Task: Click "Edit" → form pre-filled → submit → calls PUT /api/tasks/:id.

Delete Task: Click "Delete" → confirm → calls DELETE /api/tasks/:id.

Filter and sort dropdowns are available above the table for easy task management.

Notes

Ensure backend is running before starting frontend for API calls to work.

Adjust API base URLs if frontend and backend run on different ports (CORS may need setup).