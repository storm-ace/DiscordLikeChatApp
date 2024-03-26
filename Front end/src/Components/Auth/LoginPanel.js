import { useState } from 'react';
import { UserLogin } from '../../hooks/LoginUser';

const LoginPanel = ({onChangeAuth}) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [isErrorVisible, setIsErrorVisible] = useState("hidden");
    const [iserrorText, setIsErrorText] = useState("Could not connect the server!");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        LoginBtn();
    };

    const LoginBtn = () => {
        const loginData = {username, password};

        UserLogin(loginData, onChangeAuth);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-discord-dark-lighter">
            <div className="max-w-xs">
                <form onSubmit={handleSubmit} className="bg-discord-dark shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="Username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-discord-dark-lighter"
                            id="Username"
                            type="text"
                            name="Username"
                            placeholder="Username"
                            required={true}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="Password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-discord-dark-lighter"
                            id="Password"
                            type="password"
                            name="Password"
                            placeholder="Password"
                            required={true}
                            onChange={(e) => setpassword(e.target.value)}
                        />

                        <div className={`error-panel ${isErrorVisible}`}>
                            <p>{iserrorText}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <input
                            className="bg-discord-blue hover:bg-discord-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                            value="Continue"
                        />
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Stormace. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default LoginPanel;