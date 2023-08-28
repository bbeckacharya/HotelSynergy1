interface UserActivityCardProps {
  user: string;
  action: string;
  dateandtime: string;
  performedby: string;
}

function UserActivityCard({
  user,
  action,
  dateandtime,
  performedby,
}: UserActivityCardProps) {
  return (
    <div className="border-2 p-2">
      <h1 className="flex items-center gap-1">
        <span className="font-bold">{user}</span>
        <span className="text-indigo-500">{action}</span> on
        <span>{dateandtime}</span> by{" "}
        <span className="font-bold">{performedby}</span>
      </h1>
    </div>
  );
}

export default UserActivityCard;
