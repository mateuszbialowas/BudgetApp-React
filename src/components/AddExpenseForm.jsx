import React from "react";

export default function AddExpenseForm() {
  return (
    <div>
      <h2 className="my-4 font-medium text-4xl md:text-5xl">Add Expense</h2>
      <form>
        <div class="mb-6">
          <label
            for="name"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="cost"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
          >
            Cost
          </label>
          <input
            type="text"
            id="cost"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add new Expense
        </button>
      </form>
    </div>
  );
}
