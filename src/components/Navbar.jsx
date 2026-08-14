import React from "react";

function Navbar({ setSidebarOpen }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-gray-700 text-2xl"
      >
        ☰
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2">

        <div className="w-9 h-9 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold">
          E
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Expense Manager
        </h1>

      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">

        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold text-gray-800">
            Student
          </p>

          <p className="text-xs text-gray-500">
            Personal Account
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold">
          S
        </div>

      </div>

    </header>
  );
}

export default Navbar;