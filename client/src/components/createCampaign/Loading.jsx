import React from "react";
import { FaEthereum, FaTruckLoading } from "react-icons/fa";

function Loading() {
  return (
    <main className="flex justify-center items-center w-full h-full">
      <span className="text-6xl animate-spin">
        <FaEthereum />
      </span>
    </main>
  );
}

export default Loading;
