import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";
import { useDispatch, useSelector, } from "react-redux";
import { addUser } from "../utils/Store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store)=>store.user)

  // * if i refresh my page then user not logout
  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (e) {
      //* Use e.response to check the actual HTTP status
      if (e.status === 401) {
        navigate("/");
        toast.error(e?.response?.data);
      } else {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    if(!userData ){
      fetchUser();
    }
  }, []);

  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
