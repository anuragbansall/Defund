import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainApplication() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const openMobileSidebar = useCallback(() => setMobileSidebarOpen(true), []);
  const closeMobileSidebar = useCallback(() => setMobileSidebarOpen(false), []);

  return (
    <div className="w-full h-screen bg-[#13131A] text-zinc-200 flex flex-col">
      <Header onOpenSidebar={openMobileSidebar} />

      <main className="sm:p-4 md:p-6 grow flex gap-6 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="grow h-full overflow-y-auto p-4 max-w-350 mx-auto ">
          <Outlet />
        </div>
      </main>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMobileSidebar}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80vw] bg-[#1C1C24] p-3 shadow-xl transform transition-transform">
            <Sidebar variant="mobile" onClose={closeMobileSidebar} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainApplication;
