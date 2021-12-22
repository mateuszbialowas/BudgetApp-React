import "./App.css";

import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";

import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        position="bottom-right"
      />
      <UserAuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home BudgetApp</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppProvider>
                  <Dashboard />
                </AppProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}
