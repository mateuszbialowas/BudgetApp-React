import React, {useContext} from "react";
import { AppContext } from "../contex/AppContext";
export default function Remaining() {
  return (
    <div
      className="bg-green-100 rounded-lg p-6 text-sm text-green-700 dark:bg-green-200 dark:text-green-800"
      role="alert"
    >
      Remaining: $500
    </div>
  );
}
