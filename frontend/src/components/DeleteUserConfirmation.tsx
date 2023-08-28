import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { toast } from "react-toastify";
import Loading from "./Loading";

interface deletUserAccountProps {
  userid: string;
  showDeleteConfirmation: Dispatch<SetStateAction<boolean>>;
}

function DeleteUserConfirmation({
  userid,
  showDeleteConfirmation,
}: deletUserAccountProps) {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(userid);
  }, [userid]);

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    console.log(user);
    const deletAccountRequest = await fetch(
      import.meta.env.VITE_SERVER_URL + "auth/delete",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );
    if (deletAccountRequest.ok) {
      showDeleteConfirmation(false);
      setLoading(false);
      return toast.success("Account deleted successfully.");
    }
    if (deletAccountRequest.status === 500) {
      showDeleteConfirmation(false);
      setLoading(false);
      return toast.error(
        "There was an unknow server error, please try again later."
      );
    }
    if (deletAccountRequest.status === 404) {
      showDeleteConfirmation(false);
      setLoading(false);
      return toast.error("Sorry, that user was not found.");
    }
    if (deletAccountRequest.status === 400) {
      setLoading(false);
      const resp = await deletAccountRequest.json();
      console.log(resp);
      showDeleteConfirmation(false);
      return toast.error("Sorry, the account can not be deleted.");
    }
    if (deletAccountRequest.status === 401) {
      showDeleteConfirmation(false);
      setLoading(false);
      return toast.error("You are not allowed to take that action.");
    }
  };

  return (
    <div className="absolute w-screen h-screen flex justify-center top-0 left-0 bg-black bg-opacity-70">
      {loading && <Loading />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }}
        className="bg-white p-4 rounded w-fit h-fit mt-10"
      >
        <h1 className="font-bold text-xl">Delete Account</h1>
        <p>Are you sure that you want to delete this account?</p>
        <div className="flex w-full justify-between mt-4">
          <button
            onClick={() => {
              showDeleteConfirmation(false);
            }}
            type="reset"
            className="text-white px-5 py-1 rounded bg-slate-500 hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-white px-5 py-1 rounded bg-rose-500 hover:bg-rose-800 transition-all"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteUserConfirmation;
