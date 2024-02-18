import logo from "../logo.svg";

const ChatBalloon = () => {
    return (
        <div className="grid grid-cols-3 my-5 mx-3">
            <img src={logo} alt="" width={62} className="col-span-1" />
            <div className="col-span-2 flex flex-col">
                <div className="flex items-center">
                    <span className="block">User name</span>
                    <span className="text-xs text-gray-600 ml-2">Timestamp</span>
                </div>
                <span className="text-xs text-gray-600 block">Chat message</span>
            </div>
        </div>
    );
}

export default ChatBalloon;