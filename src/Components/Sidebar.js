import { FaMessage } from "react-icons/fa6";
import { FaFolder } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import ControlBar from "./ControlBar.js"
import LeftChatBar from "./LeftChatBar.js"

const SideBar = () => {
    return (
        <div className="flex">
            <div className="flex flex-col shadow-lg bg-gray-900 text-white h-screen w-16">
                <SideBarIcon icon={<FaMessage size="28" />} text="Direct Messages" />
                <hr className="h-px my-1 bg-gray-200 dark:bg-gray-700 w-8 self-center" />
                <SideBarIcon icon={<FaFolder size={32} />} text="Serves in folder" />
                <SideBarIcon icon={"S"} />
                <SideBarIcon icon={<BsPlus size={32} />} text="Add A New Server" />
            </div>
            <div className="flex flex-col h-screen">
                <div className="flex-grow">
                    <LeftChatBar />
                </div>
                <ControlBar />
            </div>
        </div>
    );
};

const SideBarIcon = ({ icon, text = "Server 💡" }) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

export default SideBar;