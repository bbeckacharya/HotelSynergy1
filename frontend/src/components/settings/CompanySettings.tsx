import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CompanyDataType } from "../../types/settings.types";
import { toast } from "react-toastify";
import Loading from "../Loading";

interface companySettingsType {
  companySettingsData: CompanyDataType;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}

function CompanySettings({
  companySettingsData,
  setUpdateSettings,
}: companySettingsType) {
  const [loading, setLoading] = useState(false);
  const [currentCompanySettings, setCurrentCompanySettings] =
    useState<CompanyDataType>({
      name: "",
      address: "",
      phoneOne: "",
      phoneTwo: "",
      website: "",
    });

  const updateCompanySettings = async () => {
    try {
      const updateCompanyRequest = await fetch(
        import.meta.env.VITE_SERVER_URL + "admin/update-company",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentCompanySettings),
        }
      );
      if (updateCompanyRequest.status === 200) {
        setLoading(false);
        toast.success("Company Information updated successfully.");
        return setUpdateSettings(true);
      }
      if (updateCompanyRequest.status === 400) {
        setLoading(false);
        return toast.error("Please check all the information provided.");
      }
      if (updateCompanyRequest.status === 404) {
        setLoading(false);
        return toast.error("Sorry, the company was not found.");
      }
      if (updateCompanyRequest.status === 500) {
        setLoading(false);
        return toast.error(
          "An internal server error occoured, please try againg later."
        );
      }
    } catch (error) {
      setLoading(false);
      return toast.error(
        "An unknown error occoured while updating the company setting."
      );
    }
  };

  useEffect(() => {
    setCurrentCompanySettings({ ...companySettingsData });
  }, [companySettingsData]);

  return (
    <section className="flex flex-col w-full">
      {loading && <Loading />}
      <h1 className="text-xl mt-4">Company Settings</h1>
      <span className="text-sm text-gray-500">
        View and change company related settings.
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          updateCompanySettings();
        }}
        className="mt-2"
      >
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
