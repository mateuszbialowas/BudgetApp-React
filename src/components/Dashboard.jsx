import React from "react";
import Budget from "./Budget";
import Remaining from "./Remaining";
import ExpenseTotal from "./ExpenseTotal";
import ExpenseList from "./ExpenseList";
import AddExpenseForm from "./AddExpenseForm";
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
