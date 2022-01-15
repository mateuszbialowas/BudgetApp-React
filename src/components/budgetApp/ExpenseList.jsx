import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../../context/AppContext";

export default function ExpenseList() {
  const { dispatch } = useContext(AppContext);
  const { expenses } = useContext(AppContext);

  const orderExpensesByCostDesc = () => {
    console.log("orderByCostDesc");
    dispatch({
      type: "ORDER_EXPENSES_BY_COST_DESC",
      payload: expenses,
    });
  };

  const orderExpensesByCostAsc = () => {
    console.log("orderByCostAsc");
    dispatch({
      type: "ORDER_EXPENSES_BY_COST_ASC",
      payload: expenses,
    });
  };

  const orderExpensesByDate = () => {
    console.log("orderByDate");
    dispatch({
      type: "ORDER_EXPENSES_BY_DATE",
      payload: expenses,
    });
  };

  return (
    <div>
      <div className="my-3 md:flex items-center justify-between">
        <h2 className="font-bold text-2xl md:text-5xl">Recent transactions</h2>
        <div className="flex gap-2 mt-3 md:mt-0">
          <div
            onClick={() => orderExpensesByCostAsc()}
            className="border-2 px-2 py-1 rounded-3xl text-center text-sm cursor-pointer	"
          >
            Cost Asc
          </div>
          <div
            onClick={() => orderExpensesByCostDesc()}
            className="border-2 px-2 py-1 rounded-3xl text-center text-sm cursor-pointer	"
          >
            Cost Desc
          </div>
          <div
            onClick={() => orderExpensesByDate()}
            className="border-2 px-2 py-1 rounded-3xl text-center text-sm cursor-pointer	"
          >
            Date
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-md sm:rounded-lg shadow-md">
        <table className="w-full table-fixed">
          {/* <thead className="bg-gray-100">
            <tr>
              <th
                className="text-left text-xs font-medium pl-6 py-3 uppercase tracking-wider"
                scope="col"
              >
                Category
              </th>
              <th
                className="text-left text-xs font-medium py-3 uppercase tracking-wider"
                scope="col"
              >
                Name
              </th>
              <th
                className="text-left text-xs font-medium py-3 uppercase tracking-wider"
                scope="col"
              >
                Cost
              </th>
              <th className="px-6 py-3 relative" scope="col">
                <span className="sr-only">Delete</span>
                <span className="sr-only">Expand arrow</span>
              </th>
            </tr>
          </thead> */}
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <ExpenseItem key={expense.id} {...expense}></ExpenseItem>
              ))
            ) : (
              <tr>
                <td className="border-t border-gray-200" colSpan="3">
                  <div className="flex py-3 justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">No expenses yet.</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
