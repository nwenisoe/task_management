package dao

import (
	"database/sql"
	
	"task_management/backend/config"
	"task_management/backend/models"
	 "errors"
)
var ErrNotFound = errors.New("record not found")


func CreateTask(task *models.Task) error {
	query := `
	INSERT INTO tasks (title, description, status, priority, due_date)
	VALUES (?, ?, ?, ?, ?)`

	result, err := config.DB.Exec(
		query,
		task.Title,
		task.Description,
		task.Status,
		task.Priority,
		task.DueDate,
	)
	if err != nil {
		return err
	}

	id, _ := result.LastInsertId()
	task.ID = int(id)
	return nil
}

func UpdateTask(id int, task *models.Task) error {
	query := `
	UPDATE tasks
	SET title=?, description=?, status=?, priority=?, due_date=?
	WHERE id=?`

	_, err := config.DB.Exec(
		query,
		task.Title,
		task.Description,
		task.Status,
		task.Priority,
		task.DueDate,
		id,
	)
	return err
}

func DeleteTask(id int) error {
	_, err := config.DB.Exec("DELETE FROM tasks WHERE id=?", id)
	return err
}
func GetTasks(filters map[string]string) ([]models.Task, error) {
	query := "SELECT id, title, description, status, priority, due_date, created_at, updated_at FROM tasks WHERE 1=1"
	args := []interface{}{}

	for key, value := range filters {
		switch key {
		case "id":
			query += " AND id = ?"
			args = append(args, value)

		case "title":
			query += " AND title LIKE ?"
			args = append(args, "%"+value+"%")

		case "status":
			query += " AND status = ?"
			args = append(args, value)

		case "priority":
			query += " AND priority = ?"
			args = append(args, value)

		case "due_date":
			query += " AND due_date = ?"
			args = append(args, value)

		case "created_at":
			query += " AND created_at = ?"
			args = append(args, value)
		case "updated_at":
			query += " AND updated_at = ?"
			args = append(args, value)
		}
	}

	rows, err := config.DB.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var task models.Task
		err := rows.Scan(
			&task.ID,
			&task.Title,
			&task.Description,
			&task.Status,
			&task.Priority,
			&task.DueDate,
			&task.CreatedAt,
			&task.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, task)
	}

	return tasks, nil
}
func GetTaskByID(id int) (*models.Task, error) {
	query := `
	SELECT id, title, description, status, priority, due_date, created_at, updated_at
	FROM tasks
	WHERE id = ?`

	row := config.DB.QueryRow(query, id)

	var task models.Task
	err := row.Scan(
		&task.ID,
		&task.Title,
		&task.Description,
		&task.Status,
		&task.Priority,
		&task.DueDate,
		&task.CreatedAt,
		&task.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("task not found")
	}

	if err != nil {
		return nil, err
	}

	return &task, nil
}
