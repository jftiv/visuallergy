import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatchAll from "./catchall.jsx";
import { AuthProvider } from './contexts/AuthContext.jsx';

import { Home, Login, Register, ViewMeals, Meal, IsLoggedIn } from './components';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
           
          {/* Protected routes */}
          <Route path="meals" element={<IsLoggedIn />}>
            {/* Nested routes under IsLoggedIn */}
            <Route index element={<ViewMeals />} />
            <Route path="add" element={<Meal />} />
          </Route>

          <Route path="*" element={<CatchAll />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
