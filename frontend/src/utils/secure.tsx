import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MobileNavbar from "../components/MobileNavbar";

function Secure({ children }: React.PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInData = localStorage.getItem("authdata");
    if (!loggedInData) return navigate("/login");
    if (loggedInData) return setLoggedIn(true);
  }, [navigate]);
  switch (loggedIn) {
    case true:
      return (
        <>
          <Header />
          <section
            className="flex justify-start  "
            style={{ height: "calc( 100% - 50px )" }}
          >
            <Sidebar />
            {children}
          </section>
          <MobileNavbar />
        </>
      );
    case false:
      return <>You are not logged in, redirecting..</>;
  }
}

export default Secure;
