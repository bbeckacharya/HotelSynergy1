import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface deleteTaxProps {
  _id: string;
  showDeleteTax: Dispatch<SetStateAction<boolean>>;
  loader: Dispatch<SetStateAction<boolean>>;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}
function DeleteTax({
  showDeleteTax,
  _id,
  loader,
  setUpdateSettings,
}: deleteTaxProps) {
  const [taxId, setTaxId] = useState("");
  useEffect(() => {
    setTaxId(_id);
  }, [_id]);

  const deleteTax = async () => {
    loader(true);
    const deleteTaxRequest = await fetch(
      import.meta.env.VITE_SERVER_URL + "admin/delete-tax",
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: taxId }),
      }
    );
    if (deleteTaxRequest.status === 200) {
      toast.success("The tax was deleted successfully.");
      showDeleteTax(false);
      loader(false);
      return setUpdateSettings(true);
    }
    if (deleteTaxRequest.status === 400) {
      loader(false);
      return toast.error("The tax ID was not found.");
    }
    if (deleteTaxRequest.status === 404) {
      loader(false);
      return toast.error("The tax was not found to delete.");
    }
  };
  return (
    <section className="absolute left-0 top-0 w-screen h-screen z-40 bg-black bg-opacity-60 flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteTax();
        }}
        className="w-fit h-fit mt-12 bg-white rounded p-4 border-2"
      >
        <h1 className="font-bold mb-1 text-xl">Delete Tax</h1>
        <p className="mb-2 text-md text-gray-500">
          Are you sure that you want to delete this tax?
        </p>
        <div className="w-full flex justify-between">
          <button
            type="reset"
            onClick={() => {
              showDeleteTax(false);
            }}
            className="bg-slate-500 text-white hover:bg-slate-800 transition-all rounded px-5 py-1"
          >
            Cancel
          </button>
          <button className="bg-rose-500 text-white hover:bg-rose-800 transition-all rounded px-5 py-1">
            Delete
          </button>
        </div>
      </form>
    </section>
  );
}

export default DeleteTax;
