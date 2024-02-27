import { useEffect, useState } from 'react';
import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';
import LoginPanel from './Components/LoginPanel';
import FriendsWindow from './Components/FriendsWindow';

function App() {
  const [authenticated, setauthenticated] = useState();

  const [window, setWindow] = useState("friend");

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("authenticated"));
    setauthenticated(account);
  }, []);


  return (
    <div>
      {authenticated ? (
        <div className="flex">
          <SideBar />
          
          {window === "chat" ? (<UserBar />) : (<FriendsWindow />)}
        </div>
      ) : (
        <LoginPanel account={(onchange={setauthenticated})}/>
      )}
    </div>
  );
}

export default App;
