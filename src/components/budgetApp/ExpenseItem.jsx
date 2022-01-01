import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCaretDown,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../context/AppContext";
import { useUserAuth } from "../../context/UserAuthContext";
import EditExpenseForm from "./EditExpenseForm";

export default function ExpenseItem(props) {
  const { dispatch } = useContext(AppContext);
  const { user } = useUserAuth();
  const [editable, setEditable] = useState(false);

  const handleDeleteExpense = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.id,
      user_id: user.uid,
    });
  };

  const collapseDetailsTransaction = () => {
    setEditable(false);
    const details = document.getElementById(`details-${props.id}`);
    const caret = document.getElementById(`collapse-button-${props.id}`);
    if (details.style.display === "none") {
      details.style.display = "table-row";
      caret.style.transform = "rotate(180deg)";
    } else {
      details.style.display = "none";
      caret.style.transform = "rotate(0deg)";
    }
  };

  const { name, cost, details, date, category, categoryEmoji } = props;
   
  return (
    <>
      <tr className="border bg-gray-50">
        <td className=" pl-3 py-3 md:text-center text-2xl w-14 md:w-52">
          {categoryEmoji}
        </td>
        <td className="text-lg font-medium capitalize">
          {name}
          <div className="font-light text-xs text-gray-600">{category}</div>
        </td>
        <td
          className={`text-2xl font-semibold text-right ${
            cost < 0 ? `text-app-expenses-income` : `text-app-expenses-spend`
          }`}
        >
          $ {-cost}
        </td>
        <td className="text-right w-10">
          <button
            onClick={collapseDetailsTransaction}
            className="cursor-pointer p-3"
          >
            <FontAwesomeIcon
              id={`collapse-button-${props.id}`}
              icon={faCaretDown}
              size="lg"
            />
          </button>
        </td>
      </tr>
      <tr id={`details-${props.id}`} style={{ display: "none" }}>
        <td className="py-4 pl-4" colSpan={3}>
          <div className="flex flex-col">
            <span className="max-w-5xl">🔍️ Details: {details}</span>
            <span>🗓️ Date: {date}</span>
            <button
              onClick={() => setEditable(true)}
              className="mt-3 text-white bg-blue-700 hover:bg-blue-800 rounded-md text-xs py-1 px-5 text-center w-fit font-medium"
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          </div>
        </td>
        <td className="p-1 text-center">
          <FontAwesomeIcon
            className="text-red-500 cursor-pointer min-w-fit"
            icon={faTimesCircle}
            size="lg"
            onClick={handleDeleteExpense}
          />
        </td>
      </tr>
      {editable ? EditExpenseForm(props) : null}
    </>
  );
}
