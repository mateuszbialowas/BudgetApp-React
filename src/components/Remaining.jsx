import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
export default function Remaining() {
  const { budget, expenses } = useContext(AppContext);

  const totalExpences = expenses.reduce((total, item) => total + item.cost, 0);

  const remaining = budget - totalExpences;

  const alertType =
    remaining < 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  return (
    <div className={"rounded-lg p-6 text-sm " + alertType} role="alert">
      Remaining: {`$${remaining}`}
    </div>
  );
}
