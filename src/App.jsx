import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import ExpenseDetails from "./pages/ExpenseDetails";
import EditExpense from "./pages/EditExpense";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Common Application Layout */}
        <Route element={<Layout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Expenses */}
          <Route
            path="/expenses"
            element={<Expenses />}
          />

          {/* Add Expense */}
          <Route
            path="/add-expense"
            element={<AddExpense />}
          />

          {/* Expense Details */}
          <Route
            path="/expenses/:id"
            element={<ExpenseDetails />}
          />

          {/* Edit Expense */}
          <Route
            path="/expenses/:id/edit"
            element={<EditExpense />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;