import { taxListType } from "../../types/settings.types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TaxTableBody from "./TaxTableBody";
interface taxProps {
  taxSettings: taxListType[];
  showAddTax: Dispatch<SetStateAction<boolean>>;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}

function TaxSettings({ taxSettings, showAddTax, setUpdateSettings }: taxProps) {
  const [currentTaxSettings, setCurrentTaxSettings] = useState<taxListType[]>(
    []
  );

  useEffect(() => {
    setCurrentTaxSettings(taxSettings);
  }, [taxSettings]);
  return (
    <section className="flex mt-4 p-2 bg-white flex-col w-full">
      <div className="flex justify-between items-center w-full pr-2">
        <div>
          <h1 className=" text-xl">Tax Settings</h1>
          <span className="text-sm text-gray-500 -mt-1">
            Configure the tax that are charged on bills.
          </span>
        </div>
        <button
          onClick={() => {
            showAddTax(true);
          }}
          className="bg-slate-600 hover:bg-slate-900 text-white px-5 py-1 rounded transition-all"
        >
          Add New Tax
        </button>
      </div>
      <table className="w-full table-auto border-collapse rounded mt-2 border-2">
        <thead>
          <tr>
            <th className="border-2 p-1">Name</th>
            <th className="border-2 p-1">Value</th>
            <th className="border-2 p-1">Edit</th>
            <th className="border-2 p-1">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentTaxSettings?.map((tax) => {
            return (
              <TaxTableBody
                setUpdateSettings={setUpdateSettings}
                key={tax._id}
                _id={tax._id}
                name={tax.name}
                value={tax.value}
              />
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default TaxSettings;
