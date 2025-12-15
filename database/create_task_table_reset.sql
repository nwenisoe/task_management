-- =========================================
-- Migration: Reset and recreate tasks table
-- WARNING: This will DELETE ALL DATA in the tasks table
-- =========================================

-- Drop the table if it exists
DROP TABLE IF EXISTS tasks;

-- Recreate the table
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

-- =========================================
-- Indexes for frequently used queries
-- =========================================

-- Single-column index on status
CREATE INDEX idx_tasks_status
ON tasks (status);

-- Single-column index on priority
CREATE INDEX idx_tasks_priority
ON tasks (priority);

-- Composite index on status + priority
CREATE INDEX idx_tasks_status_priority
ON tasks (status, priority);
