import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenuMobile from "./AdminMenuMobile";

function MobileNavbar() {
  const [currentUser, setCurrentUser] = useState({ username: "", role: "" });
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("authdata") || "");
    if (!localUser) return navigate("/login");
    setCurrentUser(localUser);
  }, [navigate]);
  return (
    <nav className="fixed h-[60px] py-2  min-h-fit w-screen md:hidden bottom-0 left-0 bg-slate-300 border-t-2">
      {currentUser.role === "admin" && <AdminMenuMobile />}
    </nav>
  );
}

export default MobileNavbar;
