import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup"
import Home from "./pages/home/Home"
import { Routes, Route } from 'react-router-dom';
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile:userId" element={<Profile />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
