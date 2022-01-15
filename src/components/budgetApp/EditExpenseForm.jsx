import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useUserAuth } from "../../context/UserAuthContext";

export default function EditExpenseForm(props) {
  const { dispatch } = useContext(AppContext);
  const { user } = useUserAuth();

  const { name, cost, details, date, category, categoryEmoji, id } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target.elements;

    const expense = {
      id: id,
      name: form.name.value,
      cost: parseFloat(form.cost.value),
      details: form.details.value,
      date: form.date.value,
      category: form.category.value,
      categoryEmoji: form.categoryEmoji.value,
    };

    dispatch({
      type: "EDIT_EXPENSE",
      payload: expense,
      user_id: user.uid,
    });
  };

  return (
    <tr>
      <td className="p-3" colSpan={4}>
        <form className="max-w-md" id={`form-for-${id}`} onSubmit={onSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={name}
              defaultValue={name}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={category}
              defaultValue={category}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="categoryEmoji"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category Emoji
            </label>
            <input
              type="text"
              id="categoryEmoji"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={categoryEmoji}
              defaultValue={categoryEmoji}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Details
            </label>
            <input
              type="text"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={details}
              defaultValue={details}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cost"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Cost
            </label>
            <input
              type="text"
              id="cost"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={cost}
              defaultValue={cost}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder={date}
              defaultValue={date}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </td>
    </tr>
  );
}
