import { useRef, useEffect, useMemo, useState } from "react";
import logo from "../logo.svg";
import ChatBalloon from "./ChatBalloon";
import SendBar from "./SendBar";

const UserBar = () => {
 const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [/*chatBalloons*/]);

    return (
        <div className="text-white min-w-1 h-screen w-screen">
            <div className="flex flex-col h-full bg-gray-900">
                <div className="my-3.5">
                    <div className="flex mx-5 gap-3">
                        <img src={logo} alt="?" width={42} />
                        <span className="font-bold">UserName</span>
                    </div>
                </div>

                <div className="flex-grow flex flex-col overflow-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-700" ref={chatContainerRef}>
                    
                </div>

                <div className="flex">
                    <SendBar />
                </div>
            </div>
        </div>
    );
}

export default UserBar;
