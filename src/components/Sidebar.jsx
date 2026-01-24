import React from "react";
import { MdCampaign, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const sidebarItems = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "/",
    },
    {
      name: "Create Campaign",
      icon: <MdCampaign />,
      link: "/create-campaign",
    },
  ];
  return (
    <div className="h-full w-fit">
      <div className="bg-[#1C1C24] p-3 rounded-2xl flex flex-col gap-4 h-full">
        {sidebarItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            title={item.name}
            className={({ isActive }) =>
              `flex items-center gap-3 ${isActive ? "text-[#17a05d] bg-zinc-300/10" : "text-zinc-300"} hover:bg-white/5 p-3 rounded-xl transition cursor-pointer`
            }
          >
            <span className="text-3xl">{item.icon}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
