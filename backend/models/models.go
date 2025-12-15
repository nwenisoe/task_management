package models

import (
	"database/sql"
	"time"
)

type Task struct {
	ID          int            `json:"id"`
	Title       string         `json:"title"`
	Description string         `json:"description"`
	Status      string         `json:"status"`
	Priority    string         `json:"priority"`
	DueDate     sql.NullString `json:"due_date"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
}
//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