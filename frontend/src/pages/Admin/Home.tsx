import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleCard from "../../components/SimpleCard";

function AdminHome() {
  const [currentUser, setCurrentUser] = useState({
    name: "Hari Acharya",
    username: "",
    role: "",
    image: "",
  });
  const [currentData] = useState({
    totalRooms: 4,
    totalTables: 4,
    totalGuests: 0,
    busyTables: 2,
    totalStaff: 2,
    busyRooms: 5,
    revenueToday: "Rs. 1,59,234",
    revenueMonth: 20,
  });
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("authdata") || "");
    if (!localUser) return navigate("/login");
    setCurrentUser(localUser);
  }, [navigate]);
  useEffect(() => {
    window.document.title = "Dashboard - HRMS";
  }, []);
  return (
    <>
      <section className="p-4 w-full">
        <span className="flex text-3xl gap-1">
          Hey,{" "}
          <h1 className="font-bold">
            {currentUser.name.slice(0, currentUser.name.indexOf(" "))}
          </h1>
        </span>
        <span className="text-md text-gray-500">
          Here is a quick overview of your bussiness.
        </span>
        <section className="w-full mt-3 flex flex-wrap justify-start items-center">
          <SimpleCard number={currentData.revenueToday} title="Today Revenue" />
          <SimpleCard
            number={currentData.revenueToday}
            title="Monthly Revenue"
          />
          <SimpleCard number={currentData.totalGuests} title="Total Guests" />

          <SimpleCard number={currentData.busyTables} title="Tables Busy" />
          <SimpleCard number={currentData.busyRooms} title="Packed Rooms" />
          <SimpleCard number={currentData.totalRooms} title="Total Rooms" />
          <SimpleCard number={currentData.totalTables} title="Total Tables" />
          <SimpleCard number={currentData.totalStaff} title="Total Staff" />
        </section>
      </section>
    </>
  );
}

export default AdminHome;
