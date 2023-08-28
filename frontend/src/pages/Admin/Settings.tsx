import { useEffect } from "react";
import ProfilePicture from "../../components/settings/ProfilePicture";
import ProfileSettings from "../../components/settings/ProfileSettings";

function AdminSettings() {
  useEffect(() => {
    document.title = "Settings - HRMS";
  }, []);
  return (
    <section className="p-4">
      <ProfilePicture />
      <ProfileSettings />
    </section>
  );
}

export default AdminSettings;
