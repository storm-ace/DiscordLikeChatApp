import { useMemo } from "react";
import UserContact from "./UserContact";
import ControlBar from "./ControlBar.js"

const LeftChatBar = () => {
    const chatBalloons = useMemo(() => {
        const balloons = [];
        // for (let index = 0; index < 100; index++) {
        //     balloons.push(<UserContact key={index} />);
        // }
        return balloons;
    }, []);

    return (
        <div className="bg-slate-800 flex flex-col h-full overflow-auto max-h-screen">
            <div className="mb-5">
                <input type="text" placeholder="Search.." className='mx-[20px] my-3 bg-slate-900 px-1' />
                <hr className="w-auto my-1" />
            </div>

            <div className="flex flex-col flex-grow overflow-y-auto scrollbar scrollbar-thumb-gray-700">
                <span className='text-gray-400 mx-5 font-bold'>Direct Messages</span>
                <div>
                    {chatBalloons.map((balloon, index) => (
                        <div key={index} className="mb-2">
                            {balloon}
                        </div>
                    ))}
                </div>
            </div>
            <ControlBar />
        </div>
    );
}

export default LeftChatBar;