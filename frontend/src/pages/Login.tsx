import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Login() {
  const [screen, setScreen] = useState("Normal");
  const [error, setError] = useState({ on: false, message: "" });
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = async () => {
    setScreen("Loading");
    try {
      const loginRequest = await fetch(
        import.meta.env.VITE_SERVER_URL + "auth/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (loginRequest.status === 200) {
        const userdata = await loginRequest.json();
        console.log(userdata.user);
        localStorage.setItem("authdata", JSON.stringify(userdata.user));
        navigate(`/${userdata.user.role}`);
      }
      if (loginRequest.status === 404) {
        setScreen("Normal");
        return setError({ on: true, message: "That user was not found." });
      }
      if (loginRequest.status === 401) {
        setScreen("Normal");
        return setError({
          on: true,
          message: "The password entered was wrong",
        });
      }
      if (loginRequest.status === 400) {
        const responsedata = await loginRequest.json();
        setScreen("Normal");
        return setError({ on: true, message: responsedata.msg });
      }
      if (loginRequest.status === 500) {
        return setError({
          on: true,
          message: "Unknown server error, please try agin later.",
        });
      }
      if (!loginRequest.ok) {
        setScreen("Normal");
        setError({ on: true, message: "An unknown error occoured." });
      }
    } catch (err) {
      setScreen("Normal");
      setError({ on: true, message: "An unknown error occoured." });
    }
  };

  useEffect(() => {
    window.document.title = "Login - HRMS";
  }, []);
  return (
    <>
      {/* Normal Login Screen */}
      {screen === "Normal" && (
        <main className="bg-white md:bg-slate-300 flex flex-col justify-start items-center h-screen w-screen">
          <form
            className="flex flex-col rounded-md md:border-2 md:border-black mt-5 bg-white p-4 w-full mx-2  md:w-1/3 xl:w-1/4 gap-1"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <h1 className="font-bold text-4xl pt-2">Log in</h1>
            <p className="text-gray-500 pb-2">
              Please enter details to continue.
            </p>
            {error.on && (
              <section className="bg-white text-black w-full p-2 rounded border-rose-500 border-2 flex items-center justify-between">
                <h1 className="text-rose-500">{error.message}</h1>
                <button
                  onClick={() => {
                    setError({ on: false, message: "" });
                  }}
                  className="text-3xl text-rose-500 hover:text-gray-500 transition-all"
                >
                  <FaWindowClose />
                </button>
              </section>
            )}
            <label htmlFor="username" className="-mb-1 text-gray-500">
              Username:
            </label>
            <input
              type="text"
              id="username"
              required
              placeholder="Enter your username"
              autoComplete="Username"
              className="border-2 p-1 rounded"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            <label htmlFor="password" className="-mb-1 text-gray-500">
              Password:
            </label>
            <input
              type="password"
              id="password"
              required
              className="border-2 p-1 rounded"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
            <div className="flex gap-3 md:gap-5 xl:md-10 justify-between mt-2">
              <button
                className="bg-green-500 text-white px-5  w-full rounded py-1 hover:bg-green-800 transition-all"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
        </main>
      )}

      {/* Loading Screen */}
      {screen === "Loading" && <Loading />}
    </>
  );
}

export default Login;
