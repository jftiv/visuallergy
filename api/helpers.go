package main

import (
	"fmt"
	"log"
	"net/http"
)

func checkAndHandleError(err error, w http.ResponseWriter, message string, status int) {
	if err != nil {
		http.Error(w, message, status)
		return
	}
}

func checkAndLogError(err error, message string) {
	if err != nil {
		log.Printf("Error: %s: %v", message, err)
	}
}

func getUserId(username string) (int, error) {
	userId, err := lookupUserId(username)
	if err != nil {
		return 0, fmt.Errorf("failed to lookup user ID for username %s: %v", username, err)
	}
	return userId, nil
}
