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
        <main className="bg-slate-300 flex justify-center items-start h-screen w-screen">
          <form
            className="flex flex-col rounded-md border-2 border-black bg-white mt-10 p-4 w-1/2  md:w-1/3 xl:w-1/4 gap-1"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <h1 className="font-bold text-4xl pt-2">Log in</h1>
            <p className="text-gray-500 pb-2">
              Please enter details to continue.
            </p>
            <label htmlFor="username" className="-mb-1 text-gray-500">
              Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
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
              className="border-2 p-1 rounded"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <div className="flex gap-3 md:gap-5 xl:md-10 justify-between mt-2">
              <button
                type="reset"
                className="bg-rose-500 text-white px-5 w-1/2 rounded py-1 hover:bg-rose-800 transition-all"
                onClick={() => {
                  setUser({ username: "", password: "" });
                }}
              >
                Cancle
              </button>
              <button
                className="bg-green-500 text-white px-5 w-1/2 rounded py-1 hover:bg-green-800 transition-all"
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
