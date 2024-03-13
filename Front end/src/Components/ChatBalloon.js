import logo from "../logo.svg";

const ChatBalloon = ({date, username = "test", message = "message template"}) => {
    const messageTime = `Today at ${new Date().getHours()}:${new Date().getMinutes()}`;

    return (
        <div className="flex hover:bg-gray-950 my-2">
            <div className="flex">
            <img src={logo} alt="" width={62} className="mr-3" />
            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    <span className="block text-base font-semibold">{username}</span>
                    <span className="text-xs text-gray-600 ml-2">{messageTime}</span>
                </div>
                <span className="text-sm text-gray-600 block">{message}</span>
            </div>
            </div>
        </div>
    );
}

export default ChatBalloon;