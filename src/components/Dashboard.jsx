import React from "react";
import Budget from "./budgetApp/Budget";
import Remaining from "./budgetApp/Remaining";
import ExpenseTotal from "./budgetApp/ExpenseTotal";
import ExpenseList from "./budgetApp/ExpenseList";
import AddExpenseForm from "./budgetApp/AddExpenseForm";
import { AppProvider } from "../context/AppContext";
import { clearDatabase } from "../database";

export default function Dashboard() {
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
      <button className="bg-blue-500 border" onClick={() => clearDatabase()}>
        Delete database
      </button>
    </AppProvider>
  );
}
