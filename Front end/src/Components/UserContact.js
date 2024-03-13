import logo from "../logo.svg";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";

const UserContact = ({ key, username, state, setWindow }) => {
    const [isHovered, setIsHovered] = useState(false);

    const onlineColor = {
        Online: "text-green-500",
        Away: "text-yellow-500",
        Offline: "text-gray-500"
    };

    return (
        <div
            className="rounded-md m-3 cursor-pointer border-gray-200 border-opacity-30 hover:bg-gray-900 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setWindow("chat")}
        >
            <div className="flex justify-between items-center p-2 relative">
                <div className="inline-flex items-center relative">
                    <img src={logo} alt="" width={62} />
                    <span className="text-gray-600 text-1xl ml-2">{username}</span>
                    <FaCircle
                        className={`hover:text-gray-200 absolute bottom-0 right-11 m-1 ${onlineColor[state]}`}
                        size={12}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserContact;