import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import DeleteUserConfirmation from "../../components/DeleteUserConfirmation";
import ShowChangePassword from "../../components/ShowChangePassword";
import AddStaff from "../../components/AddStaff";
import UserActivityCard from "../../components/UserActivityCard";

interface userType {
  name: string;
  image: string;
  role: string;
  _id: string;
}

interface UserActivity {
  user: string;
  action: string;
  dateandtime: string;
  performedby: string;
}

const getUserList = async (
  setUser: Dispatch<SetStateAction<userType[]>>,
  loader: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  try {
    loader(true);
    const userRequest = await fetch(
      import.meta.env.VITE_SERVER_URL + "auth/users"
    );
    if (userRequest.status === 200) {
      const userdata = await userRequest.json();
      setUser(userdata.users);
      return loader(false);
    }
    if (userRequest.status === 401) {
      toast.error("Authentication Error");
      localStorage.clear();
      loader(false);
      return navigate("/login");
    }
    if (!userRequest.ok) {
      loader(false);
    }
  } catch (err) {
    loader(false);
    return toast.error("There was an unknow error.");
  }
};

const getUserActivity = async (
  setUserActivity: Dispatch<SetStateAction<UserActivity[]>>,
  loader: Dispatch<SetStateAction<boolean>>
) => {
  try {
    loader(true);
    const activityRequest = await fetch(
      import.meta.env.VITE_SERVER_URL + "auth/activity"
    );
    if (activityRequest.status === 200) {
      const data = await activityRequest.json();
      setUserActivity(data.activities);
      loader(false);
    }
    if (activityRequest.status === 401) {
      loader(false);
      return toast.error("You can not view activity status.");
    }
    if (activityRequest.status === 500) {
      loader(false);
      return toast.error(
        "There was an internal server error, please try again later."
      );
    }
    if (activityRequest.status === 404) {
      loader(false);
    }
  } catch (err) {
    loader(false);
    toast.error("An unknown error loading the data.");
  }
};

function StaffManagement() {
  const navigate = useNavigate();
  const buttonClass =
    "bg-slate-200 hover:bg-slate-300 transition-all border-2 border-slate-200 px-5 py-1 rounded text-black";
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [activityList, setActivityList] = useState<UserActivity[]>([]);

  const [userList, setUserList] = useState<userType[]>([]);

  useEffect(() => {
    //for reloading data after new changes on data and/or change of screens
    getUserList(setUserList, setLoading, navigate);
    getUserActivity(setActivityList, setLoading);
  }, [showDelete, showAddStaff, currentScreen, navigate]);

  useEffect(() => {
    document.title = "Staff Management - HRMS";
  }, []);

  const deleteUser = (userId: string) => {
    setSelectedUser(userId);
    setShowDelete(true);
  };
  const editPassword = (userId: string) => {
    setSelectedUser(userId);
    setShowChangePassword(true);
  };

  return (
    <section className="p-4">
      {loading && <Loading />}
      {showDelete && (
        <DeleteUserConfirmation
          userid={selectedUser}
          showDeleteConfirmation={setShowDelete}
        />
      )}
      {showChangePassword && (
        <ShowChangePassword
          showChangePassword={setShowChangePassword}
          userid={selectedUser}
        />
      )}
      {showAddStaff && <AddStaff showAddStaff={setShowAddStaff} />}
      <div>
        <h1 className="font-bold">Quick Actions</h1>
        <div className="border-2 gap-3 bg-indigo-200 p-1 rounded mt-1 flex items-center justify-start">
          <button
            className={buttonClass}
            onClick={() => setCurrentScreen("home")}
          >
            Home
          </button>
          <button
            onClick={() => {
              setShowAddStaff(true);
            }}
            className={buttonClass}
          >
            Add Staff
          </button>
          <button
            onClick={() => setCurrentScreen("activity")}
            className={buttonClass}
          >
            Staff Activity Log
          </button>
          <button
            onClick={() => {
              navigate("/admin/settings");
            }}
            className={buttonClass}
          >
            Account Settings
          </button>
        </div>
      </div>
      {currentScreen === "home" && (
        <div>
          <h1 className="font-bold mt-4">Users Overview</h1>
          <div className="flex flex-col">
            {userList.map((value, indx) => {
              return (
                <UserCard
                  image={value.image}
                  name={value.name}
                  role={value.role}
                  editPassword={() => editPassword(value._id)}
                  deleteUser={() => deleteUser(value._id)}
                  key={indx}
                />
              );
            })}
          </div>
        </div>
      )}
      {currentScreen === "activity" && (
        <div>
          <h1 className="mt-4 font-bold text-md">Users Activity</h1>
          <div className="flex mt-2 flex-col">
            {activityList.map((value) => (
              <UserActivityCard
                action={value.performedby}
                dateandtime={value.dateandtime}
                performedby={value.performedby}
                user={value.user}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default StaffManagement;
