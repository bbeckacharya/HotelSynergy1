import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <img src="/logo.png" alt="Application Logo" />
      <h1 className="mt-5 font-bold text-3xl">
        Hotel & Restaurant Management System
      </h1>
      <button
        className="mt-5 text-white px-5 py-1 bg-green-500 hover:bg-green-700 rounded transition-all"
        onClick={() => {
          navigate("/login");
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Homepage;
