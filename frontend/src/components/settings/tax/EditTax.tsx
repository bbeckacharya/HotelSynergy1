import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface editTaxProps {
  loader: Dispatch<SetStateAction<boolean>>;
  showEditBox: Dispatch<SetStateAction<boolean>>;
  taxName: string;
  taxValue: string | number;
  id: string;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}

function EditTax({
  loader,
  showEditBox,
  taxName,
  taxValue,
  id,
  setUpdateSettings,
}: editTaxProps) {
  const [currentTax, setCurrentTax] = useState({
    name: "",
    value: 0,
    _id: "",
  });

  const updateTaxChange = async () => {
    loader(true);
    try {
      const updateTaxRequest = await fetch(
        import.meta.env.VITE_SERVER_URL + "admin/update-tax",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentTax),
        }
      );
      if (updateTaxRequest.status === 200) {
        loader(false);
        showEditBox(false);
        toast.success("The tax have been updated successfully.");
        return setUpdateSettings(true);
      }
      if (updateTaxRequest.status === 404) {
        loader(false);
        return toast.error("The tax ID was not found on the database.");
      }
      if (updateTaxRequest.status === 500) {
        loader(false);
        return toast.error(
          "There was an unknown error while editing that tax."
        );
      }
      if (updateTaxRequest.status === 400) {
        loader(false);
        return toast.error(
          "New tax information are invalid, please check the name and value."
        );
      }
      if (!updateTaxRequest.ok) {
        loader(false);
        return toast.error(
          "There was an unknow error while updating the tax information"
        );
      }
    } catch (err) {
      loader(false);
      return toast.error(
        "Sorry, there was an unknown error while updating the tax settings."
      );
    }
  };

  useEffect(() => {
    setCurrentTax({ name: taxName, value: Number(taxValue), _id: id });
  }, [taxName, taxValue, id]);

  return (
    <section className="bg-black bg-opacity-60 absolute top-0 left-0 flex justify-center w-screen h-screen z-35">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateTaxChange();
        }}
        className="bg-white border-2 w-fit h-fit p-4 mt-10 rounded"
      >
        <h1 className="font-bold text-xl">Edit Tax Details</h1>
        <fieldset className="flex gap-2 mt-2 items-center w-full justify-between">
          <label htmlFor="name">Name: </label>
          <input
            value={currentTax.name}
            onChange={(e) => {
              e.preventDefault();
              setCurrentTax({ ...currentTax, name: e.target.value });
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
            value={currentTax.value}
            onChange={(e) =>
              setCurrentTax({ ...currentTax, value: e.target.valueAsNumber })
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
              showEditBox(false);
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

export default EditTax;
