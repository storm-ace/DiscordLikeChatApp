import { useEffect, useState } from 'react';
import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';

function App() {
  const users = [{ username: "Wesley", password: "123" }];
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    CheckAccount();
  };

  const CheckAccount = () => {
    const userCheck = users.find((user) => user.username === username);
    if (userCheck && userCheck.password === password) {
      const updatedAccount = [{username: username, token: ""}];
      setauthenticated(updatedAccount);
      localStorage.setItem("authenticated", JSON.stringify(updatedAccount));
    }
  }

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("authenticated"));
    setauthenticated(account);
  }, []);


  return (
    <div>
      {authenticated ? (
        <div className="flex">
          <SideBar account={authenticated} />
          <UserBar />
        </div>
      ) : (
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
                  value={username}
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
      )}
    </div>
  )
}

export default App;
