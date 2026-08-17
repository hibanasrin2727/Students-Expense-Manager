import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";


function MonthlyExpenseDetails() {

  // Get selected year and month from URL
  const { year, month } = useParams();


  // Get expenses from Redux
  const expenses = useSelector(
    (state) => state.expenses.expenses
  );


  // Convert URL values to numbers
  const selectedYear = Number(year);

  // URL month is 1-12
  // JavaScript month is 0-11
  const selectedMonth = Number(month) - 1;


  // Get month name
  const monthName = new Date(
    selectedYear,
    selectedMonth,
    1
  ).toLocaleString(
    "en-US",
    {
      month: "long",
    }
  );


  // Filter expenses for selected month
  const monthlyExpenses = expenses.filter(
    (expense) => {

      const expenseDate = new Date(
        expense.date
      );


      return (
        expenseDate.getMonth() === selectedMonth &&
        expenseDate.getFullYear() === selectedYear
      );

    }
  );


  // Calculate total
  const monthlyTotal = monthlyExpenses.reduce(
    (total, expense) =>
      total + Number(expense.amount),
    0
  );


  // Sort latest expense first
  const sortedExpenses = [
    ...monthlyExpenses,
  ].sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );


  return (

    <div className="space-y-6">


      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            {monthName} {selectedYear}
          </h1>

          <p className="text-gray-500 mt-1">
            Your expenses for this month.
          </p>

        </div>


        <Link
          to="/monthly-expenses"
          className="text-green-600 font-medium hover:text-green-700"
        >
          ← Back to Months
        </Link>

      </div>


      {/* Monthly Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


        {/* Total */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            {monthName} Total
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            ₹{monthlyTotal.toLocaleString()}
          </h2>

        </div>


        {/* Records */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Records
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {monthlyExpenses.length}
          </h2>

        </div>

      </div>


      {/* Monthly Expenses */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">


        {/* Section Header */}
        <div className="p-5 border-b border-gray-500 bg-green-100">

          <h2 className="text-lg font-semibold text-gray-800">
            {monthName} Expenses
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            All expenses recorded during {monthName}.
          </p>

        </div>


        {/* Empty State */}
        {sortedExpenses.length === 0 ? (

          <div className="p-10 text-center">

            <p className="text-gray-500">
              No expenses added for {monthName}.
            </p>

            <Link
              to="/add-expense"
              className="inline-block mt-3 text-green-600 font-medium"
            >
              Add Expense
            </Link>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {sortedExpenses.map(
              (expense) => (

                <Link
                  key={expense.id}
                  to={`/expenses/${expense.id}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 hover:bg-gray-50 transition"
                >


                  {/* Expense Details */}
                  <div>

                    <h3 className="font-medium text-gray-800">
                      {expense.title}
                    </h3>


                    <p className="text-sm text-gray-500 mt-1">

                      {expense.category}

                      {" • "}

                      {new Date(
                        expense.date
                      ).toLocaleDateString(
                        "en-GB"
                      )}

                    </p>


                    {expense.note && (

                      <p className="text-sm text-gray-400 mt-1">
                        {expense.note}
                      </p>

                    )}

                  </div>


                  {/* Amount */}
                  <p className="font-semibold text-gray-800">

                    ₹
                    {Number(
                      expense.amount
                    ).toLocaleString()}

                  </p>


                </Link>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );
}


export default MonthlyExpenseDetails;