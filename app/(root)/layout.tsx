import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#222831]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-4/5">{children}</main>
      </div>
    </div>
  );
}

export default layout;
