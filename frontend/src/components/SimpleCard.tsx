interface simpleCardProps {
  title: string;
  number: string | number;
}

function SimpleCard({ title, number }: simpleCardProps) {
  const varient = Math.ceil(Math.random() * 5);
  const getStyle = (number: number) => {
    switch (number) {
      case 1:
        return "border-2 p-2 md:p-5 rounded bg-slate-600 text-white border-green-100 w-1/2 md:w-1/4 md:min-w-[300px] rounded-xl";
      case 2:
        return "border-2 p-2 md:p-5 rounded bg-purple-600 text-white border-green-100 w-1/2 md:w-1/4 md:min-w-[300px] rounded-xl";

      case 3:
        return "border-2 p-2 md:p-5 rounded bg-pink-500 text-white border-green-100 w-1/2 md:w-1/4 md:min-w-[300px] rounded-xl";

      case 4:
        return "border-2 p-2 md:p-5 rounded bg-rose-500 text-white border-green-100 w-1/2 md:w-1/4 md:min-w-[300px] rounded-xl";

      case 5:
        return "border-2 p-2 md:p-5 rounded bg-green-500 text-white border-green-100 w-1/2 md:w-1/4 md:min-w-[300px] rounded-xl";

      default:
        return "border-2 p-2 md:p-5 rounded bg-rose-500 text-white border-green-100 w-1/2 md:w-1/4 md:min-w-[300px] rounded-xl";
    }
  };

  return (
    <div className={getStyle(varient)}>
      <h1>{title}</h1>
      <h1 className="font-bold text-3xl">{number}</h1>
    </div>
  );
}

export default SimpleCard;
