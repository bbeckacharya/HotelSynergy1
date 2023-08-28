import { MdDelete, MdEdit } from "react-icons/md";

function TaxSettings() {
  return (
    <section className="flex mt-4 p-2 bg-white flex-col w-full md:w-2/3">
      <div className="flex justify-between items-center w-full pr-2">
        <div>
          <h1 className=" text-xl">Tax Settings</h1>
          <span className="text-sm text-gray-500 -mt-1">
            Configure the tax that are charged on bills.
          </span>
        </div>
        <button className="bg-slate-600 hover:bg-slate-900 text-white px-5 py-1 rounded transition-all">
          Add New Tax
        </button>
      </div>
      <table className="w-full table-auto border-collapse rounded mt-2 border-2">
        <thead>
          <th className="border-2 p-1">Name</th>
          <th className="border-2 p-1">Value</th>
          <th className="border-2 p-1">Edit</th>
          <th className="border-2 p-1">Delete</th>
        </thead>
        <tbody>
          <td className="border-2 px-4">VAT</td>
          <td className="border-2 px-4">13.0 %</td>
          <td className="border-2 bg-indigo-500 rounded transition-all hover:bg-indigo-800 ">
            <button className="w-full flex justify-center p-2 text-white h-full">
              <MdEdit />
            </button>
          </td>
          <td className="border-2 bg-rose-500 rounded hover:bg-rose-800 transition-all">
            <button className="w-full text-white flex justify-center h-full">
              <MdDelete />
            </button>
          </td>
        </tbody>
      </table>
    </section>
  );
}

export default TaxSettings;
