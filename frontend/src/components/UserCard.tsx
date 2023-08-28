interface userCardProps {
  name: string;
  role: string;
  image: string;
  editPassword: () => void;
  deleteUser: () => void;
}
function UserCard({
  name,
  role,
  image,
  editPassword,
  deleteUser,
}: userCardProps) {
  return (
    <div className="my-2 border-2 border-indigo-300 bg-indigo-200 rounded flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <img
          src={image}
          className="w-[60px] border-2 rounded-full m-2"
          alt="User image"
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">{name}</h1>
          <h1>{role}</h1>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-start mx-2">
        <button
          onClick={deleteUser}
          className="bg-rose-500 text-white hover:bg-rose-800 transition-all px-5 py-1 rounded"
        >
          Delete Account
        </button>
        <button
          onClick={editPassword}
          className="bg-indigo-500 text-white hover:bg-indigo-800 transition-all px-5 py-1 rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default UserCard;
