const SendBar = () => {
    return (
        <div className="items-center bg-gray-800 rounded-lg p-2 mx-3 mb-7 w-full">
            <input
                type="text"
                className="bg-transparent text-white focus:outline-none w-full"
                placeholder="Type your message..."
            />
        </div>
    );
}

export default SendBar;