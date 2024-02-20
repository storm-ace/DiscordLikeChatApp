import logo from "../logo.svg";
import ChatBalloon from "./ChatBalloon";
import SendBar from "./SendBar";

const UserBar = () => {
    const chatBalloons = [];

    for (let index = 0; index < 50; index++) {
        chatBalloons.push(<ChatBalloon key={index} />);
    }

    return (
        <div className="text-white w-screen">
            <div className="flex flex-col h-screen bg-gray-900 p-4">
                <div className="my-3.5">
                    <div className="flex mx-5 gap-3">
                        <img src={logo} alt="?" width={42} />
                        <span className="font-bold">UserName</span>
                    </div>
                </div>

                <div className="flex-grow overflow-auto mb-4">
                    {chatBalloons.map((balloon, index) => (
                        <div key={index} className="mb-2">
                            {balloon}
                        </div>
                    ))}
                </div>

                <div className="m-auto">
                        <SendBar />
                    </div>
            </div>
        </div>
    );
};

export default UserBar;
