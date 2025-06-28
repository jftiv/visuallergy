import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewMeals from "./components/view-meals/View.jsx";
import AddMeal from "./components/add-meal/Meal.jsx";
import Login from "./components/identity/Login.jsx";
import Register from "./components/identity/Register.jsx";
import CatchAll from "./catchall.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meals" element={<ViewMeals />} />
        <Route path="/meals/add" element={<AddMeal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<CatchAll />} />
      </Routes>
    </BrowserRouter>
  );
}
