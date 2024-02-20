import SideBar from './Components/Sidebar';
import UserBar from './Components/UserBar';

function App() {
  return (
    <div className="flex bg-slate-950 overflow-hidden">
      <SideBar/>
      <UserBar/>
    </div>
  );
}

export default App;
