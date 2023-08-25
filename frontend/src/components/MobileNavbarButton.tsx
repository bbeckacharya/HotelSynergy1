interface mobileNavbarButtonProps {
  currentMenu: string;
  text: string;
  icon: React.ReactElement;
  action: () => void;
}
function MobileNavbarButton({
  currentMenu,
  text,
  icon,
  action,
}: mobileNavbarButtonProps) {
  const inactiveClass =
    "flex flex-col w-1/4 text-center items-center justify-center";
  const activeClass =
    "flex flex-col w-1/4 text-center items-center font-bold justify-center text-indigo-500";
  return (
    <button
      onClick={action}
      className={currentMenu === text ? activeClass : inactiveClass}
    >
      <span className="text-xl">{icon}</span>
      <h1>{text}</h1>
    </button>
  );
}

export default MobileNavbarButton;
