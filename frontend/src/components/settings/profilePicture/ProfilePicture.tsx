import { useState } from "react";
// import { MdDelete } from "react-icons/md";
import ImageUploadForm from "./UploadForm";

interface ProfilePictureProps {
  image: string;
}

function ProfilePicture({ image }: ProfilePictureProps) {
  const [showUploadForm, setShowUploadForm] = useState(false);
  return (
    <section className="w-full">
      {showUploadForm && <ImageUploadForm showForm={setShowUploadForm} />}
      <h1 className="text-xl">Profile Picture</h1>
      <div className="flex items-center justify-start gap-4 mt-1 border-2 p-2 bg-slate-100 rounded">
        <img
          src={image || "/user.png"}
          alt="Profile picture"
          className="w-16 border-2 border-gray-300 rounded-full"
        />
        <div>
          <div className="flex items-center justify-start gap-3">
            <button
              onClick={() => setShowUploadForm(true)}
              className="border-2 bg-slate-600 px-4 py-1 rounded-md text-white hover:text-white hover:bg-slate-800 transition-all"
            >
              Update Profile Picture
            </button>
            {/* <button className="text-xl hover:bg-slate-600 p-1 rounded transition-all hover:text-white">
              <MdDelete />
            </button> */}
          </div>
          <h1 className="text-sm text-gray-500 mx-1">
            Image must be JPG, PNG, GIF or any other image format and must be
            less than 5MB.
          </h1>
        </div>
      </div>
    </section>
  );
}

export default ProfilePicture;
