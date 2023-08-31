import { MdDelete, MdEdit } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";
import EditTax from "./tax/EditTax";
import Loading from "../Loading";
import DeleteTax from "./tax/DeleteTax";

interface taxtableBodyProps {
  name: string;
  value: string;
  _id: string;
  setUpdateSettings: Dispatch<SetStateAction<boolean>>;
}

function TaxTableBody({
  name,
  value,
  _id,
  setUpdateSettings,
}: taxtableBodyProps) {
  const [showEditBox, setShowEditbox] = useState(false);
  const [showDeleteTax, setShowDeleteTax] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {showDeleteTax && (
        <DeleteTax
          setUpdateSettings={setUpdateSettings}
          _id={_id}
          loader={setLoading}
          showDeleteTax={setShowDeleteTax}
        />
      )}
      {showEditBox && (
        <EditTax
          setUpdateSettings={setUpdateSettings}
          loader={setLoading}
          showEditBox={setShowEditbox}
          taxName={name}
          taxValue={value}
          id={_id}
        />
      )}
      {loading && <Loading />}
      <tr>
        <td className="border-2 px-4">{name}</td>
        <td className="border-2 px-4">{value}%</td>
        <td className="border-2 bg-indigo-500 rounded transition-all hover:bg-indigo-800 ">
          <button
            onClick={() => {
              setShowEditbox(true);
            }}
            className="w-full flex justify-center p-2 text-white h-full"
          >
            <MdEdit />
          </button>
        </td>
        <td className="border-2 bg-rose-500 rounded hover:bg-rose-800 transition-all">
          <button
            onClick={() => {
              setShowDeleteTax(true);
            }}
            className="w-full text-white flex justify-center h-full"
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    </>
  );
}

export default TaxTableBody;
