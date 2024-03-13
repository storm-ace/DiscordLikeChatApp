import { useEffect, useState } from 'react';
import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';
import FriendsWindow from './Components/Friends/FriendsWindow';
import LoginPanel from './Components/LoginPanel';
import { GetUserToken } from './hooks/GetUserToken';

const App = () => {
  const [authenticated, setAuthenticated] = useState("");
  const [window, setWindow] = useState("chat");

  const handleChangeAuth = (newAuthenticated) => {
    setAuthenticated((prevAuthenticated) => {
      return { ...prevAuthenticated, ...newAuthenticated }
    });
  };

  const handleChangeWindow = (newWindow) => {
    setWindow(newWindow);
  };

  const components = {
    chat: <UserBar window={handleChangeAuth} />,
    friends: <FriendsWindow window={handleChangeWindow} />,
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("authenticated"))) {
      GetUserToken().then(data => {
        if (data === null) return;

        setAuthenticated(data);
      });
    }
  }, [authenticated.token]);

  if (authenticated === "") {
    return (
      <LoginPanel onChangeAuth={handleChangeAuth} />
    );
  } else {
    return (
      <div className="h-screen overflow-hidden">
        <div className="bg-gray-950 h-4 w-full"><h2 className="text-gray-700 font-bold text-xs px-3">Chat app</h2></div>
        <div className="flex h-full pb-[1rem]">
          <SideBar className="pb-5" window={handleChangeWindow} />
          {components[window]}
        </div>
      </div>
    );
  }
}

export default App;