import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


function MonthlyExpenses() {

  const navigate = useNavigate();


  const expenses = useSelector(
    (state) => state.expenses.expenses
  );


  // Group expenses by month
  const groupedExpenses = expenses.reduce(
    (groups, expense) => {

      const date = new Date(expense.date);

      const month = date.getMonth();

      const year = date.getFullYear();

      const key = `${year}-${month}`;


      if (!groups[key]) {

        groups[key] = {
          month,
          year,
          total: 0,
        };

      }


      groups[key].total += Number(
        expense.amount
      );


      return groups;

    },
    {}
  );


  // Convert object to array
  const monthlyGroups = Object.entries(
    groupedExpenses
  )
    .map(([key, data]) => ({

      key,

      ...data,

      monthName: new Date(
        data.year,
        data.month,
        1
      ).toLocaleString(
        "en-US",
        {
          month: "long",
        }
      ),

    }))
    .sort((a, b) => {

      return (
        new Date(
          b.year,
          b.month
        ) -
        new Date(
          a.year,
          a.month
        )
      );

    });


  return (

    <div className="space-y-6">


     {/* Page Heading */}
        <div className="flex items-center justify-between gap-4">

        <div>

            <h1 className="text-3xl font-bold text-gray-800">
            Monthly Expenses
            </h1>

            <p className="text-gray-500 mt-1">
            Select a month to view all expenses.
            </p>

        </div>


        {/* Back to Dashboard */}
        <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition whitespace-nowrap"
        >

            <span className="text-xl">
            ←
            </span>

            <span className="font-medium">
            Back
            </span>

        </button>

        </div>

      {/* Monthly List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


        {monthlyGroups.length === 0 ? (

          /* Empty State */
          <div className="p-10 text-center">

            <p className="text-gray-500">
              No expenses added yet.
            </p>


            <Link
              to="/add-expense"
              className="inline-block mt-3 text-green-600 font-medium hover:text-green-700"
            >
              Add your first expense
            </Link>

          </div>

        ) : (

          <div>

            {monthlyGroups.map(
              (monthGroup) => (

                <Link
                  key={monthGroup.key}
                  to={`/monthly-expenses/${monthGroup.year}/${monthGroup.month + 1}`}
                  className="flex items-center justify-between gap-4 p-5 border-b border-gray-200 hover:bg-green-50 transition"
                >


                  {/* Month Name */}
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">

                    {monthGroup.monthName}{" "}

                    {monthGroup.year}

                  </h2>


                  {/* Total */}
                  <p className="text-base sm:text-lg font-bold text-green-600 whitespace-nowrap">

                    Total: ₹
                    {monthGroup.total.toLocaleString()}

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


export default MonthlyExpenses;