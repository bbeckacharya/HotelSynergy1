import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";

interface addStaffProps {
  showAddStaff: Dispatch<SetStateAction<boolean>>;
}

function AddStaff({ showAddStaff }: addStaffProps) {
  const [staffDetail, setStaffDetails] = useState({
    username: "",
    name: "",
    role: "frontdesk",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const createUserHandler = async () => {
    setLoading(true);
    try {
      const createRequest = await fetch(
        import.meta.env.VITE_SERVER_URL + "auth/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/Json",
          },
          body: JSON.stringify(staffDetail),
        }
      );
      if (createRequest.status === 200) {
        setLoading(false);
        showAddStaff(false);
        return toast.success("User added successfully.");
      }
      if (createRequest.status === 400) {
        setLoading(false);
        return toast.error("All fields are required.");
      }
      if (createRequest.status === 500) {
        setLoading(false);
        return toast.error("Unknown server error, please try again later.");
      }
    } catch (error) {
      setLoading(false);
      return toast.error("An unknown error processing your request.");
    }
  };
  return (
    <section className="absolute flex justify-center w-screen h-screen top-0 left-0 bg-black bg-opacity-75">
      {loading && <Loading />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUserHandler();
        }}
        className="flex flex-col w-1/3 md:1/4 bg-white rounded border-2 p-4 h-fit mt-10"
      >
        <h1 className="font-bold text-xl">Add Staff</h1>
        <label htmlFor="staffname" className="text-gray-500 mt-2">
          Full name:
        </label>
        <input
          type="text"
          value={staffDetail.name}
          onChange={(e) => {
            setStaffDetails({ ...staffDetail, name: e.target.value });
          }}
          className="border-2 p-1 rounded"
          id="staffname"
          placeholder="Mr. Raju Sharma"
        />

        <label htmlFor="staffusername" className="text-gray-500 mt-2">
          Username:
        </label>
        <input
          type="text"
          value={staffDetail.username}
          onChange={(e) => {
            setStaffDetails({ ...staffDetail, username: e.target.value });
          }}
          className="border-2 p-1 rounded"
          id="staffusername"
          placeholder="raju22"
        />

        <label htmlFor="role" className="text-gray-500 mt-2">
          Staff role:
        </label>
        <select
          defaultValue={"frontdesk"}
          id="role"
          onChange={(e) =>
            setStaffDetails({ ...staffDetail, role: e.target.value })
          }
          className="p-2 rounded"
        >
          <option value="frontdesk">Front Desk</option>
          <option value="waiter">Waiter</option>
          <option value="admin">Admin</option>
        </select>
        <label htmlFor="staffpassword" className="text-gray-500 mt-2">
          New Password:
        </label>
        <input
          value={staffDetail.password}
          onChange={(e) =>
            setStaffDetails({ ...staffDetail, password: e.target.value })
          }
          type="text"
          className="border-2 p-1 rounded"
          id="staffpassword"
          placeholder="Set a new password"
        />
        <div className="flex justify-between">
          <button
            type="reset"
            onClick={() => {
              showAddStaff(false);
            }}
            className="bg-rose-500 hover:bg-rose-800 rounded transition-all px-5 py-1 text-white mt-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-800 rounded transition-all px-5 py-1 text-white mt-2"
          >
            Save account
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddStaff;
