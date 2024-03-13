import { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddFriend = (props) => {
    const [isErrorVisible, setIsErrorVisible] = useState("hidden");
    const [iserrorText, setIsErrorText] = useState("User was not found");
    const [friendName, setIsFriendName] = useState();
    const [isButtonActive, DisableButton] = useState(false);
    const [isInputFieldActive, DisableInputField] = useState(false);

    const user = JSON.parse(localStorage.getItem("authenticated"))[0];

    const closeError = () => {
        setIsErrorVisible("hidden");
    }

    const SendFriendRequest = async () => {
        if (friendName === undefined) {
            setIsErrorVisible("visible");
            setIsErrorText("Field cannot be empty.");
            return;
        }

        DisableButton(true);
        DisableInputField(true);

        try {
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

            const data = await response.json();

            if (response.ok) {
                document.getElementById("friendInputField").value = "";
                props.SetFriendRequestCounter(data.friendRequests);
            } else {
                setIsErrorVisible("visible");
                setIsErrorText(data || "An error occurred during the friend request.");
            }
        } catch (error) {
            console.error('Error parsing JSON response:', error);
            setIsErrorVisible("visible");
            setIsErrorText("An unexpected error occurred.");
        } finally {
            DisableButton(false);
            DisableInputField(false);
        }
    }

    const updateInput = (value) => {
        setIsFriendName(value);

        if (isErrorVisible === "visible") {
            setIsErrorVisible("hidden");
        }

        if (value.length >= 3) {
            DisableButton(false);
        } else DisableButton(true);
    }

    return (
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
                    disabled={isInputFieldActive}
                />
                <button
                    className="absolute right-3 transform -translate-y-1/10 bg-blue-500 text-white px-4 py-1 rounded-md disabled:bg-blue-950"
                    onClick={SendFriendRequest}
                    disabled={isButtonActive}
                >
                    Send Friend Request
                </button>
            </div>

            <div className={`error-panel ${isErrorVisible} max-w-max`}>
                <p>{iserrorText}</p>
                <button onClick={closeError}><IoClose className="relative text-black cursor-pointer m-1" /></button>
            </div>
        </div>
    );
}

export default AddFriend;