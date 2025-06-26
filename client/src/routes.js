import {
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  ...prefix("meals", [
    route("add", "./components/add-meal/Meal.jsx"),
    route("view", "./components/view-meals/View.jsx"),
  ]),
  route("register", "./components/register/Register.jsx"),
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "catchall.jsx"),
]