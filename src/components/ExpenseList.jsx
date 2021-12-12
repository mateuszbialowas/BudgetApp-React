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
      <div className="mt-4 overflow-hidden rounded-md sm:rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left text-xs font-medium px-6 py-3 uppercase tracking-wider" scope="col">Name</th>
              <th className="text-left text-xs font-medium px-6 py-3 uppercase tracking-wider" scope="col">Cost</th>
              <th className="px-6 py-3 relative" scope="col">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                id={expense.id}
                name={expense.name}
                cost={expense.cost}
              ></ExpenseItem>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
