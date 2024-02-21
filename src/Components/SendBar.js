const SendBar = () => {
    return (
        <div className="w-full items-center bg-gray-800 rounded-lg p-2">
            <input
                type="text"
                className="bg-transparent text-white focus:outline-none w-full"
                placeholder="Type your message..."
            />
        </div>
    );
}

export default SendBar;