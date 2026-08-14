import { createSlice } from "@reduxjs/toolkit";


// Initial Redux state
const initialState = {
  // All expense records
  expenses: [],

  // Search text
  search: "",

  // Selected category
  category: "All Categories",

  // Selected sorting method
  sortBy: "latest",
};


const expenseSlice = createSlice({

  name: "expenses",

  initialState,

  reducers: {

    // Add a new expense
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },


    // Delete an expense
    deleteExpense: (state, action) => {

      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );

    },


    // Update an existing expense
    updateExpense: (state, action) => {

      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );


      if (index !== -1) {

        state.expenses[index] = action.payload;

      }

    },


    // Update search
    setSearch: (state, action) => {

      state.search = action.payload;

    },


    // Update category
    setCategory: (state, action) => {

      state.category = action.payload;

    },


    // Update sorting
    setSortBy: (state, action) => {

      state.sortBy = action.payload;

    },


    // Reset search, category and sorting
    clearFilters: (state) => {

      state.search = "";

      state.category = "All Categories";

      state.sortBy = "latest";

    },

  },

});


export const {
  addExpense,
  deleteExpense,
  updateExpense,
  setSearch,
  setCategory,
  setSortBy,
  clearFilters,
} = expenseSlice.actions;


export default expenseSlice.reducer;