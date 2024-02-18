const LeftChatBar = () => {
    return (
        <div className="bg-slate-800 absolute left-[58px] w-[250px] h-screen">
            <input type="text" placeholder="Search.." className='mx-[20px] my-3 bg-slate-900 px-1' />
            <hr className="h-px w-auto my-1 bg-gray-200 dark:bg-gray-700 self-center" />

            <div>
                <span className='text-gray-400 mx-5 font-bold'>Direct Messages</span>
                <div>

                </div>
            </div>
        </div>
    );
}

export default LeftChatBar;