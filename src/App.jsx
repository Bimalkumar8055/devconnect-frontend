import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feed from "./components/Feed";
import Connections from "./components/connections/Connections";
import ConnectionRequests from "./components/connections/ConnectionRequests";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/main" element={<Body />}>
          <Route index element={<Feed />} /> {/* Default nested route */}
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="connection-requests" element={<ConnectionRequests />} />
        </Route>
        
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
