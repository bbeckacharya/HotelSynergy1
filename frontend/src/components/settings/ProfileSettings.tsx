import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { userSettingType } from "../../types/settings.types";
import { toast } from "react-toastify";
import Loading from "../Loading";

interface userSettingsProps {
  userSettings: userSettingType;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}

function ProfileSettings({
  userSettings,
  setUpdateSettings,
}: userSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [currentSetting, setCurrentSetting] = useState<userSettingType>({
    name: "",
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    setCurrentSetting({ ...userSettings });
  }, [userSettings]);

  const updateUserProfile = async () => {
    setLoading(true);
    const updateProfileRequest = await fetch(
      import.meta.env.VITE_SERVER_URL + "admin/update-profile",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentSetting),
      }
    );
    if (updateProfileRequest.status === 200) {
      toast.success("User settings updated successfully.");
      setLoading(false);
      return setUpdateSettings(true);
    }
    if (!updateProfileRequest.ok) {
      setLoading(false);
      return toast.error("Unable to save changes");
    }
  };

  return (
    <section className="mt-4 w-full">
      {loading && <Loading />}
      <h1 className="text-xl">Profile Settings</h1>
      <p className="text-gray-500 text-sm">Here's your account details</p>
      <form
        className="mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          updateUserProfile();
        }}
      >
        <fieldset className=" rounded-tr-xl rounded-tl-xl border-2 p-4 pt-5 border-b-0 flex justify-start gap-4">
          <h1 className="mt-1 text-gray-800">Username</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              autoComplete="username"
              type="text"
              value={currentSetting.username}
              disabled
              className="border-2 p-1 rounded-md "
            />
            <span className="text-sm text-gray-400">
              You may not change your username
            </span>
          </div>
        </fieldset>
        <fieldset className="  border-2 p-4  border-b-0 flex justify-start gap-4">
          <h1 className="mt-1 text-gray-800">Full name</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              value={currentSetting.name}
              autoComplete="name"
              onChange={(e) =>
                setCurrentSetting({ ...currentSetting, name: e.target.value })
              }
              type="text"
              className="border-2 p-1 rounded-md "
            />
            <span className="text-sm text-gray-400">
              Please enter your correct full name.
            </span>
          </div>
        </fieldset>
        <fieldset className=" border-2 p-4 flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800">Job role</h1>
          <div className="flex flex-col justify-end w-2/3">
            <select
              disabled
              defaultValue={currentSetting.role}
              className="p-2 rounded"
              name="role"
              id="role"
            >
              <option value="admin">Administrator</option>
            </select>
            <span className="text-sm text-gray-400">
              Admin can not change their roles here.
            </span>
          </div>
        </fieldset>
        <fieldset className=" border-2 border-b-0 p-4 flex justify-start gap-4">
          <h1 className="mt-1 text-gray-800">Password</h1>
          <div className="flex flex-col w-2/3 justify-end">
            <input
              type="password"
              autoComplete="new-password"
              value={currentSetting.password}
              onChange={(e) =>
                setCurrentSetting({
                  ...currentSetting,
                  password: e.target.value,
                })
              }
              className="border-2 p-1 rounded-md "
            />
            <span className="text-sm text-gray-400">
              Leave empty to not change.
            </span>
          </div>
        </fieldset>
        <fieldset className="rounded-bl-xl rounded-br-xl bg-slate-100 border-t-0 border-2 p-4 flex justify-end ">
          <button
            className="bg-indigo-500 px-10 py-1 rounded hover:bg-indigo-800 text-white transition-all"
            type="submit"
          >
            Save Changes
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default ProfileSettings;
