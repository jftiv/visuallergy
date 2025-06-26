package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Item struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Notes    string `json:"notes"`
	Dairy    bool   `json:"dairy"`
	RedMeat  bool   `json:"redMeat"`
	Gluten   bool   `json:"gluten"`
	Caffeine bool   `json:"caffeine"`
	Alcohol  bool   `json:"alcohol"`
}

type FullMeal struct {
	ID     int    `json:"id"`
	Items  []Item `json:"items"`
	AtHome bool   `json:"atHome"`
}

type GetMealsResponse struct {
	Meals []FullMeal `json:"meal"`
}

type QueryFilters struct {
	StartDate string `json:"startDate"`
	EndDate   string `json:"endDate"`
}

func getMeals(w http.ResponseWriter, r *http.Request) {
	//TO-DO: update this to middleware to grab from the path
	userId, err := getUserId(r.Header.Get("X-Username"))
	checkAndHandleError(err, w, "Failed to get user ID", http.StatusInternalServerError)

	queryFilters := QueryFilters{
		StartDate: r.URL.Query().Get("startDate"),
		EndDate:   r.URL.Query().Get("endDate"),
	}

	meals, err := queryMeals(userId, queryFilters)
	checkAndHandleError(err, w, fmt.Sprintf("Failed to query meals: %s", err), http.StatusInternalServerError)

	fullMeals := convertToResponse(meals)

	jsonResponse, err := json.Marshal(fullMeals)
	checkAndHandleError(err, w, "Failed to create JSON response", http.StatusInternalServerError)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(jsonResponse))
}

func createMeal(w http.ResponseWriter, r *http.Request) {
	//TO-DO: update this to middleware to grab from the path
	userId, err := getUserId(r.Header.Get("X-Username"))
	checkAndHandleError(err, w, "Failed to get user ID", http.StatusInternalServerError)

	var mealRequest FullMeal
	err = json.NewDecoder(r.Body).Decode(&mealRequest)
	checkAndHandleError(err, w, "Failed to decode request body", http.StatusBadRequest)

	if len(mealRequest.Items) == 0 {
		http.Error(w, "No items provided in meal", http.StatusBadRequest)
		return
	}

	err = insertMeal(userId, mealRequest)
	checkAndHandleError(err, w, fmt.Sprintf("Failed to insert meal: %s", err), http.StatusInternalServerError)

	response, err := fmt.Printf("Meal created successfully for user ID %d", userId)
	checkAndHandleError(err, w, fmt.Sprintf("Failed to create response with err %s", err), http.StatusInternalServerError)

	jsonResponse, err := json.Marshal(response)
	checkAndHandleError(err, w, "Failed to create JSON response", http.StatusInternalServerError)

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(jsonResponse))
}

func convertToResponse(meals []MealItem) []FullMeal {
	var fullMeals []FullMeal
	for i, meal := range meals {
		if i == 0 {
			fullMeal := FullMeal{
				ID:     int(meal.MealId),
				AtHome: meal.AtHome,
				Items: []Item{{
					ID:       int(meal.ItemId),
					Name:     meal.Name,
					Notes:    meal.Notes,
					Dairy:    meal.Dairy,
					RedMeat:  meal.RedMeat,
					Gluten:   meal.Gluten,
					Caffeine: meal.Caffeine,
					Alcohol:  meal.Alcohol,
				}},
			}
			fullMeals = append(fullMeals, fullMeal)
		} else if meal.MealId == meals[i-1].MealId {
			lastMeal := &fullMeals[len(fullMeals)-1]
			lastMeal.Items = append(lastMeal.Items, Item{
				ID:       int(meal.ItemId),
				Name:     meal.Name,
				Notes:    meal.Notes,
				Dairy:    meal.Dairy,
				RedMeat:  meal.RedMeat,
				Gluten:   meal.Gluten,
				Caffeine: meal.Caffeine,
				Alcohol:  meal.Alcohol,
			})
		} else {
			fullMeal := FullMeal{
				ID:     int(meal.MealId),
				AtHome: meal.AtHome,
				Items: []Item{{
					ID:       int(meal.ItemId),
					Name:     meal.Name,
					Notes:    meal.Notes,
					Dairy:    meal.Dairy,
					RedMeat:  meal.RedMeat,
					Gluten:   meal.Gluten,
					Caffeine: meal.Caffeine,
					Alcohol:  meal.Alcohol,
				}},
			}
			fullMeals = append(fullMeals, fullMeal)
		}
	}
	return fullMeals
}
