import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useUserAuth } from "../../context/UserAuthContext";

export default function EditExpenseForm(props) {
  const { dispatch } = useContext(AppContext);
  const { user } = useUserAuth();

  const { name, cost, details, date, category, categoryEmoji, id } =
    props.expense;

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target.elements;

    const expense = {
      id: id,
      name: form.name.value,
      cost: parseFloat(cost),
      details: details,
      date: date,
      category: category,
      categoryEmoji: categoryEmoji,
    };

    dispatch({
      type: "EDIT_EXPENSE",
      payload: expense,
      user_id: user.uid,
    });
  };

  return (
    <form className="max-w-md" id={`form-for-${id}`} onSubmit={onSubmit}>
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={name}
          defaultValue={name}
          required
        />
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update
      </button>
    </form>
  );
}
