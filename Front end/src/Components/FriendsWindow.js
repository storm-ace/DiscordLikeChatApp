import { FaUserFriends } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const FriendsWindow = () => {
    const [isErrorVisible, setIsErrorVisible] = useState("hidden");
    const [iserrorText, setIsErrorText] = useState("User was not found");
    const [friendName, setIsFriendName] = useState();
    const [friendRequestCounter, SetFriendRequestCounter] = useState('');

    const user = JSON.parse(localStorage.getItem("authenticated"))[0];

    const friendRequests = [];

    const closeError = () => {
        setIsErrorVisible("hidden");
    }

    const SendFriendRequest = async () => {
        if (friendName === undefined) {
            setIsErrorVisible("visible");
            setIsErrorText("Field cannot be empty.");
            return;
        }

        const response = await fetch("https://localhost:7029/api/Friends/SendFriendRequest", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Token: user.token,
                friendName
            }),
        });

        try {
            const data = await response.json();

            if (response.ok) {
                document.getElementById("friendInputField").value = "";
                SetFriendRequestCounter(data.friendRequests);
            } else {
                setIsErrorVisible("visible");
                setIsErrorText(data || "An error occurred during the friend request.");
            }
        } catch (error) {
            console.error('Error parsing JSON response:', error);
            setIsErrorVisible("visible");
            setIsErrorText("An unexpected error occurred.");
        }
    }

    const updateInput = (value) => {
        setIsFriendName(value);

        if (isErrorVisible === "visible") {
            setIsErrorVisible("hidden");
        }
    }

    return (
        <div className="text-white min-w-1 w-screen flex">
            <div className="flex flex-col h-screen bg-gray-900 p-4 w-[75%]">
                <div className="my-3.5">
                    <div className="grid mx-5 gap-1 text-sm">
                        <div className="flex items-center">
                            <FaUserFriends size={32} />
                            <span className="ml-2">Friends</span>
                            <div className="border-r border-gray-700 mx-2 h-4"></div>
                            <Button styling="p-1 text-gray-400" text={"Online"} />
                            <Button styling="p-1 text-gray-400" text={"All"} />
                            <Button styling="p-1 text-gray-400" text={`In Request ${friendRequestCounter.length > 0 ? friendRequestCounter.length : ''}`} />
                            <Button styling="p-1 text-gray-400" text={"Blocked"} />
                            <Button styling="p-1 rounded-sm text-white bg-green-700 font-bold" text={"Add A Friend"} />
                        </div>

                        <div className="my-5">
                            <p className="font-bold">Add friend</p>
                            <p className="text-gray-600">You can add friends by using their name and tag example <span className="text-yellow-500">user#0000</span></p>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="user#0000"
                                    className="my-3 bg-slate-950 px-1 rounded-md p-3 w-full"
                                    id="friendInputField"
                                    onChange={(e) => updateInput(e.target.value)}
                                />
                                <button
                                    disabled={false} className="absolute right-3 transform -translate-y-1/10 bg-blue-500 text-white px-4 py-1 rounded-md"
                                    onClick={SendFriendRequest}
                                >
                                    Send Friend Request
                                </button>
                            </div>
                            <div className={`error-panel ${isErrorVisible} w-56`}>
                                <p>{iserrorText}</p>
                                <button onClick={closeError}><IoClose className="relative text-black cursor-pointer m-1" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-4 flex flex-col flex-grow">
                <p className="text-white text-lg font-bold mb-4">Active Online Users</p>
                {/* Add list of active online users */}
            </div>
        </div>
    );
}

export default FriendsWindow;