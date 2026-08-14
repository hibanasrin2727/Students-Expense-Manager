import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";


function AddExpense() {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });


  // Validation error
  const [error, setError] = useState("");


  // Handle input changes
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // Submit form
  const handleSubmit = (event) => {

    event.preventDefault();

    // Validate required fields
    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {

      setError("Please fill all required fields.");

      return;
    }


    // Amount must be greater than 0
    if (Number(formData.amount) <= 0) {

      setError("Amount must be greater than 0.");

      return;
    }


    // Create new expense
    const newExpense = {
      id: Date.now().toString(),
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
    };


    // Add expense to Redux
    dispatch(addExpense(newExpense));


    // Go back to expenses page
    navigate("/expenses");

  };


  return (

    <div className="max-w-3xl mx-auto">

      <div className="mb-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Add Expense
        </h1>

        <p className="text-gray-500 mt-1">
          Add a new expense record.
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-7 space-y-5"
      >

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}


        {/* Title */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Example: Lunch"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>


        {/* Amount */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount *
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Example: 250"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>


        {/* Category */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >

            <option value="">
              Select Category
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Education">
              Education
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Entertainment">
              Entertainment
            </option>

            <option value="Health">
              Health
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        {/* Date */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>


        {/* Note */}
        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note
          </label>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="4"
            placeholder="Optional note..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />

        </div>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">

          <button
            type="button"
            onClick={() => navigate("/expenses")}
            className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Add Expense
          </button>

        </div>

      </form>

    </div>

  );
}

export default AddExpense;