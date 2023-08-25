import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Public({ children }: React.PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userpath, setUserPath] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const userdata = localStorage.getItem("authdata");
    if (!userdata) {
      return setLoggedIn(false);
    } else {
      const user = JSON.parse(userdata);
      setUserPath(user.role);
      setLoggedIn(true);
    }
    const loggedInData = localStorage.getItem("authdata");
    if (!loggedInData) return setLoggedIn(true);
  }, []);
  switch (loggedIn) {
    case false:
      return <main>{children}</main>;

    default:
      navigate(`/${userpath}`);
      return <>You are already logged in.</>;
  }
}

export default Public;
