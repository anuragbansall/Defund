import React from "react";
import { IoMdClose } from "react-icons/io";

const typeStyles = {
  success: {
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-500/20",
    hover: "hover:bg-green-500/20",
  },
  error: {
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-500/20",
    hover: "hover:bg-red-500/20",
  },
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/20",
    hover: "hover:bg-blue-500/20",
  },
};

function MessagePopup({
  message,
  type = "info", // 'success' | 'error' | 'info'
  onClose,
  className = "",
}) {
  const styles = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`w-full px-4 py-2 rounded-md flex items-center justify-between border
        ${styles.bg} ${styles.text} ${styles.border} ${className}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className={`ml-4 font-bold focus:outline-none cursor-pointer rounded-md p-1 transition ${styles.hover}`}
        aria-label="Close message"
      >
        <IoMdClose />
      </button>
    </div>
  );
}

export default MessagePopup;
