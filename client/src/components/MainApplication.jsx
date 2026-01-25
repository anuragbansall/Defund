import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainApplication() {
  return (
    <div className="w-full h-screen bg-[#13131A] text-zinc-200 flex flex-col">
      <Header />

      <main className="p-6 grow flex gap-6 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="grow h-full overflow-y-auto p-4 max-w-350 mx-auto ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainApplication;
