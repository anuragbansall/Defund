import React from "react";
import { FaTruckLoading } from "react-icons/fa";

function Loading() {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <span className="text-6xl animate-spin">
        <FaTruckLoading />
      </span>
    </main>
  );
}

export default Loading;
