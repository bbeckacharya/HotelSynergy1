import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Loading from "../../Loading";
import { toast } from "react-toastify";
interface uploadformprops {
  showForm: Dispatch<SetStateAction<boolean>>;
}
function ImageUploadForm({ showForm }: uploadformprops) {
  const [userId, setUserId] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const localdata = localStorage.getItem("authdata");
    if (localdata) {
      const data = JSON.parse(localdata);
      setUserId(data.id);
    }
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", userId);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_SERVER_URL + "admin/picture",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setLoading(false);
        toast.success("Image uploaded successfully");
        return showForm(false);
      } else {
        setLoading(false);
        toast.error("Can not upload profile image");
        return showForm(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("An unknown error occoured, please try again later.");
      return showForm(false);
    }
  };

  return (
    <section className="top-0 left-0 absolute z-50 w-screen h-screen bg-black bg-opacity-60 flex justify-center">
      {loading && <Loading />}
      <div className="bg-white h-fit w-fit p-4 border-2 rounded mt-10">
        <h1 className="font-bold text-2xl mb-2">Image Upload</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            disabled
            id="id"
            name="id"
            value={userId}
            required
          />
          <label htmlFor="image">
            Select an image: <br />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <br />
          <div className="w-full mt-2 flex justify-between">
            <button
              type="reset"
              className="mt-2 bg-rose-500 hover:bg-rose-800 text-white rounded px-5 py-1 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-2 bg-indigo-500 hover:bg-indigo-800 text-white rounded px-5 py-1 transition-all"
            >
              Upload Image
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ImageUploadForm;
