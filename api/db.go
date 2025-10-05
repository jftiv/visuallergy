package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"reflect"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB

// Establish DB Structs
type ItemEntity struct {
	MealId   int64  `db:"meal_id"`
	Name     string `db:"name"`
	Notes    string `db:"notes"`
	Dairy    bool   `db:"dairy"`
	RedMeat  bool   `db:"red_meat"`
	Gluten   bool   `db:"gluten"`
	Caffeine bool   `db:"caffeine"`
	Alcohol  bool   `db:"alcohol"`
}

type MealEntity struct {
	ID     int64  `db:"id"`
	UserId int64  `db:"user_id"`
	AtHome bool   `db:"at_home"`
	Date   string `db:"date"`
}

type MealItem struct {
	MealId   int64  `db:"meal_id"`
	Date     string `db:"date"`
	AtHome   bool   `db:"at_home"`
	ItemId   int64  `db:"item_id"`
	Name     string `db:"name"`
	Notes    string `db:"notes"`
	Dairy    bool   `db:"dairy"`
	RedMeat  bool   `db:"red_meat"`
	Gluten   bool   `db:"gluten"`
	Caffeine bool   `db:"caffeine"`
	Alcohol  bool   `db:"alcohol"`
}

type UserEntity struct {
	ID       int    `db:"id"`
	Username string `db:"username"`
	Email    string `db:"email"`
	Password string `db:"password"`
}

// Initialize MySQL connection and create tables
func initDB() error {
	var err error
	// Update these connection parameters for your MySQL setup
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	if host == "" || port == "" || user == "" || password == "" || dbName == "" {
		return fmt.Errorf("database connection parameters are not set in environment variables")
	}
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", user, password, host, port, dbName)
	//TODO: Switch statements to cleaner sqlx creates
	db, err = sqlx.Open("mysql", dsn)
	if err != nil {
		return fmt.Errorf("failed to connect to database: %v", err)
	}

	if err = db.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %v", err)
	}

	// Create users table from SQL file
	usersPath := "./sql/users.sql"
	createUsersTableSql, err := os.ReadFile(usersPath)
	if err != nil {
		return fmt.Errorf("failed to read users.sql file: %v", err)
	}
	createUsersTable := string(createUsersTableSql)
	if _, err = db.Exec(createUsersTable); err != nil {
		return fmt.Errorf("failed to create users table: %v", err)
	}

	// Create meals table from SQL file
	mealsPath := "./sql/meals.sql"
	createMealsTableSql, err := os.ReadFile(mealsPath)
	if err != nil {
		return fmt.Errorf("failed to read meals.sql file: %v", err)
	}
	createMealsTable := string(createMealsTableSql)
	if _, err = db.Exec(createMealsTable); err != nil {
		return fmt.Errorf("failed to create meals table: %v", err)
	}

	// Create items table
	itemsPath := "./sql/items.sql"
	createItemsTableSql, err := os.ReadFile(itemsPath)
	if err != nil {
		return fmt.Errorf("failed to read items.sql file: %v", err)
	}
	createItemsTable := string(createItemsTableSql)
	if _, err = db.Exec(createItemsTable); err != nil {
		return fmt.Errorf("failed to create items table: %v", err)
	}

	// Run edits.sql to apply any edits
	editsPath := "./sql/edits.sql"
	editsSql, err := os.ReadFile(editsPath)
	if err != nil {
		return fmt.Errorf("failed to read edits.sql file: %v", err)
	}
	edits := string(editsSql)
	if _, err = db.Exec(edits); err != nil {
		return fmt.Errorf("failed to apply edits: %v", err)
	}

	log.Println("Database initialized successfully")
	return nil
}

func queryMeals(userId int, filters QueryFilters) ([]MealItem, error) {
	query := `
		SELECT m.id AS meal_id, m.date, m.at_home, i.id AS item_id, i.name, i.notes, i.dairy, i.red_meat, i.gluten, i.caffeine, i.alcohol
		FROM meals m
		JOIN items i ON m.id = i.meal_id
		WHERE m.user_id = :user_id
	`
	filtersValues := reflect.ValueOf(filters)
	// Create map to hold query parameters
	args := map[string]interface{}{"user_id": userId}

	for i := 0; i < filtersValues.NumField(); i++ {
		key := filtersValues.Type().Field(i)
		value := filtersValues.Field(i).Interface().(string)
		name := strings.ToLower(key.Name)

		if value != "" {
			switch name {
			case "startdate":
				query += `AND m.date >= :start_date`
				args["start_date"] = value
			case "enddate":
				query += `AND m.date <= :end_date`
				args["end_date"] = value
			default:
				log.Printf("Unknown filter field: %s", key.Name)
			}
		}
	}
	fmt.Printf("Executing query: %s with args: %+v\n", query, args)

	var meals []MealItem
	pQuery, err := db.PrepareNamed(query)
	checkAndLogError(err, "Failed to prepare named query")
	pQuery.Select(&meals, args)
	checkAndLogError(err, "Failed to query meals")

	log.Printf("Retrieved %d meals for user ID %d", len(meals), userId)
	return meals, nil
}

func insertMeal(userId int, meal FullMeal) error {
	tx := db.MustBegin()

	// Insert meal
	insertMealQuery := "INSERT INTO meals (user_id, at_home) VALUES (:user_id, :at_home)"
	result, err := tx.NamedExec(insertMealQuery, map[string]interface{}{"user_id": userId, "at_home": meal.AtHome})
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to insert meal: %v", err)
	}

	mealID, err := result.LastInsertId()
	if err != nil {
		tx.Rollback()
		return fmt.Errorf("failed to get last insert ID: %v", err)
	}

	// Insert items
	for _, item := range meal.Items {
		insertItemQuery := "INSERT INTO items (meal_id, name, notes, dairy, red_meat, gluten, caffeine, alcohol) VALUES (:meal_id, :name, :notes, :dairy, :red_meat, :gluten, :caffeine, :alcohol)"
		_, err = tx.NamedExec(insertItemQuery, &ItemEntity{
			MealId:   mealID,
			Name:     item.Name,
			Notes:    item.Notes,
			Dairy:    item.Dairy,
			RedMeat:  item.RedMeat,
			Gluten:   item.Gluten,
			Caffeine: item.Caffeine,
			Alcohol:  item.Alcohol,
		})
		if err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to insert item: %v", err)
		}
	}

	if err = tx.Commit(); err != nil {
		return fmt.Errorf("failed to commit transaction: %v", err)
	}

	log.Printf("Meal with ID %d created successfully for user ID %d", mealID, userId)
	return nil
}

func createUser(user UserEntity) (int, error) {
	tx := db.MustBegin()
	query := "INSERT INTO users (username, email, password) VALUES (:username, :email, :hashedPassword)"
	//TODO: handle scenario email/userId already exists
	result, err := tx.NamedExec(query, map[string]interface{}{
		"username":       user.Username,
		"email":          user.Email,
		"hashedPassword": user.Password,
	})
	checkAndLogError(err, "Failed to insert user")

	userId, err := result.LastInsertId()
	checkAndLogError(err, "Failed to get last insert ID for user")

	if err = tx.Commit(); err != nil {
		return 0, fmt.Errorf("failed to commit transaction: %v", err)
	}

	log.Printf("User created with ID %d", userId)
	return int(userId), nil
}

func lookupUserCredentials(username string) (UserEntity, error) {
	query := "SELECT id, username, password FROM users WHERE username = :username"
	pQuery, err := db.PrepareNamed(query)
	checkAndLogError(err, "Failed to prepare named query for user lookup")
	var user UserEntity
	err = pQuery.Get(&user, map[string]interface{}{"username": username})
	checkAndLogError(err, "Failed to get user by username")

	return user, nil
}

func lookupUserId(username string) (int, error) {
	query := "SELECT id FROM users WHERE username = ?"
	var userId int
	err := db.QueryRow(query, username).Scan(&userId)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, fmt.Errorf("user not found")
		}
		return 0, fmt.Errorf("failed to get user ID: %v", err)
	}
	return userId, nil
}
