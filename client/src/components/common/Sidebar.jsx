import React from "react";
import { FaEthereum, FaHome } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdCampaign, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function Sidebar({ variant = "desktop", onClose }) {
  const sidebarItems = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/",
    },
    {
      name: "Campaigns",
      icon: <MdCampaign />,
      link: "/campaigns",
    },
    {
      name: "Create Campaign",
      icon: <IoIosCreate />,
      link: "/create-campaign",
    },
    {
      name: "Ethereum Page",
      icon: <FaEthereum />,
      link: "/ethereum",
    },
  ];

  return (
    <div className={variant === "mobile" ? "h-full w-full" : "h-full w-fit"}>
      <div className="bg-[#1C1C24] p-3 rounded-2xl flex flex-col gap-4 h-full">
        {variant === "mobile" && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition"
              onClick={onClose}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
        )}
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            title={item.name}
            className={({ isActive }) =>
              `flex items-center gap-3 ${isActive ? "text-[#17a05d] bg-zinc-300/10" : "text-zinc-300"} hover:bg-white/5 p-3 rounded-xl transition cursor-pointer`
            }
            onClick={variant === "mobile" ? onClose : undefined}
          >
            <span className="text-3xl">{item.icon}</span>
            {variant === "mobile" && (
              <span className="text-sm">{item.name}</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
