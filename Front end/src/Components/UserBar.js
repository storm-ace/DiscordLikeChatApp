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
    }, []);

    const generateRandomUsername = () => {
        const adjectives = ['Happy', 'Funny', 'Clever', 'Silly', 'Smart', 'Cheerful'];
        const nouns = ['Cat', 'Dog', 'Penguin', 'Dolphin', 'Monkey', 'Elephant'];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${randomAdjective}${randomNoun}`;
      };

    const generateRandomMessage = () => {
        const messages = ['Hello!', 'How are you?', 'Nice to meet you!', 'What\'s up?', 'I\'m coding!', 'React is awesome!'];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const balloons = Array.from({ length: 30 }, (_, index) => ({
        key: index,
        username: generateRandomUsername(),
        message: generateRandomMessage(),
    }));    

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
                    {balloons.map(balloon => (
                        <ChatBalloon key={balloon.key} username={balloon.username} message={balloon.message} />
                    ))}
                </div>

                <div className="flex">
                    <SendBar />
                </div>
            </div>
        </div>
    );
}

export default UserBar;
