import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface AddNewTaxProps {
  loader: Dispatch<SetStateAction<boolean>>;
  showAddBox: Dispatch<SetStateAction<boolean>>;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}

function AddNewTax({ loader, showAddBox, setUpdateSettings }: AddNewTaxProps) {
  const [taxInfo, setTaxInfo] = useState({
    name: "",
    value: 0,
    _id: "",
  });

  const newTax = async () => {
    loader(true);
    try {
      const newTaxRequest = await fetch(
        import.meta.env.VITE_SERVER_URL + "admin/add-tax",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taxInfo),
        }
      );
      if (newTaxRequest.status === 200) {
        toast.success("The tax have been added successfully.");
        loader(false);
        showAddBox(false);
        return setUpdateSettings(true);
      }
      if (newTaxRequest.status === 500) {
        loader(false);
        return toast.error("There was an unknown error while adding that tax.");
      }
      if (newTaxRequest.status === 400) {
        loader(false);
        return toast.error("Please check the name and value.");
      }
      if (!newTaxRequest.ok) {
        loader(false);
        return toast.error(
          "There was an unknow error while adding the tax information"
        );
      }
    } catch (err) {
      loader(false);
      return toast.error(
        "Sorry, there was an unknown error while updating the tax settings."
      );
    }
  };

  return (
    <section className="bg-black bg-opacity-60 absolute top-0 left-0 flex justify-center w-screen h-screen z-35">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newTax();
        }}
        className="bg-white border-2 w-fit h-fit p-4 mt-10 rounded"
      >
        <h1 className="font-bold text-xl">Add Tax Details</h1>
        <fieldset className="flex gap-2 mt-2 items-center w-full justify-between">
          <label htmlFor="name">Name: </label>
          <input
            value={taxInfo.name}
            onChange={(e) => {
              e.preventDefault();
              setTaxInfo({ ...taxInfo, name: e.target.value });
            }}
            type="text"
            className="p-1 border-2 rounded"
            placeholder="VAT"
            name="name"
            id="name"
          />
        </fieldset>
        <fieldset className="flex my-1 gap-2 items-center w-full justify-between">
          <label htmlFor="value">Value: </label>
          <input
            value={taxInfo.value}
            onChange={(e) =>
              setTaxInfo({ ...taxInfo, value: e.target.valueAsNumber })
            }
            type="number"
            placeholder="13%"
            className="p-1 border-2 rounded"
            name="value"
            id="value"
          />
        </fieldset>
        <div className="flex mt-4 justify-between w-full">
          <button
            type="reset"
            onClick={() => {
              showAddBox(false);
            }}
            className="px-5 py-1 bg-rose-500 text-white hover:bg-rose-800 rounded transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-1 bg-indigo-500 text-white hover:bg-indigo-800 rounded transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddNewTax;
