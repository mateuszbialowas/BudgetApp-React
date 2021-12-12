import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function ExpenseItem(props) {
  const { id, name, cost } = props;
  return (
    <tr className="border-b bg-gray-50">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{cost}</td>
      <td className="text-right px-6 py-4">
        <FontAwesomeIcon
          className="text-red-500"
          icon={faTimesCircle}
          size="lg"
        />
      </td>
    </tr>
  );
}
