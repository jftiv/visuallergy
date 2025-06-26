package main

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

func main() {
	if err := initDB(); err != nil {
		log.Fatal("Failed to initialize database:", err)
	}
	r := mux.NewRouter()

	r.Use(loggingMiddleware)
	r.Use(corsMiddleware)

	r.HandleFunc("/meals", MealsHandler)
	r.HandleFunc("/auth/{operation}", AuthHandler)

	port := "3001"
	fmt.Printf("Server is running on port %s\n", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

func MealsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	switch r.Method {
	case "GET":
		getMeals(w, r)
		return
	case "POST":
		createMeal(w, r)
		return
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
}

func AuthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	operation := vars["operation"]

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	switch operation {
	case "register":
		registerUser(w, r)
		return
	case "login":
		loginUser(w, r)
		return
	}
}
