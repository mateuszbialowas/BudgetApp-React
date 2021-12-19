import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ExpenseTotal() {
  const { expenses } = useContext(AppContext);

  const totalExpences = expenses.reduce((total, item) => total + item.cost, 0);
  return (
    <div
      className="bg-yellow-100 rounded-lg p-6 text-sm text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800"
      role="alert"
    >
      Spent so far: {`$${totalExpences}`}
    </div>
  );
}
