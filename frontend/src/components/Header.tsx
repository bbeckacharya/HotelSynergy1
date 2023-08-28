import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-slate-600 items-center h-[60px] p-2 text-white hidden md:flex justify-between border-b-2  border-gray-900">
      <div>
        <h1 className="font-bold text-xl">
          Hotel & Restaurant Management System
        </h1>
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.clear();
            return navigate("/login");
          }}
          className="text-white bg-rose-500 px-4 py-1 rounded-md shadow-xl hover:bg-rose-700 transition-all"
        >
          Log out
        </button>
      </div>
    </header>
  );
}

export default Header;
