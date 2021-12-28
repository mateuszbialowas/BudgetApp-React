import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../context/AppContext";

export default function ExpenseItem(props) {
  const { dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.id,
    });
  };

  const { name, cost } = props;
  return (
    <tr className="border-b bg-gray-50">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">
        <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{`$${cost}`}</span>
      </td>
      <td className="text-right px-6 py-4">
        <FontAwesomeIcon
          className="text-red-500 cursor-pointer"
          icon={faTimesCircle}
          size="lg"
          onClick={handleDeleteExpense}
        />
      </td>
    </tr>
  );
}
