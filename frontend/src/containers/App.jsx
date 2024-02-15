import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Agent from "../pages/Agent";
import FacebookIntegration from "../pages/FacebookIntegeration";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const App = () => {
  const PrivateRoute = ({ children }) => {
    return localStorage.getItem("jwt-token") ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  const RedirectToHomeOrAuth = ({ children }) => {
    return localStorage.getItem("jwt-token") ? (
      <Navigate to="/" replace />
    ) : (
      children
    );
  };
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Agent />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectToHomeOrAuth>
              <Login />
            </RedirectToHomeOrAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectToHomeOrAuth>
              <Signup />
            </RedirectToHomeOrAuth>
          }
        />
        <Route
          path="/connect/facebook"
          element={
            <PrivateRoute>
              <FacebookIntegration />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <RedirectToHomeOrAuth>
              <Login />
            </RedirectToHomeOrAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
