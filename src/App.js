import ControlBar from './Components/ControlBar';
import LeftChatBar from './Components/LeftChatBar';
import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';

function App() {
  return (
    <div className="flex bg-slate-950 overflow-hidden">
      <SideBar/>
      <LeftChatBar/>
      <ControlBar/>
      <UserBar/>
    </div>
  );
}

export default App;
