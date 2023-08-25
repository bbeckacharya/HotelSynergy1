import { MdInventory, MdSettings } from "react-icons/md";
import MobileOptionsButton from "../../components/MobileOptionsButton";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function MobileOptions() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    name: "User",
    username: "",
    role: "",
    image: "/user.png",
  });
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("authdata") || "");
    if (!localUser) return navigate("/login");
    setCurrentUser(localUser);
  }, [navigate]);
  return (
    <section
      className="p-2 overflow-y-scroll w-screen"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <section className="flex items-center p-2 gap-3 justify-start">
        <img src={currentUser.image} className="w-1/4" alt="User profile" />
        <div className="flex flex-col w-full text-left">
          <h1 className="text-3xl font-bold">{currentUser.name}</h1>
          <h1>@{currentUser.username}</h1>
        </div>
      </section>
      <div className="flex mt-5 items-end justify-end w-full flex-col">
        <MobileOptionsButton
          action={() => {
            navigate("/admin/settings");
          }}
          key={"settings"}
          icon={<MdSettings />}
          text="Settings"
        />
        <MobileOptionsButton
          action={() => {
            navigate("/admin/staff");
          }}
          key={"staff"}
          icon={<FaUserCircle />}
          text="Staff Management"
        />
        <MobileOptionsButton
          action={() => {
            navigate("/admin/inventory");
          }}
          key={"inventory"}
          icon={<MdInventory />}
          text="Inventory"
        />
        <MobileOptionsButton
          action={() => {
            navigate("/admin/reports");
          }}
          key={"reports"}
          icon={<BsGraphUpArrow />}
          text="Reports"
        />
        <MobileOptionsButton
          action={() => {
            localStorage.clear();
            navigate("/login");
          }}
          key={"logout"}
          icon={<BiLogOutCircle />}
          text="Log out"
        />
      </div>
    </section>
  );
}

export default MobileOptions;
