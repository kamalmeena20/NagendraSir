// import Sidebar from "../../admin/components/Sidebar";
// import Navbar from "../../admin/components/Navbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         <Navbar />

//         <main className="p-6 overflow-y-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT AREA */}
      <div className="flex flex-col flex-1">
        
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
