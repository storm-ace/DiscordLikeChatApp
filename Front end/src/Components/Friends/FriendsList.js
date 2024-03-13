import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import FriendsBar from "./FriendsBar";
import UserContact from "../UserContact";

const FriendsList = (window) => {
    const [friendName, setIsFriendName] = useState();
    const [isInputFieldActive, DisableInputField] = useState(false);
    const [friends, setFriends] = useState([]);

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
                        const friendsData = JSON.parse(data.friends);
                        const friends = friendsData.map(friend => (
                            <FriendsBar
                            changeWindow={window}
                            username={friend.Username}
                            state={friend.State}
                            />
                        ));

                        setFriends(friends);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        } catch (_ex) {
            console.log(_ex);
        }
    }, []);

    const updateInput = (value) => {
        setIsFriendName(value);
    }

    return (
        <div className="my-1">
            <hr className="w-auto border-gray-950" />

            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="my-3 bg-slate-950 px-1 rounded-md p-3 w-full"
                    id="friendInputField"
                    onChange={(e) => updateInput(e.target.value)}
                    disabled={isInputFieldActive}
                />
            </div>
            <p className="text-gray-600">Online - <span className="text-yellow-500">{friends.length}</span></p>

            <div className="grid">
                {friends}
            </div>
        </div>
    );
}

export default FriendsList;