import logo from "../logo.svg";
import { IoMdClose } from "react-icons/io";

const UserContact = () => {
    return (
        <div className="bg-slate-500 rounded m-2">
            <div className="flex justify-between items-center p-2">
                <div className="inline-flex items-center">
                    <img src={logo} alt="" width={62} />
                    <span className="text-gray-700 text-1xl ml-2">User name</span>
                </div>
                <button >
                    <IoMdClose />
                </button>
            </div>
        </div>
    );
}

export default UserContact;