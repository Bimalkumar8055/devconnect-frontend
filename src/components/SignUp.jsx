import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    photoUrl: "",
    gender: "",
    age: "",
    about: "",
  });

  const navigate = useNavigate();

  const handleChange =(e)=>{
    const {name, value}= e.target
    setFormData({...formData, [name]:value})
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
        const response = await axios.post(BASE_URL + "/signup",formData)
        toast.success(response?.data)
        setFormData({firstName: "", lastName: "", emailId: "", password: "", photoUrl: "", gender: "", age: "", about: ""})
        navigate("/")
    }catch(e){
        toast.error(e?.response?.data?.Error)
    }
  }

  return (
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
              className="space-y-3 "
              onSubmit={handleSubmit}
            >
              <section className="flex gap-5">
                <div>
                  <label className="mb-2 dark:text-gray-400 text-lg">
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
                  <label className="mb-2 dark:text-gray-400 text-lg">
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
              <section className="flex gap-5">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="mb-2 dark:text-gray-400 text-lg"
                  >
                    Email
                  </label>
                  <input
                    value={formData.emailId}
                    onChange={handleChange}
                    name="emailId"
                    className="border p-3 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-72"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 dark:text-gray-400 text-lg">
                    Password
                  </label>
                  <input
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-72"
                    type="text"
                    placeholder="Password"
                    required
                  />
                </div>
              </section>
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
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
                SignUp 
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                Have an account ?{" "}
                <Link to="/"
                  className="group text-blue-400 transition-all duration-100 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    Login Here
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
