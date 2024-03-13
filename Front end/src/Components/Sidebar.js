import { Popup } from "reactjs-popup";
import { FaMessage } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import FriendsPanel from "./Friends/FriendsPanel.js"

const SideBar = ({ window }) => {
    const ChangeWindow = () => {
        window("chat")
    }

    return (
        <div className="flex">
            <div className="flex flex-col shadow-lg bg-gray-900 text-white w-16">
                <button onClick={ChangeWindow}><SideBarIcon icon={<FaMessage size="28" />} text="Direct Messages" /></button>
                <hr className="h-px my-1 bg-gray-200 border-gray-600 w-8 self-center" />
                <Popup trigger={<button>
                    <SideBarIcon icon={<BsPlus size={32} />} text="Add A New Server" /></button>}>
                    <div className="w-screen h-screen fixed">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-950 w-96 h-60 outline outline-1">
                            <div className="flex flex-col  items-center h-full rounded-xl">
                                <span className="font-bold text-white text-xl mb-3">Create your server</span>
                                <span className="font-sans text-center text-gray-200 text-sm mb-4">Create a server to chat, relax, or come together with friends.</span>
                                <button className="bg-gray-900 rounded-sm text-white font-bold text-md p-3">Create a server</button>
                                <div className="bg-gray-800 grid w-full bottom-0 fixed items-center justify-center p-3">
                                    <span className="font-bold text-white text-xl mb-2">Do you have an invite?</span>
                                    <button className="bg-gray-900 rounded-sm text-white font-bold text-md p-3">Join a server</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </div>
            
            <FriendsPanel window={window} />
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