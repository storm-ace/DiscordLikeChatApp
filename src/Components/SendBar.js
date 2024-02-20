const SendBar = () => {
    return (
        <div className="flex items-center mx-10 bg-gray-800 rounded-lg p-2 w-screen">
            <input
                type="text"
                className="bg-transparent text-white focus:outline-none w-full"
                placeholder="Type your message..."
            />
        </div>
    );
}

export default SendBar;