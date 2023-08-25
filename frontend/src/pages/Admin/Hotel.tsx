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
              Check In
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              Check Out
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              Housekeeping
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              New Order
            </button>
          </span>
          <span className="w-1/2 p-2">
            <button className="w-full py-1 bg-rose-500 text-white rounded">
              New Service
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
            Check In
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            Check Out
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            Housekeeping
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            New Order
          </button>
          <button className="px-5 py-1 m-1 hover:bg-slate-300 transition-all rounded border-2 bg-slate-200">
            New Service
          </button>
        </div>
      </div>
    </section>
  );
}

export default AdminHotel;
