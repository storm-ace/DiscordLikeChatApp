import { FaMessage } from "react-icons/fa6";
import { FaFolder  } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";

const SideBar = () => {
    return (
        <div className="top-0 left-0 h-screen w-16 m-0
        flex flex-col shadow-lg bg-gray-900 text-white">
            <SideBarIcon icon={<FaMessage size="28"/>} text="Direct Messages"/>
            <hr className="h-px my-1 bg-gray-200 dark:bg-gray-700 w-8 self-center"/>
            <SideBarIcon icon={<FaFolder size={32}/>} text="Serves in folder"/>
            <SideBarIcon icon={"S"}/>
            <SideBarIcon icon={<BsPlus size={32}/>} text="Add A New Server"/>
        </div>
    );
};

const SideBarIcon = ({icon, text = "Server 💡"}) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default SideBar;