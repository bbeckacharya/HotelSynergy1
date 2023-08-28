function ProfileSettings() {
  return (
    <div className="mt-4">
      <h1 className="text-xl">Profile Settings</h1>
      <p className="text-gray-500 text-md -mt-1">Here's your account details</p>
      <form className="w-2/3 mt-2">
        <fieldset className="rounded  border-2 p-4 border-b-0 flex justify-start gap-4">
          <h1 className="mt-1 text-gray-800">Username</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input type="text" disabled className="border-2 p-1 rounded" />
            <span className="text-sm text-gray-400">
              You may not change your username
            </span>
          </div>
        </fieldset>
        <fieldset className="rounded  border-2 p-4  border-b-0 flex justify-start gap-4">
          <h1 className="mt-1 text-gray-800">Full name</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input type="text" className="border-2 p-1 rounded" />
            <span className="text-sm text-gray-400">
              Full name on your identity card.
            </span>
          </div>
        </fieldset>
        <fieldset className="rounded border-2 p-4 flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800">Job role</h1>
          <div className="flex flex-col justify-end w-2/3">
            <select disabled className="p-2" name="role" id="role">
              <option value="admin">Admin</option>
            </select>
            <span className="text-sm text-gray-400">
              Please contact administrator to change your role.
            </span>
          </div>
        </fieldset>
        <fieldset className="rounded border-2 border-b-0 p-4 flex justify-start gap-4">
          <h1 className="mt-1 text-gray-800">Password</h1>
          <div className="flex flex-col w-2/3 justify-end">
            <input type="text" className="border-2 p-1 rounded" />
            <span className="text-sm text-gray-400">
              Your organization don't have minimum requirements for password.
            </span>
          </div>
        </fieldset>
        <fieldset className="rounded bg-slate-100 border-t-0 border-2 p-4 flex justify-end ">
          <button
            className="bg-indigo-500 px-10 py-1 rounded hover:bg-indigo-800 text-white transition-all"
            type="submit"
          >
            Save Changes
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ProfileSettings;
