package main

import (
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterResponse struct {
	UserId int `json:"userId"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Username string `json:"username"`
	UserId   int    `json:"userId"`
}

func registerUser(w http.ResponseWriter, r *http.Request) {
	var registerRequest RegisterRequest
	err := json.NewDecoder(r.Body).Decode(&registerRequest)
	checkAndHandleError(err, w, "Failed to decode request body", http.StatusBadRequest)

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerRequest.Password), bcrypt.DefaultCost)
	checkAndHandleError(err, w, "Failed to hash password", http.StatusInternalServerError)
	user := UserEntity{
		Username: registerRequest.Username,
		Email:    registerRequest.Email,
		Password: string(hashedPassword),
	}

	userId, err := createUser(user)
	checkAndHandleError(err, w, "Failed to create user", http.StatusInternalServerError)
	w.WriteHeader(http.StatusCreated)
	response := RegisterResponse{
		UserId: userId,
	}
	jsonResponse, err := json.Marshal(response)
	checkAndHandleError(err, w, "Failed to create JSON response", http.StatusInternalServerError)
	w.Write(jsonResponse)
}

func loginUser(w http.ResponseWriter, r *http.Request) {
	var loginRequest LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	checkAndHandleError(err, w, "Failed to decode request body", http.StatusBadRequest)
	user, err := lookupUserCredentials(loginRequest.Username)
	checkAndHandleError(err, w, "Failed to get user by username", http.StatusInternalServerError)

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password))
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}
	loginResponse := LoginResponse{
		Username: user.Username,
		UserId:   user.ID,
	}

	jsonResponse, err := json.Marshal(loginResponse)
	checkAndHandleError(err, w, "Failed to create JSON response", http.StatusInternalServerError)
	w.Write(jsonResponse)
}
