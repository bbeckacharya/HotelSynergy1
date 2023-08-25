import { useState } from "react";
import MobileNavbarButton from "./MobileNavbarButton";
import { FaBed, FaHome } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { MdTableBar } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AdminMenuMobile() {
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState("Home");
  return (
    <section className="w-screen h-full min-h-fit flex gap-1">
      <MobileNavbarButton
        action={() => {
          setCurrentMenu("Home");
          navigate("/admin");
        }}
        currentMenu={currentMenu}
        icon={<FaHome />}
        text="Home"
        key={"Home"}
      />
      <MobileNavbarButton
        action={() => {
          setCurrentMenu("Hotel");
          navigate("/admin/hotel");
        }}
        currentMenu={currentMenu}
        icon={<FaBed />}
        text="Hotel"
        key={"Hotel"}
      />
      <MobileNavbarButton
        action={() => {
          setCurrentMenu("Restaurant");
          navigate("/admin/restaurant");
        }}
        currentMenu={currentMenu}
        icon={<MdTableBar />}
        text="Restaurant"
        key={"Restaurant"}
      />
      <MobileNavbarButton
        action={() => {
          setCurrentMenu("Menu");
          navigate("/admin/options");
        }}
        currentMenu={currentMenu}
        icon={<AiOutlineMenu />}
        text="Menu"
        key={"Menu"}
      />
    </section>
  );
}

export default AdminMenuMobile;
