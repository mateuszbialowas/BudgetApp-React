import React, {useContext} from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../contex/AppContext";

export default function ExpenseList() {
  const {expenses} = useContext(AppContext); 
  return (
    <div>
      <h2 className="my-3 font-medium text-4xl md:text-5xl">Expenses</h2>
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
