"use client";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 md:ml-16 transition-all duration-300 overflow-auto">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="max-w-full mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
