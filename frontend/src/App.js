import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Admin from "./pages/Admin";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!role) return <Navigate to="/" />;
    if (role !== allowedRole) return <h2>Access Denied</h2>;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login setRole={setRole} setToken={setToken} />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRole="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;