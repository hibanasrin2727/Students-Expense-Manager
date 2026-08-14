import React, { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { Link } from "react-router-dom";

import {
  deleteExpense,
  setSearch,
  setCategory,
  setSortBy,
  clearFilters,
} from "../redux/expenseSlice";


function Expenses() {

  const dispatch = useDispatch();


  // Get Redux state
  const {
    expenses,
    search,
    category,
    sortBy,
  } = useSelector(
    (state) => state.expenses
  );


  // Reset filters whenever this page is opened
  useEffect(() => {

    dispatch(clearFilters());

  }, [dispatch]);


  // Search + category filter
  let filteredExpenses = expenses.filter(
    (expense) => {

      const searchText =
        search.toLowerCase();


      const matchesSearch =
        expense.title
          .toLowerCase()
          .includes(searchText) ||

        expense.note
          .toLowerCase()
          .includes(searchText);


      const matchesCategory =
        category === "All Categories" ||
        expense.category === category;


      return (
        matchesSearch &&
        matchesCategory
      );

    }
  );


  // Sorting
  filteredExpenses = [
    ...filteredExpenses,
  ].sort((a, b) => {

    if (sortBy === "latest") {

      return (
        new Date(b.date) -
        new Date(a.date)
      );

    }


    if (sortBy === "oldest") {

      return (
        new Date(a.date) -
        new Date(b.date)
      );

    }


    if (sortBy === "highest") {

      return (
        Number(b.amount) -
        Number(a.amount)
      );

    }


    if (sortBy === "lowest") {

      return (
        Number(a.amount) -
        Number(b.amount)
      );

    }


    return 0;

  });


  // Delete
  const handleDelete = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );


    if (confirmed) {

      dispatch(deleteExpense(id));

    }

  };


  return (

    <div className="space-y-6">


      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Expenses
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all your expenses.
          </p>

        </div>


        <Link
          to="/add-expense"
          className="bg-green-600 text-white px-5 py-3 rounded-lg text-center hover:bg-green-700"
        >
          + Add Expense
        </Link>

      </div>


      {/* Search / Filter / Sort */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(event) =>
              dispatch(
                setSearch(
                  event.target.value
                )
              )
            }
            placeholder="Search expenses..."
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />


          {/* Category */}
          <select
            value={category}
            onChange={(event) =>
              dispatch(
                setCategory(
                  event.target.value
                )
              )
            }
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >

            <option value="All Categories">
              All Categories
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


          {/* Sort */}
          <select
            value={sortBy}
            onChange={(event) =>
              dispatch(
                setSortBy(
                  event.target.value
                )
              )
            }
            className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          >

            <option value="latest">
              Latest Date
            </option>

            <option value="oldest">
              Oldest Date
            </option>

            <option value="highest">
              Highest Amount
            </option>

            <option value="lowest">
              Lowest Amount
            </option>

          </select>

        </div>

      </div>


      {/* Expense List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


        {filteredExpenses.length === 0 ? (

          <div className="p-10 text-center">

            <p className="text-gray-500">

              {expenses.length === 0
                ? "No expenses yet."
                : "No expenses match your search or filter."}

            </p>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {filteredExpenses.map(
              (expense) => (

                <div
                  key={expense.id}
                  className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >


                  {/* Details */}
                  <div className="flex-1">

                    <Link
                      to={`/expenses/${expense.id}`}
                      className="text-lg font-semibold text-gray-800 hover:text-green-600"
                    >
                      {expense.title}
                    </Link>


                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">

                      <span>
                        {expense.category}
                      </span>

                      <span>
                        {expense.date}
                      </span>

                    </div>


                    {expense.note && (

                      <p className="text-sm text-gray-400 mt-1">
                        {expense.note}
                      </p>

                    )}

                  </div>


                  {/* Amount */}
                  <div className="font-bold text-gray-800">

                    ₹
                    {Number(
                      expense.amount
                    ).toLocaleString()}

                  </div>


                  {/* Actions */}
                  <div className="flex gap-2">

                    <Link
                      to={`/expenses/${expense.id}`}
                      className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                      View
                    </Link>


                    <Link
                      to={`/expenses/${expense.id}/edit`}
                      className="px-3 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      Edit
                    </Link>


                    <button
                      onClick={() =>
                        handleDelete(
                          expense.id
                        )
                      }
                      className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );
}


export default Expenses;