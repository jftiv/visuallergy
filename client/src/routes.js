import {
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("meals", "./components/view-meals/View.jsx", [
    route("add", "./components/add-meal/Meal.jsx"),
  ]),
  route("login", "./components/identity/Login.jsx"),
  route("register", "./components/identity/Register.jsx"),
  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "./catchall.jsx"),
]