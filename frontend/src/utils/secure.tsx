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
          <section className="flex justify-start">
            <Sidebar />
            <main
              className="h-full w-screen overflow-y-scroll overflow-x-hidden"
              style={{ height: "calc(100vh - 60px)" }}
            >
              {children}
            </main>
          </section>
          <MobileNavbar />
        </>
      );
    case false:
      return <>You are not logged in, redirecting..</>;
  }
}

export default Secure;
