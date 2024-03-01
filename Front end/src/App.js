import { useEffect, useState } from 'react';
import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';
import FriendsWindow from './Components/FriendsWindow';
import LoginPanel from './Components/LoginPanel';

const App = () => {
  const [authenticated, setAuthenticated] = useState("");
  const [window, setWindow] = useState("chat");

  const components = {
    chat: <UserBar />,
    friends: <FriendsWindow />,
  };

  const handleChangeWindow = (newWindow) => {
    setWindow(newWindow);
  };

  const handleChangeAuth = (newAuthenticated) => {
    setAuthenticated((prevAuthenticated) => {
      return { ...prevAuthenticated, ...newAuthenticated }
    });
  };

  useEffect(() => {
    try {
      let sessionData = JSON.parse(localStorage.getItem("authenticated"));
      if (sessionData) {
        sessionData = sessionData[0];
        console.log(sessionData);
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
            const updatedAccount = [{ username: "", token: token }];
            setAuthenticated(updatedAccount);
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
      <div className="flex">
        <SideBar window={handleChangeWindow} />
        {components[window]}
      </div>
    );
  }
}

export default App;