import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function Login() {
  const [screen, setScreen] = useState("Normal");
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    setScreen("Loading");
    const loginRequest = await fetch(
      import.meta.env.SERVER_URL + "auth/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (loginRequest.status === 200) {
      //do actions after login success.
    }
    setScreen("Normal");
  };

  useEffect(() => {
    window.document.title = "Login - HRMS";
  }, []);
  return (
    <>
      {/* Normal Login Screen */}
      {screen === "Normal" && (
        <main>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button type="submit">Log in</button>
            <button
              type="reset"
              onClick={() => {
                setUser({ username: "", password: "" });
              }}
            >
              Cancle
            </button>
          </form>
        </main>
      )}

      {/* Loading Screen */}
      {screen === "Loading" && <Loading />}
    </>
  );
}

export default Login;
