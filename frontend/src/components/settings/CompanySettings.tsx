import { useEffect, useState } from "react";
import { CompanyDataType } from "../../types/settings.types";

interface companySettingsType {
  companySettingsData: CompanyDataType;
}

function CompanySettings({ companySettingsData }: companySettingsType) {
  const [currentCompanySettings, setCurrentCompanySettings] =
    useState<CompanyDataType>({
      name: "",
      address: "",
      phoneOne: "",
      phoneTwo: "",
      website: "",
    });

  useEffect(() => {
    setCurrentCompanySettings({ ...companySettingsData });
  }, [companySettingsData]);

  return (
    <section className="flex flex-col w-full">
      <h1 className="text-xl mt-4">Company Settings</h1>
      <span className="text-sm text-gray-500">
        View and change company related settings.
      </span>
      <form className="mt-2">
        <fieldset className="border-2 p-4 pt-5 rounded-tr-xl rounded-tl-xl flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800 w-1/5">Name</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              value={currentCompanySettings.name}
              onChange={(e) =>
                setCurrentCompanySettings({
                  ...currentCompanySettings,
                  name: e.target.value,
                })
              }
              type="text"
              className="p-1 border-2 rounded-md"
            />
          </div>
        </fieldset>
        <fieldset className=" border-2 p-4 flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800 w-1/5">Address</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              type="text"
              value={currentCompanySettings.address}
              onChange={(e) =>
                setCurrentCompanySettings({
                  ...currentCompanySettings,
                  address: e.target.value,
                })
              }
              className="p-1 border-2 rounded-md"
            />
          </div>
        </fieldset>
        <fieldset className=" border-2 p-4 flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800 w-1/5">Website</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              value={currentCompanySettings.website}
              onChange={(e) =>
                setCurrentCompanySettings({
                  ...currentCompanySettings,
                  website: e.target.value,
                })
              }
              type="text"
              className="p-1 border-2 rounded-md"
            />
          </div>
        </fieldset>
        <fieldset className=" border-2 p-4 flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800 w-1/5">Phone #1</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              type="number"
              min={0}
              value={currentCompanySettings.phoneOne}
              onChange={(e) =>
                setCurrentCompanySettings({
                  ...currentCompanySettings,
                  phoneOne: e.target.value,
                })
              }
              className="p-1 border-2 rounded-md"
            />
          </div>
        </fieldset>
        <fieldset className=" border-2 p-4 flex justify-start gap-7 border-b-0">
          <h1 className="mt-1 text-gray-800 w-1/5">Phone #2</h1>
          <div className="flex flex-col justify-end w-2/3">
            <input
              type="number"
              min={0}
              value={currentCompanySettings.phoneTwo}
              onChange={(e) =>
                setCurrentCompanySettings({
                  ...currentCompanySettings,
                  phoneTwo: e.target.value,
                })
              }
              className="p-1 border-2 rounded-md"
            />
          </div>
        </fieldset>
        <fieldset className="rounded-bl-xl rounded-br-xl bg-slate-100 border-t-0 border-2 p-4 flex justify-end ">
          <button
            className="bg-indigo-500 px-10 py-1 rounded hover:bg-indigo-800 text-white transition-all"
            type="submit"
          >
            Save Changes
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default CompanySettings;
