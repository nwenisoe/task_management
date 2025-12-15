markdown
# Task Management System

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Database Setup & Schema](#database-setup--schema)
- [API Endpoints](#api-endpoints)
- [Example JSON Body](#example-json-body)
- [Frontend Usage](#frontend-usage)
- [Notes](#notes)

## Technologies Used

### Backend (Go)
- Golang
- net/http for API routing
- Database: MySQL
- Packages:
  - `time` for timestamp handling
  - `database/sql` for DB operations

### Frontend (React)
- React 18
- TailwindCSS
- Vanilla JavaScript (fetch API)

### Other Tools
- npm / yarn for frontend package management

## Project Structure
backend/
├── controllers/
├── models/
├── dao/
├── main.go

frontend/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ ├── index.jsx
│ └── index.css
├── package.json

text

## Installation & Setup

### Backend (Go)
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend
Install dependencies:

bash
go mod tidy

Configure database connection in the config package.

Run backend server:

bash
go run main.go
Frontend (React)
Navigate to frontend folder:

bash
cd frontend
Install dependencies:

bash
npm install
Start development server:

bash
npm start
The frontend runs on http://localhost:3000
Backend APIs run on http://localhost:8080

## Database Setup & Schema
# Tasks Table

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,       -- todo, in-progress, done
    priority VARCHAR(50) NOT NULL,     -- low, medium, high
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

## Indexes for performance
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_priority ON tasks(priority);
CREATE INDEX idx_tasks_status_priority ON tasks(status, priority);

## API Endpoints
# Method	Endpoint	Description	Request Body / Params
GET	/api/tasks	Get all tasks	None
POST	/api/tasks	Create new task	JSON body
GET	/api/tasks/:id	Get task by ID	URL param id
PUT	/api/tasks/:id	Update task	URL param id, JSON body
DELETE	/api/tasks/:id	Delete task	URL param id

# Example JSON Body

{
  "title": "Finish report",
  "description": "Complete the monthly report",
  "status": "in-progress",
  "priority": "high",
  "due_date": "2025-12-20"
}
## Frontend Usage
# Dashboard
Displays all tasks in a table with filter and sort by status and priority.

# Create Task
Click Create Task → fill form → submit → calls POST /api/tasks

# Edit Task
Click Edit → form pre-filled → submit → calls PUT /api/tasks/:id

# Delete Task
Click Delete → confirm → calls DELETE /api/tasks/:id

Filter and sort dropdowns are available above the table for easy task management.

# Notes
Ensure backend is running before starting frontend.

Adjust API base URLs if frontend and backend run on different ports.

CORS configuration may be required.