import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateExpense } from "../redux/expenseSlice";


function EditExpense() {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // Find expense
  const expense = useSelector((state) =>
    state.expenses.expenses.find(
      (expense) => expense.id === id
    )
  );


  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    note: "",
  });


  const [error, setError] = useState("");


  // Load existing expense
  useEffect(() => {

    if (expense) {

      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        note: expense.note || "",
      });

    }

  }, [expense]);


  // Expense doesn't exist
  if (!expense) {

    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold">
          Expense Not Found
        </h1>
      </div>
    );

  }


  // Input change
  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };


  // Submit
  const handleSubmit = (event) => {

    event.preventDefault();


    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {

      setError("Please fill all required fields.");

      return;

    }


    if (Number(formData.amount) <= 0) {

      setError("Amount must be greater than 0.");

      return;

    }


    const updatedExpense = {
      id: expense.id,
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
    };


    dispatch(updateExpense(updatedExpense));


    navigate(`/expenses/${expense.id}`);

  };


  return (

    <div className="max-w-3xl mx-auto">

      <div className="mb-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Edit Expense
        </h1>

        <p className="text-gray-500 mt-1">
          Update your expense information.
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-7 space-y-5"
      >

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}


        {/* Title */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Title *
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>


        {/* Amount */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Amount *
          </label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>


        {/* Category */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Category *
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >

            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>

          </select>

        </div>


        {/* Date */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Date *
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

        </div>


        {/* Note */}
        <div>

          <label className="block text-sm font-medium mb-2">
            Note
          </label>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-3 resize-none"
          />

        </div>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={() => navigate(`/expenses/${expense.id}`)}
            className="px-5 py-3 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>

        </div>

      </form>

    </div>

  );
}

export default EditExpense;