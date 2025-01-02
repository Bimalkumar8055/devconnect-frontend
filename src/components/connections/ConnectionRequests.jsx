import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { addRequests, removeRequests } from "../../utils/Store/requestSlice";
import UserProfileCard from "../UserProfileCard";

const ConnectionRequests = () => {
  const requests = useSelector((store) => store.request);

  const dispatch = useDispatch();

  const fetchRequests = async () => {
    // if (requests?.length) return;
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data?.data));
      if (requests?.length) toast.success(response?.data?.message);
    } catch (e) {
      toast.error(e?.response?.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (status, requestId) => {
    try {
      const response = await axios.post(BASE_URL + `/request/review/${status}/${requestId}`,{},{withCredentials: true,});
      toast.success(response?.data?.message);
      // fetchRequests();
      dispatch(removeRequests(requestId));
    } catch (e) {
      toast.error(e?.response?.data);
    }
  };

  
  if (!requests) return;
  if (requests?.length === 0)
    return <h1 className="text-center text-2xl font-bold my-4">No Requests</h1>;

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">Request Received</h1>
      <div className="w-full grid grid-cols-4 grid-rows-none gap-4 scroll-auto">
        {requests?.map((eachRequests) => {
          const { firstName, lastName, photoUrl, age, gender, skills, about } = eachRequests.fromUserId || {};
          return (
            <div key={eachRequests?._id || Math.random()} className="relative p-4 border rounded-md">
              <UserProfileCard userData={{firstName,lastName,photoUrl,age,gender,skills,about,}}/>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleReview("rejected",eachRequests._id)}
                > Reject
                </button>
                <button className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleReview("accepted",eachRequests._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConnectionRequests;
