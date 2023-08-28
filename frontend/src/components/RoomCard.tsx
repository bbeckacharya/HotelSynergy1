import { useEffect, useState } from "react";

interface roomCardProps {
  roomnumber: string;
  roomstatus: string;
  roomCapacity: string;
  roomCost: string;
  roomId: string;
  guestList: { name: string }[];
}
function RoomCard({
  roomnumber,
  roomCost,
  roomCapacity,
  roomstatus,
  guestList,
  roomId,
}: roomCardProps) {
  const [roomClass, setRoomClass] = useState("");
  const [, setCurrentRoom] = useState("");
  const buttonClass =
    "bg-indigo-500 hover:bg-indigo-800 w-full px-5 py-1 text-white rounded transition-all";

  useEffect(() => {
    setCurrentRoom(roomId);
    switch (roomstatus) {
      case "avilable":
        setRoomClass(
          "bg-green-500 border-2 border-green-500 text-white w-1/4 p-4  rounded-xl text-white my-2"
        );
        break;

      case "cleaning":
        setRoomClass(
          "bg-yellow-500 border-2 border-yellow-500 text-white w-1/4 p-4  rounded-xl text-white my-2"
        );
        break;
      case "booked":
        setRoomClass(
          "bg-rose-500 border-2 border-rose-500 text-white w-1/4 p-4  rounded-xl text-white my-2"
        );
        break;
      default:
        setRoomClass(
          "bg-rose-500 border-2 border-rose-500 text-white w-1/4 p-4  rounded-xl text-white my-2"
        );
        break;
    }
  }, [roomstatus, roomId]);

  return (
    <div className={roomClass}>
      <h1 className="font-bold text-2xl">Room Number: {roomnumber}</h1>
      {roomstatus === "booked" && (
        <h1>Total Guest In Room: {guestList.length}</h1>
      )}
      {roomstatus === "avilable" && <h1>Room Cost: {roomCost}</h1>}
      {roomstatus === "avilable" && <h1>Room capacity: {roomCapacity}</h1>}
      {roomstatus === "booked" && (
        <ul>
          Guests :
          {guestList.map((value, indx) => {
            return (
              <li className="list-item" key={value.name}>
                {indx + 1}. <span>{value.name}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex flex-wrap mt-2 gap-2">
        {roomstatus === "cleaning" && (
          <h1>Room is being cleaned, complete cleaning to check-in.</h1>
        )}
        {roomstatus === "booked" && (
          <button className={buttonClass}>Check Bill</button>
        )}
        {roomstatus === "booked" && (
          <button className={buttonClass}>New Order</button>
        )}
        {roomstatus === "booked" && (
          <button className={buttonClass}>New Service</button>
        )}
        {roomstatus === "booked" && (
          <button className={buttonClass}>Check-out</button>
        )}
        {roomstatus === "avilable" && (
          <button className={buttonClass}>Check-in</button>
        )}
        {roomstatus === "avilable" && (
          <button className={buttonClass}>Mark Cleaning</button>
        )}
        {roomstatus === "cleaning" && (
          <button className={buttonClass}>Completed Cleaning</button>
        )}
      </div>
    </div>
  );
}

export default RoomCard;
