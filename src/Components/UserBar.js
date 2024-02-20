import { useRef, useEffect, useMemo } from "react";
import logo from "../logo.svg";
import ChatBalloon from "./ChatBalloon";
import SendBar from "./SendBar";

const UserBar = () => {
    const chatBalloons = useMemo(() => {
        const balloons = [];
        for (let index = 0; index < 50; index++) {
          balloons.push(<ChatBalloon key={index} />);
        }
        return balloons;
      }, []);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatBalloons]);

    return (
        <div className="text-white w-screen">
            <div className="flex flex-col h-screen bg-gray-900 p-4">
                <div className="my-3.5">
                    <div className="flex mx-5 gap-3">
                        <img src={logo} alt="?" width={42} />
                        <span className="font-bold">UserName</span>
                    </div>
                </div>

                <div className="flex-grow overflow-auto mb-4" ref={chatContainerRef}>
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
