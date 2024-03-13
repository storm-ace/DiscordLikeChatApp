import logo from "../../logo.svg";

const FriendsBar = ({changeWindow, username, state}) => {
const windowToChat = () => {
    changeWindow.window.window("chat");
}
    
    return (
        <div className="hover:bg-gray-950 hover:cursor-pointer" onMouseDown={windowToChat}>
            <hr className="w-auto border-gray-700" />

            <div className="my-3 flex">
                <img src={logo} width={42} />
                <div className="mx-3">
                    <h1 className="font-bold">{username}</h1>
                    <p className="text-green-500 font-light text-sm">{state}</p>
                </div>
            </div>

            <hr className="w-auto border-gray-700" />
        </div>
    );
}

export default FriendsBar;