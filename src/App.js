import "./App.css";
import Budget from "./components/Budget";
import Remaining from "./components/Remaining";
import ExpenseTotal from "./components/ExpenseTotal";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import { AppProvider } from "./context/AppContext";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ToastContainer } from "react-toastify";

import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

export default function App() {
  return (
    <>
      <ToastContainer />
      <UserAuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

function Home() {
  return (
    <AppProvider>
      <div className="container mx-auto p-4">
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Budget />
          <Remaining />
          <ExpenseTotal />
        </div>
        <ExpenseList />
        <AddExpenseForm />
      </div>
    </AppProvider>
  );
}
