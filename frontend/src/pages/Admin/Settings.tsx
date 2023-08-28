import { useEffect } from "react";
import ProfilePicture from "../../components/settings/ProfilePicture";
import ProfileSettings from "../../components/settings/ProfileSettings";
import TaxSettings from "../../components/settings/TaxSettings";
import CompanySettings from "../../components/settings/CompanySettings";

function AdminSettings() {
  useEffect(() => {
    document.title = "Settings - HRMS";
  }, []);
  return (
    <section className="p-4">
      <ProfilePicture />
      <ProfileSettings />
      <TaxSettings />
      <CompanySettings />
    </section>
  );
}

export default AdminSettings;
