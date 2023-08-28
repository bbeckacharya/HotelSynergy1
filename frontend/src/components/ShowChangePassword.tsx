import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";

interface changepasswordProps {
  userid: string;
  showChangePassword: Dispatch<SetStateAction<boolean>>;
}
function ShowChangePassword({
  userid,
  showChangePassword,
}: changepasswordProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    setUser(userid);
  }, [userid]);
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const deleteRequest = await fetch(
        import.meta.env.VITE_SERVER_URL + "auth/reset",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ user, password }),
        }
      );
      if (deleteRequest.ok) {
        setLoading(false);
        showChangePassword(false);
        return toast.success("Password changed successfully.");
      }
      if (!deleteRequest.ok) {
        setLoading(false);
        return toast.error("There was an error changing the password.");
      }
    } catch (err) {
      setLoading(false);
      return toast.error("Unknown error occoured.");
    }
  };
  return (
    <div className="z-20 absolute top-0 left-0 w-screen flex justify-center h-screen bg-black bg-opacity-70">
      {loading && <Loading />}
      <form
        className="bg-white p-4 mt-10 h-fit rounded  border-2 w-1/3 gap-2 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          if (password === confirmPassword && password != "") {
            handleChangePassword();
          } else {
            return toast.error("Confirmation password does not match.");
          }
        }}
      >
        <h1 className="font-bold text-2xl">Change Password</h1>
        <input
          type="password"
          className="border-2 p-2 rounded-md"
          placeholder="New password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          required
          className="border-2 p-2 rounded-md"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex mt-2 gap-2">
          <button
            type="reset"
            onClick={() => {
              showChangePassword(false);
            }}
            className="bg-rose-500 hover:bg-rose-800 transition-all px-5 py-1 w-1/2 rounded text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-800 transition-all px-5 py-1 w-1/2 rounded text-white"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShowChangePassword;
