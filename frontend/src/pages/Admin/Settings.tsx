import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProfilePicture from "../../components/settings/profilePicture/ProfilePicture";
import ProfileSettings from "../../components/settings/ProfileSettings";
import TaxSettings from "../../components/settings/TaxSettings";
import CompanySettings from "../../components/settings/CompanySettings";
import Loading from "../../components/Loading";
import {
  CompanyDataType,
  taxListType,
  userSettingType,
} from "../../types/settings.types";
import { toast } from "react-toastify";
import { NavigateFunction, useNavigate } from "react-router-dom";
import AddNewTax from "../../components/settings/tax/AddTax";

function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [updateSettings, setUpdateSettings] = useState(false);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [addBox, setAddBox] = useState(false);
  const [userSetting, setUserSetting] = useState<userSettingType>({
    username: "",
    name: "",
    role: "",
    password: "",
  });
  const [taxList, setTaxList] = useState<taxListType[]>([
    {
      name: "VAT",
      value: "13.0",
      _id: "2",
    },
    {
      name: "VAT2",
      value: "13.0",
      _id: "",
    },
  ]);
  const [companyData, setCompanyData] = useState<CompanyDataType>({
    name: "",
    address: "",
    phoneOne: "",
    phoneTwo: "",
    website: "",
  });

  //for refetching the data
  useEffect(() => {
    if (updateSettings) {
      setProfileImage("/user.png");
      getAllData(setLoading, navigate, setUpdateSettings).then((data) => {
        setUserSetting(data.user);
        setCompanyData(data.company);
        setProfileImage(data.image);
        setTaxList(data.tax);
        setLoading(false);
      });
    } else {
      //do nothing
    }
  }, [navigate, updateSettings]);

  useEffect(() => {
    document.title = "Settings - HRMS";
    getAllData(setLoading, navigate).then((data) => {
      setUserSetting(data.user);
      setCompanyData(data.company);
      setProfileImage(data.image);
      setTaxList(data.tax);
      setLoading(false);
    });
  }, [navigate]);

  return (
    <section className="w-full flex justify-center">
      {loading && <Loading />}
      {addBox && (
        <AddNewTax
          setUpdateSettings={setUpdateSettings}
          loader={setLoading}
          showAddBox={setAddBox}
        />
      )}
      <div className="w-full md:w-2/3 ">
        <section className="w-full p-4">
          <ProfilePicture image={profileImage} />
          <ProfileSettings
            setUpdateSettings={setUpdateSettings}
            userSettings={userSetting}
          />
          <TaxSettings
            showAddTax={setAddBox}
            setUpdateSettings={setUpdateSettings}
            taxSettings={taxList}
          />
          <CompanySettings
            setUpdateSettings={setUpdateSettings}
            companySettingsData={companyData}
          />
        </section>
      </div>
    </section>
  );
}
const getAllData = async (
  setLoading: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction,
  setUpdateSettings?: Dispatch<SetStateAction<boolean>>
) => {
  try {
    if (setUpdateSettings) {
      setUpdateSettings(false); //setting state variables
    }
    setLoading(true);
    const user = await JSON.parse(localStorage.getItem("authdata") || "");
    if (!user.username) {
      localStorage.clear();
      navigate("/login");
      return toast.error("User needs to login to access the page.");
    }
    const settingsDataRequest = await fetch(
      import.meta.env.VITE_SERVER_URL + "admin/settings",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username: user.username }),
      }
    );
    if (settingsDataRequest.status === 200) {
      const data = await settingsDataRequest.json();
      setLoading(false);
      return data;
    }
    if (settingsDataRequest.status === 401) {
      setLoading(false);
      return toast.error("You can not access admin settings");
    }
    if (settingsDataRequest.status === 500) {
      setLoading(false);
      return toast.error("Unknown server error, please try again later.");
    }
    setLoading(false);
  } catch (err) {
    setLoading(false);
    return toast.error("Unknown error occoured, try refreshing the page.");
  }
};
export default AdminSettings;
