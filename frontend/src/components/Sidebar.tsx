import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";

function Sidebar() {
  const [currentUser, setCurrentUser] = useState({ username: "", role: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("authdata") || "");
    if (!localUser) return navigate("/login");
    setCurrentUser(localUser);
  }, [navigate]);

  return (
    <aside
      className="hidden md:flex flex-col  bg-slate-600 overflow-none p-2 text-white w-1/6"
      style={{ height: "calc( 100vh - 50px )" }}
    >
      {currentUser.role === "admin" && <AdminMenu />}
    </aside>
  );
}

export default Sidebar;
