import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";
import { addUser } from "../utils/Store/userSlice";
import UserProfileCard from "./UserProfileCard";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  const { firstName, lastName, photoUrl, age, gender, about } = userData;

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    photoUrl: photoUrl || "",
    age: age || "",
    gender: gender || "",
    about: about || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      dispatch(addUser(response?.data?.data));
    } catch (e) {
      toast.error(e?.response?.data?.Error);
    }
  };

  return (
    userData && (
      <div className="flex justify-around">
        <section className=" flex justify-center items-center">
          <div className="grid gap-8">
            <div
              id="back-div"
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4"
            >
              <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                <h1 className=" font-bold dark:text-gray-400 text-5xl text-center cursor-default">
                  Profile Details
                </h1>
                <form
                  action="#"
                  method="post"
                  className="space-y-4 "
                  onSubmit={handleSubmit}
                >
                  <section className="flex gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 dark:text-gray-400 text-lg"
                      >
                        FirstName
                      </label>
                      <input
                        value={formData.firstName}
                        onChange={handleChange}
                        name="firstName"
                        className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        type="text"
                        placeholder="FirstName"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="mb-2 dark:text-gray-400 text-lg"
                      >
                        LastName
                      </label>
                      <input
                        value={formData.lastName}
                        onChange={handleChange}
                        name="lastName"
                        className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                        type="text"
                        placeholder="LastName"
                        required
                      />
                    </div>
                  </section>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 dark:text-gray-400 text-lg"
                    >
                      Photo Url
                    </label>
                    <input
                      value={formData.photoUrl}
                      onChange={handleChange}
                      name="photoUrl"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="PhotoUrl"
                      required
                    />
                  </div>
                  <section className="flex gap-5">
                    <div className="flex flex-col">
                      <label
                        htmlFor="password"
                        className="mb-2 dark:text-gray-400 text-lg"
                      >
                        Age
                      </label>
                      <input
                        value={formData.age}
                        onChange={handleChange}
                        name="age"
                        className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-72"
                        type="text"
                        placeholder="Age"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="password"
                        className="mb-2 dark:text-gray-400 text-lg"
                      >
                        Gender
                      </label>
                      <input
                        value={formData.gender}
                        onChange={handleChange}
                        name="gender"
                        className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-72"
                        type="text"
                        placeholder="Gender"
                        required
                      />
                    </div>
                  </section>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 dark:text-gray-400 text-lg"
                    >
                      About
                    </label>
                    <input
                      value={formData.about}
                      onChange={handleChange}
                      name="about"
                      className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                      type="text"
                      placeholder="About"
                      required
                    />
                  </div>
                  <button
                    className=" bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg  p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
                    type="submit"
                  >
                    Save Change
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section  className="w-3/12">
            <UserProfileCard userData={{firstName,lastName,photoUrl,age,gender,about}}/>
        </section>
      </div>
    )
  );
};

export default EditProfile;
