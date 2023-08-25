function AdminHotel() {
  return (
    <section className="p-4 w-screen flex items-start justify-start flex-wrap">
      <div className="p-2 rounded bg-indigo-500 w-full md:w-1/2 xl:w-1/3">
        <h1 className="font-bold text-3xl text-white">Overview</h1>
        <p className="w-full p-2 my-2 rounded bg-slate-200 border-2 flex justify-between items-center">
          Total Rooms: <span className="text-3xl">0</span>
        </p>
        <p className="w-full p-2 my-2 rounded bg-slate-200 border-2 flex justify-between items-center">
          Total Guests: <span className="text-3xl">0</span>
        </p>
        <p className="w-full p-2 my-2 rounded bg-slate-200 border-2 flex justify-between items-center">
          Free Rooms: <span className="text-3xl">0</span>
        </p>
        <p className="w-full p-2 my-2 rounded bg-slate-200 border-2 flex justify-between items-center">
          Rooms to clean: <span className="text-3xl">0</span>
        </p>
      </div>
    </section>
  );
}

export default AdminHotel;
