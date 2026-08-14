import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Dashboard() {

  // Get all expenses from Redux
  const expenses = useSelector(
    (state) => state.expenses.expenses
  );


  // Calculate total expenses
  const totalExpense = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );


  // Current date
  const today = new Date();

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();


  // Calculate this month's expenses
  const monthlyExpense = expenses
    .filter((expense) => {

      const expenseDate = new Date(
        expense.date
      );


      return (
        expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear
      );

    })
    .reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );


  // Find highest expense
  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map(
            (expense) => Number(expense.amount)
          )
        )
      : 0;


  // Get latest 5 expenses
  const recentExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 5);


  return (

    <div className="space-y-6">


      {/* Page Heading */}
      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Here's your expense overview.
        </p>

      </div>


      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">


        {/* Total Expense */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Expense
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            ₹{totalExpense.toLocaleString()}
          </h2>

        </div>


        {/* This Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            This Month
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            ₹{monthlyExpense.toLocaleString()}
          </h2>

        </div>


        {/* Total Records */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Records
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {expenses.length}
          </h2>

        </div>


        {/* Highest Expense */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Highest Expense
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            ₹{highestExpense.toLocaleString()}
          </h2>

        </div>

      </div>


      {/* Recent Expenses */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        <div className="flex items-center justify-between p-5 border-b border-gray-200">

          <div>

            <h2 className="text-lg font-semibold text-gray-800">
              Recent Expenses
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your latest expense records
            </p>

          </div>


          <Link
            to="/expenses"
            className="text-green-600 font-medium text-sm hover:text-green-700"
          >
            View All
          </Link>

        </div>


        {/* Empty State */}
        {recentExpenses.length === 0 ? (

          <div className="p-10 text-center">

            <p className="text-gray-500">
              No expenses added yet.
            </p>


            <Link
              to="/add-expense"
              className="inline-block mt-3 text-green-600 font-medium"
            >
              Add your first expense
            </Link>

          </div>

        ) : (


          /* Recent Expense Items */
          <div className="divide-y divide-gray-100">

            {recentExpenses.map((expense) => (

              <Link
                key={expense.id}
                to={`/expenses/${expense.id}`}
                className="flex items-center justify-between p-5 hover:bg-gray-50"
              >

                <div>

                  <h3 className="font-medium text-gray-800">
                    {expense.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {expense.category} • {expense.date}
                  </p>

                </div>


                <p className="font-semibold text-gray-800">
                  ₹{Number(expense.amount).toLocaleString()}
                </p>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}


export default Dashboard;