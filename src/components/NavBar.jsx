import { useDispatch, useSelector } from "react-redux";
import emptyPic from "../assets/emptyPic.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/Store/userSlice";
import { removeAllFeed } from "../utils/Store/feedSlice";
import { removeConnection } from "../utils/Store/connectionSlice";
import { removeAllRequests } from "../utils/Store/requestSlice";
import { toast } from "react-toastify";

const NavBar = () => {
  const userData = useSelector((store) => store.user);

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout =async()=>{
    try{
      await axios.post(BASE_URL + "/logout", {},{withCredentials : true})
      dispatch(removeUser())
      dispatch(removeAllFeed())
      dispatch(removeConnection())
      dispatch(removeAllRequests())
      navigate("/")
    }catch(e){
      toast.error(e?.response?.data)
    }
  }

  return (
    <div className="navbar bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="flex-1">
        <Link to="/main" className="btn btn-ghost bg-indigo-500 hover:bg-indigo-600 text-white font-bold  text-2xl ml-5">
          Dev Connect
        </Link>
      </div>
      <div className="flex-none gap-2">
        {userData && (
          <section className="flex gap-4">
            <div className="text-md font-semibold my-auto text-black">Welcome, {userData.firstName}</div>
            <div className="dropdown dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-14 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData.photoUrl || emptyPic}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded-box z-[1] mt-4 w-60 p-3 shadow bg-indigo-400 text-white text-2xl font-bold"
            >
              <li className="hover:bg-indigo-600 rounded-lg">
                <Link to="/main/profile" className="justify-between">Profile</Link>
              </li>
              <li className="hover:bg-indigo-600 rounded-lg">
                <Link to="/main/Connections">Connections</Link>
              </li>
              <li className="hover:bg-indigo-600 rounded-lg">
                <Link to="/main/connection-requests">Request Received</Link>
              </li>
              <li className="hover:bg-indigo-600 rounded-lg">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NavBar;
