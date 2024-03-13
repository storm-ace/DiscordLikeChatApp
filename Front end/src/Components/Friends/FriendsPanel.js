import { useEffect, useState } from "react";
import ControlBar from "../ControlBar.js"
import Button from "../Button.js";
import { IoMdPersonAdd } from "react-icons/io";
import UserContact from "../UserContact.js";

const FriendsPanel = (window) => {
    const [chatBalloons, setChatBalloons] = useState([]);

    const ChangeWindow = (value) => {
        window.window(value)
    }

    useEffect(() => {
        try {
            let sessionData = JSON.parse(localStorage.getItem("authenticated"));
            if (sessionData) {
                sessionData = sessionData[0];
                const url = `https://localhost:7029/api/Friends/GetFriends?token=${sessionData.token}`;

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const friends = JSON.parse(data.friends);
                        const balloons = friends.map(friend => (
                            <UserContact
                                key={friend.Snowflake} 
                                username={friend.Username} 
                                state={friend.State}  
                                setWindow={ChangeWindow}     
                            />
                        ));

                        setChatBalloons(balloons);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        } catch (_ex) {
            console.log(_ex);
        }
    }, []);

    return (
        <div className="bg-slate-800 flex flex-col h-full max-h-screen w-96">
            <div className="mb-5">
                <div className="m-2 h-9">
                    <input type="text" placeholder="Search or start a conversation" className='rounded-md bg-slate-900 text-white text-md p-1 w-full h-full' />
                </div>

                <div className="mx-3">
                    <Button listener={() => ChangeWindow("friends")} styling="p-3 text-gray-400" icon={<IoMdPersonAdd size={32} />} text={"Friends"} />
                </div>

                <hr className="w-auto my-1 border-gray-600" />

            </div>

            <div className="flex flex-col flex-grow overflow-y-auto scrollbar scrollbar-thumb-gray-700 h-[80%]">
                <span className='text-gray-400 mx-5 font-bold'>Direct Messages</span>
                <div>
                    {chatBalloons.map((balloon) => (
                        balloon
                    ))}
                </div>
            </div>

            <ControlBar />
        </div>
    );
}

export default FriendsPanel;