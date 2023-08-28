function AdminRestaurant() {
  const buttonClass =
    "bg-slate-200 hover:bg-slate-300 transition-all border-2 border-slate-200 px-5 py-1 rounded text-black";
  return (
    <section className="p-4">
      <div>
        <h1 className="font-bold">Quick Actions</h1>
        <div className="border-2 gap-3 bg-indigo-200 p-1 rounded mt-1 flex items-center justify-start">
          <button className={buttonClass}>Overview</button>
          <button className={buttonClass}>Add Menu</button>
          <button className={buttonClass}>View Menu</button>
          <button className={buttonClass}>Add Table</button>
        </div>
      </div>
      <div>
        <h1 className="font-bold mt-4">Tables Overview</h1>
        <div>{/* {TODO: Add the table card and required operations.} */}</div>
      </div>
    </section>
  );
}

export default AdminRestaurant;
