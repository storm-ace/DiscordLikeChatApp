import { useEffect, useState } from 'react';
import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';
import FriendsWindow from './Components/Friends/FriendsWindow';
import LoginPanel from './Components/LoginPanel';

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
    chat: <UserBar window={handleChangeAuth}/>,
    friends: <FriendsWindow window={handleChangeWindow}/>,
  };

  useEffect(() => {
    try {
      let sessionData = JSON.parse(localStorage.getItem("authenticated"));
      if (sessionData) {
        sessionData = sessionData[0];
        // Construct the URL with the token as a query parameter
        const url = `https://localhost:7029/api/Auth/loginWithToken?token=${sessionData.token}`;

        // Make the GET request
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // Handle the response data (success, token, etc.)
            console.log('Successful response:', data);
            const token = data.token;
            const updatedAccount = JSON.parse(localStorage.getItem("authenticated"));
            updatedAccount.token = token;
            setAuthenticated(JSON.stringify(updatedAccount));
            localStorage.setItem("authenticated", JSON.stringify(updatedAccount));
          })
          .catch(error => {
            // Handle errors
            console.error('Error:', error);
            localStorage.removeItem("authenticated");
          });
      }
    } catch (_ex) {
      console.log(_ex);
      localStorage.removeItem("authenticated");
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