import "./App.css";

import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";

import Signup from "./components/authentication/Signup";
import Navbar from "./components/Navbar";
import Login from "./components/authentication/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import HeroSections from "./components/HeroSections";

export default function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <UserAuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroSections />} />
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
