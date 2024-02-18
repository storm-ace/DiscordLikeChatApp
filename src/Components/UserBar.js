import logo from "../logo.svg";
import ChatBalloon from "./ChatBalloon";

const UserBar = () => {
    const chatBalloons = [];

    for (let index = 0; index < 100; index++) {
        chatBalloons.push(<ChatBalloon key={index} />);
    }

    return (
        <div className="text-white w-screen relative left-[250px]">
            <div className="my-3.5">
                <div className="flex mx-5 gap-3">
                    <img src={logo} alt="?" width={32} />
                    <span className="font-bold">UserName</span>
                </div>
            </div>
            <hr className="h-px w-auto my-1 bg-gray-200 dark:bg-gray-700 self-center" />
            <div className="fixed m-0 max-h-screen w-screen overflow-auto flex">
                <div className="h-auto gap-1">
                    {chatBalloons}
                </div>
            </div>
        </div>
    );
};

export default UserBar;
