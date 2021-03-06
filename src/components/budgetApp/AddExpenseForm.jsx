import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { useUserAuth } from "../../context/UserAuthContext";

export default function AddExpenseForm() {
  const { dispatch } = useContext(AppContext);
  const { user } = useUserAuth();
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [categoryEmoji, setCategoryEmoji] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const expense = {
      id: uuidv4(),
      name: name,
      cost: parseFloat(cost),
      category: category,
      categoryEmoji: categoryEmoji,
      details: details,
      date: date,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
      user_id: user.uid,
    });

    setName("");
    setCost("");
    setCategoryEmoji("");
    setCategory("");
    setDetails("");
    setDate("");
  };
  return (
    <div>
      <h2 className="my-4 font-medium text-4xl md:text-5xl">Add Expense</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="categoryEmoji"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Category Emoji
          </label>
          <input
            type="text"
            id="categoryEmoji"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={categoryEmoji}
            onChange={(event) => setCategoryEmoji(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="details"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Details
          </label>
          <input
            type="text"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={details}
            onChange={(event) => setDetails(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="cost"
            className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Cost
          </label>
          <input
            type="number"
            id="cost"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add new Expense
        </button>
      </form>
    </div>
  );
}
