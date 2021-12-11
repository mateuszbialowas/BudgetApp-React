import React from "react";

export default function ExpenseItem(props) {
  const { id, name, cost } = props;
  return (
    <li className=" p-4 flex">
      {name}
      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-xl flex m-auto">{`$${cost}`}</span>
    </li>
  );
}
