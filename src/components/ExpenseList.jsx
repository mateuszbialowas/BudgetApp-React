import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const expenses = [
    { id: 123123, name: "Shopping", cost: 50 },
    { id: 1231234, name: "Shopping", cost: 50 },
    { id: 1231235, name: "Shopping", cost: 50 },
    { id: 1231236, name: "Shopping", cost: 50 },
    { id: 1231237, name: "Shopping", cost: 50 },
  ];
  return (
    <div>
      <h2 className="mt-3 font-medium text-4xl md:text-5xl">Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            name={expense.name}
            cost={expense.cost}
          ></ExpenseItem>
        ))}
      </ul>
    </div>
  );
}
