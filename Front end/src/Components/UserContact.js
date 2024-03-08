import logo from "../logo.svg";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const UserContact = () => {
    const [isHovered, setIsHovered] = useState(false);

    const username = localStorage.getItem("authenticated").username;

    return (
        <div 
            className="rounded m-3 cursor-pointer hover:bg-slate-500 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-center p-2">
                <div className="inline-flex items-center">
                    <img src={logo} alt="" width={62} />
                    <span className="text-gray-600 text-1xl ml-2">{username}</span>
                </div>
                <div className={`absolute right-0 ${isHovered ? 'visible' : 'invisible'}`}>
                    <IoMdClose className="hover:text-gray-200"/>
                </div>
            </div>
        </div>
    );
}

export default UserContact;