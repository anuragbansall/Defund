import React from "react";

function Logo({ size = 40 }) {
  return (
    <span
      className={`flex items-center justify-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/15 overflow-hidden`}
      style={{ height: size, width: size }}
    >
      <img
        src="/logo.png"
        alt="Defund Logo"
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export default Logo;
