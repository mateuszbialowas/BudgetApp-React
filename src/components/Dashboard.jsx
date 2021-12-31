import React, { useContext } from "react";
import Budget from "./budgetApp/Budget";
import Remaining from "./budgetApp/Remaining";
import ExpenseTotal from "./budgetApp/ExpenseTotal";
import ExpenseList from "./budgetApp/ExpenseList";
import AddExpenseForm from "./budgetApp/AddExpenseForm";
import { AppContext } from "../context/AppContext";

export default function Dashboard() {
  const { isLoading } = useContext(AppContext);
  return (
    <>
      <div
        className="container mx-auto p-4"
        style={{ filter: isLoading ? "blur(5px)" : "" }}
      >
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Budget />
          <Remaining />
          <ExpenseTotal />
        </div>
        <ExpenseList />
        <AddExpenseForm />
      </div>
    </>
  );
}
