interface MobileOptionsButtonProps {
  text: string;
  icon: React.ReactElement;
  action: () => void;
}
function MobileOptionsButton({ text, icon, action }: MobileOptionsButtonProps) {
  return (
    <button
      className="flex w-full border-2 my-1 p-2 items-center gap-2 justify-start rounded focus:bg-indigo-200 focus:border-black"
      onClick={action}
    >
      <span className="text-2xl">{icon}</span>
      <h1>{text}</h1>
    </button>
  );
}

export default MobileOptionsButton;
