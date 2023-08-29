import { useEffect, useState } from "react";
import ProfilePicture from "../../components/settings/ProfilePicture";
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
import { useNavigate } from "react-router-dom";

function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
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

  useEffect(() => {
    document.title = "Settings - HRMS";
    const getAllData = async () => {
      try {
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
          setUserSetting(data.user);
          setCompanyData(data.company);
          setProfileImage(data.image);
          setTaxList(data.tax);
          setLoading(false);
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
    getAllData();
  }, [navigate]);

  return (
    <section className="w-full flex justify-center">
      {loading && <Loading />}
      <div className="w-full md:w-2/3 ">
        <section className="w-full p-4">
          <ProfilePicture image={profileImage} />
          <ProfileSettings userSettings={userSetting} />
          <TaxSettings taxSettings={taxList} />
          <CompanySettings companySettingsData={companyData} />
        </section>
      </div>
    </section>
  );
}

export default AdminSettings;
