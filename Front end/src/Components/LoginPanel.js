import { useState } from 'react';

const LoginPanel = (props) => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [isErrorVisible, setIsErrorVisible] = useState("hidden");
    const [iserrorText, setIsErrorText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        UserLogin();
    };

    const UserLogin = async () => {
        try {
            const response = await fetch("https://localhost:7029/api/Auth/login", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                const updatedAccount = [{ username: username, token: token }];
                props.onChangeAuth(updatedAccount);
                localStorage.setItem("authenticated", JSON.stringify(updatedAccount));
            } else {
                setIsErrorVisible("visible");
                setIsErrorText(data);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setIsErrorVisible("visible");
        }
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