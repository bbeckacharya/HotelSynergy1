import RoomCard from "../../components/RoomCard";

function AdminHotel() {
  return (
    <section className="p-4 w-full">
      <div className="flex w-full   flex-col md:hidden">
        <h1 className="text-2xl font-bold">Overview</h1>
        <div className="w-full">
          <h1 className="flex w-full my-2 items-center rounded px-2 justify-between bg-slate-100 p-2">
            <span>Total Guests :</span>
            <span className="text-3xl">0</span>
          </h1>
          <h1 className="flex w-full my-2 items-center rounded px-2 justify-between bg-slate-100 p-2">
            <span>Rooms Packed :</span>
            <span className="text-3xl">0</span>
          </h1>
          <h1 className="flex w-full my-2 items-center rounded px-2 justify-between bg-slate-100 p-2">
            <span>Avilable Room :</span>
            <span className="text-3xl">0</span>
          </h1>
          <h1 className="flex w-full my-2 items-center rounded px-2 justify-between bg-slate-100 p-2">
            <span>Avilable Guest Capacity :</span>
            <span className="text-3xl">0</span>
          </h1>
          <h1 className="flex w-full my-2 items-center rounded px-2 justify-between bg-slate-100 p-2">
            <span>Room to clean :</span>
            <span className="text-3xl">0</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:hidden border-2 p-2 bg-slate-100">
        <h1 className="font-bold text-2xl">Quick Actions</h1>
        <div className="w-full flex flex-wrap">
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              Add Room
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              Avilable Rooms
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              Booked Rooms
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              Rooms under cleaning
            </button>
          </span>

          <span className="w-full mb-1">
            <button className="w-full py-1 hover:bg-green-800 transition-all rounded bg-green-500 text-white">
              View Rooms Status
            </button>
          </span>
          <span className="w-full">
            <button className="w-full py-1 hover:bg-indigo-800 transition-all rounded bg-indigo-500 text-white">
              View Guest Status
            </button>
          </span>
        </div>
      </div>
      <div className="hidden md:flex flex-col ">
        <h1 className="font-bold">Quick Actions</h1>
        <div className="flex gap-1 flex-wrap border-2 bg-indigo-200 rounded mt-1">
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            Add Room
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            All rooms
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            Avilable Rooms
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            Booked Rooms
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            Rooms under cleaning
          </button>
        </div>
      </div>
      <div className="mt-2 w-full hidden md:flex flex-col">
        <h1 className="font-bold mt-2">Room Overview</h1>
        <div className="flex gap-4 flex-wrap">
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="4"
            roomCost="2000"
            roomnumber="404"
            roomstatus="avilable"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="3"
            roomCost="5000"
            roomnumber="404"
            roomstatus="cleaning"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="3"
            roomCost="5000"
            roomnumber="404"
            roomstatus="booked"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="3"
            roomCost="5000"
            roomnumber="404"
            roomstatus="booked"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="4"
            roomCost="2000"
            roomnumber="404"
            roomstatus="avilable"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="3"
            roomCost="5000"
            roomnumber="404"
            roomstatus="booked"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="4"
            roomCost="2000"
            roomnumber="404"
            roomstatus="avilable"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="3"
            roomCost="5000"
            roomnumber="404"
            roomstatus="booked"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="4"
            roomCost="2000"
            roomnumber="404"
            roomstatus="avilable"
          />
          <RoomCard
            guestList={[{ name: "Hari Acharya" }, { name: "Shyam Adhikari" }]}
            roomId="asdf"
            roomCapacity="3"
            roomCost="5000"
            roomnumber="404"
            roomstatus="booked"
          />
        </div>
      </div>
    </section>
  );
}

export default AdminHotel;
