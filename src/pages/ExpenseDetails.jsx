import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { deleteExpense } from "../redux/expenseSlice";


function ExpenseDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // Find selected expense
  const expense = useSelector((state) =>
    state.expenses.expenses.find(
      (expense) => expense.id === id
    )
  );


  // Expense not found
  if (!expense) {

    return (

      <div className="text-center py-16">

        <h1 className="text-2xl font-bold text-gray-800">
          Expense Not Found
        </h1>

        <Link
          to="/expenses"
          className="inline-block mt-4 text-green-600"
        >
          Back to Expenses
        </Link>

      </div>

    );
  }


  // Delete
  const handleDelete = () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (confirmed) {

      dispatch(deleteExpense(expense.id));

      navigate("/expenses");

    }

  };


  return (

    <div className="max-w-3xl mx-auto space-y-6">

      {/* Back */}
      <Link
        to="/expenses"
        className="text-green-600 hover:text-green-700"
      >
        ← Back to Expenses
      </Link>


      {/* Details Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="p-6 border-b border-gray-200">

          <p className="text-sm text-gray-500">
            Expense
          </p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            {expense.title}
          </h1>

          <p className="text-3xl font-bold text-green-600 mt-4">
            ₹{Number(expense.amount).toLocaleString()}
          </p>

        </div>


        <div className="p-6 space-y-5">

          <div>

            <p className="text-sm text-gray-500">
              Category
            </p>

            <p className="font-medium text-gray-800 mt-1">
              {expense.category}
            </p>

          </div>


          <div>

            <p className="text-sm text-gray-500">
              Date
            </p>

            <p className="font-medium text-gray-800 mt-1">
              {expense.date}
            </p>

          </div>


          <div>

            <p className="text-sm text-gray-500">
              Note
            </p>

            <p className="font-medium text-gray-800 mt-1">
              {expense.note || "No note added."}
            </p>

          </div>

        </div>


        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">

          <Link
            to={`/expenses/${expense.id}/edit`}
            className="px-5 py-3 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="px-5 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>

          <Link
            to="/expenses"
            className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 text-center hover:bg-gray-50"
          >
            Back
          </Link>

        </div>

      </div>

    </div>

  );
}

export default ExpenseDetails;