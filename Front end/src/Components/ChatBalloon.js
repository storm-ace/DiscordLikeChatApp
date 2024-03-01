import logo from "../logo.svg";

const ChatBalloon = () => {
    return (
        <div className="flex my-5 mx-3">
            <img src={logo} alt="" width={62} className="mr-3" />
            <div className="flex flex-col">
                <div className="flex items-center mb-1">
                    <span className="block text-base font-semibold">User name</span>
                    <span className="text-xs text-gray-600 ml-2">Timestamp</span>
                </div>
                <span className="text-sm text-gray-600 block">Chat message</span>
            </div>
        </div>
    );
}

export default ChatBalloon;