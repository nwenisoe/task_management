package routes

import (
	"net/http"
	controllers "task_management/backend/controller"
)

func RegisterRoutes() {
	http.HandleFunc("/api/tasks", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			controllers.GetTasksHandler(w, r)
		} else if r.Method == http.MethodPost {
			controllers.CreateTaskHandler(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/api/tasks/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			controllers.GetTaskHandler(w, r)
		case http.MethodPut:
			controllers.UpdateTaskHandler(w, r)
		case http.MethodDelete:
			controllers.DeleteTaskHandler(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
}
