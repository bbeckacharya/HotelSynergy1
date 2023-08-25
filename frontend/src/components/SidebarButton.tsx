interface buttonData {
  currentMenu: string;
  icon: React.ReactElement;
  text: string;
  action: () => void;
}

function SidebarButton({ icon, currentMenu, text, action }: buttonData) {
  const inactiveStyle =
    "w-full border-2 border-gray-500  text-gray-300 w-full hover:bg-slate-500 p-2 rounded-md hover:text-white cursor-pointer flex items-center justify-start gap-1 list-disc text-md my-1 transition-all duration-150";
  const activeStyle =
    "text-black list-disc border-2 cursor-pointer py-2 rounded-md bg-slate-200 px-2 my-1 font-bold flex  transition-all gap-1 justify-start items-center w-full duration-150";
  return (
    <li
      onClick={action}
      className={currentMenu === text ? activeStyle : inactiveStyle}
    >
      <span className="text-xl">{icon}</span>
      <h1>{text}</h1>
    </li>
  );
}

export default SidebarButton;
