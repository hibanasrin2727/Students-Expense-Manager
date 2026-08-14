import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


function Layout() {

  // Controls mobile sidebar visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (

    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* Main Content Area */}
      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <Navbar
          setSidebarOpen={setSidebarOpen}
        />


        {/* Current Page */}
        <main className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );
}

export default Layout;