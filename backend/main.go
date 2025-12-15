package main

import (
	"log"
	"net/http"

	"task_management/backend/config"
	"task_management/backend/routes"
)

func main() {
	config.ConnectDB()
	routes.RegisterRoutes()

	log.Println("Server started at :8082")
	log.Fatal(http.ListenAndServe(":8082", nil))
}
