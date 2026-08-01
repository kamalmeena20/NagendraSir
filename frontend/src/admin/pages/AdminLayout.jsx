import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#04140f]">
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* RIGHT CONTENT AREA */}
      <div className="flex min-w-0 flex-1 flex-col bg-[radial-gradient(ellipse_80%_50%_at_10%_-10%,rgba(0,158,102,0.22),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(6,78,59,0.35),transparent_50%),linear-gradient(160deg,#04140f_0%,#06281d_55%,#04140f_100%)]">
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
