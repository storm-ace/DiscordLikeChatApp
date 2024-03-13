import { FaUserFriends } from "react-icons/fa";
import Button from "../Button";
import { useState } from "react";
import AddFriend from "./AddFriend";
import FriendsList from "./FriendsList";
import UserContact from "../UserContact";

const FriendsWindow = (window) => {
    const [friendRequestCounter, SetFriendRequestCounter] = useState('');
    const [isWindow, setWindow] = useState("onlineFriends");

    const components = {
        addFriend: <AddFriend SetFriendRequestCounter={SetFriendRequestCounter} />,
        onlineFriends: <FriendsList window={window}/>,
    };

    return (
        <div className="text-white min-w-1 w-screen flex">
            <div className="flex flex-col h-screen bg-gray-900 p-4 w-[75%]">
                <div className="my-3.5">
                    <div className="grid mx-5 gap-1 text-sm">
                        <div className="flex items-center">
                            <FaUserFriends size={32} />
                            <span className="ml-2">Friends</span>
                            <div className="border-r border-gray-700 mx-2 h-4"></div>
                            <Button buttonStyling="rounded m-3 hover:bg-slate-600 relative disabled:bg-blue-950"
                                styling="p-1 text-gray-400" text={"Online"} listener={e => setWindow("onlineFriends")} />
                            <Button buttonStyling="rounded m-3 hover:bg-slate-600 relative disabled:bg-blue-950"
                                styling="p-1 text-gray-400" text={"All"} />
                            <Button buttonStyling="rounded m-3 hover:bg-slate-600 relative disabled:bg-blue-950"
                                styling="p-1 text-gray-400" text={`In Request ${friendRequestCounter.length > 0 ? friendRequestCounter.length : ''}`} />
                            <Button buttonStyling="rounded m-3 hover:bg-slate-600 relative disabled:bg-blue-950"
                                styling="p-1 text-gray-400" text={"Blocked"} />
                            <Button buttonStyling="rounded m-3 relative bg-green-500 disabled:bg-gray-900"
                                styling="p-1 rounded-sm font-bold" text={"Add A Friend"} listener={e => setWindow("addFriend")}
                                isDisabled={isWindow === "addFriend"} />
                        </div>

                        {components[isWindow]}
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-4 flex flex-col flex-grow">
                <p className="text-white text-lg font-bold mb-4">Active Online Users</p>
               {/* TODO: add all friends here and those who active online */}
            </div>
        </div>
    );
}

export default FriendsWindow;