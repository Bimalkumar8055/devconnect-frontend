import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFeed } from "../utils/Store/feedSlice";
import UserProfileCard from "./UserProfileCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (userFeed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (e) {
      toast(e?.response?.data);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  const handleReview = async (status, userId) => {
    try{
      const response = await axios.post(BASE_URL + `/request/send/${status}/${userId}`,{},{withCredentials : true})
      console.log(response.data);
      dispatch(removeUserFeed(userId))
    }catch(e){
      toast(e?.response?.data);
    }
  }

  if (!userFeed) return;
  if (userFeed?.length === 0)
    return <h1 className="text-center text-2xl font-bold my-4">No new User Found</h1>;

  return (
    userFeed && (
      <div className="relative">
        <UserProfileCard userData={userFeed[0]} />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleReview("ignored", userFeed[0]._id)}
          > Ignored
          </button>
          <button
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
            onClick={() => handleReview("interested", userFeed[0]._id)}
          > Interested
          </button>
        </div>
      </div>
    )
  );
};

export default Feed;
