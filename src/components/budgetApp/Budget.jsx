import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Budget() {
  const { budget } = useContext(AppContext);
  return (
    <div
      className="bg-blue-100 rounded-lg p-6 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
      role="alert"
    >
      Budget: {`$${budget}`}
    </div>
  );
}
