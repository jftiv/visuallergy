import {
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  ...prefix("meals", [
    route("add", "./components/Meal.jsx"),
    route("view", "./components/View.jsx"),
  ]),

  // * matches all URLs, the ? makes it optional so it will match / as well
  route("*?", "catchall.jsx"),
]