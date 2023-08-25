import { useState } from "react";
import SidebarButton from "./SidebarButton";
import { useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { FaBed, FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdInventory, MdTableBar } from "react-icons/md";
import { BsFileBarGraph } from "react-icons/bs";

function AdminMenu() {
  const [currentMenu, setCurrentMenu] = useState("Home");
  const navigate = useNavigate();
  return (
    <>
      <ul className="flex w-full justify-start flex-col items-start">
        <SidebarButton
          icon={<AiTwotoneHome />}
          action={() => {
            setCurrentMenu("Home");
            navigate("/admin");
          }}
          currentMenu={currentMenu}
          text="Home"
          key={"Home"}
        />
        <SidebarButton
          icon={<BsFileBarGraph />}
          action={() => {
            setCurrentMenu("Reports");
            navigate("/admin/reports");
          }}
          currentMenu={currentMenu}
          text="Reports"
          key={"Reports"}
        />
        <SidebarButton
          icon={<FaBed />}
          action={() => {
            setCurrentMenu("Hotel");
            navigate("/admin/hotel");
          }}
          currentMenu={currentMenu}
          text="Hotel"
          key={"Hotel"}
        />
        <SidebarButton
          icon={<MdTableBar />}
          action={() => {
            setCurrentMenu("Restaurant");
            navigate("/admin/restaurant");
          }}
          currentMenu={currentMenu}
          text="Restaurant"
          key={"Restaurant"}
        />
        <SidebarButton
          icon={<MdInventory />}
          action={() => {
            setCurrentMenu("Inventory");
            navigate("/admin/inventory");
          }}
          currentMenu={currentMenu}
          text="Inventory"
          key={"Inventory"}
        />
        <SidebarButton
          icon={<FaUserCircle />}
          action={() => {
            setCurrentMenu("Staff");
            navigate("/admin/staff");
          }}
          currentMenu={currentMenu}
          text="Staff"
          key={"Staff"}
        />
        <SidebarButton
          icon={<FiSettings />}
          action={() => {
            setCurrentMenu("Settings");
            navigate("/admin/settings");
          }}
          currentMenu={currentMenu}
          text="Settings"
          key={"Settings"}
        />
      </ul>
    </>
  );
}

export default AdminMenu;
