import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "../redux/expenseSlice";


// Load only saved expenses
const loadExpenses = () => {

  try {

    const savedExpenses =
      localStorage.getItem("expenseManagerExpenses");


    if (!savedExpenses) {
      return [];
    }


    return JSON.parse(savedExpenses);

  } catch (error) {

    console.error(
      "Unable to load expenses:",
      error
    );

    return [];

  }

};


// Create Redux store
const store = configureStore({

  reducer: {
    expenses: expenseReducer,
  },


  // Put saved expenses into Redux
  preloadedState: {

    expenses: {

      expenses: loadExpenses(),

      search: "",

      category: "All Categories",

      sortBy: "latest",

    },

  },

});


// Save expenses whenever Redux changes
store.subscribe(() => {

  try {

    const state = store.getState();


    localStorage.setItem(
      "expenseManagerExpenses",
      JSON.stringify(state.expenses.expenses)
    );

  } catch (error) {

    console.error(
      "Unable to save expenses:",
      error
    );

  }

});


export default store;