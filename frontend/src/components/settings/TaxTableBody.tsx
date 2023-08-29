import { MdDelete, MdEdit } from "react-icons/md";
import { taxListType } from "../../types/settings.types";

function TaxTableBody({ name, value }: taxListType) {
  return (
    <tr>
      <td className="border-2 px-4">{name}</td>
      <td className="border-2 px-4">{value}%</td>
      <td className="border-2 bg-indigo-500 rounded transition-all hover:bg-indigo-800 ">
        <button className="w-full flex justify-center p-2 text-white h-full">
          <MdEdit />
        </button>
      </td>
      <td className="border-2 bg-rose-500 rounded hover:bg-rose-800 transition-all">
        <button className="w-full text-white flex justify-center h-full">
          <MdDelete />
        </button>
      </td>
    </tr>
  );
}

export default TaxTableBody;
