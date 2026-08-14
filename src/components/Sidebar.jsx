import React from "react";
import { NavLink } from "react-router-dom";


function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "📊",
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: "💰",
    },
    {
      name: "Add Expense",
      path: "/add-expense",
      icon: "➕",
    },
  ];


  return (

    <>

      {/* Mobile Overlay */}
      {sidebarOpen && (

        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />

      )}


      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-40
          w-64
          h-screen
          flex-shrink-0
          bg-white
          border-r border-gray-200
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">

          <h2 className="text-xl font-bold text-green-600">
            Expense Manager
          </h2>

        </div>


        {/* Navigation */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                transition
                ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }
                `
              }
            >

              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </NavLink>

          ))}

        </nav>

      </aside>

    </>

  );
}

export default Sidebar;