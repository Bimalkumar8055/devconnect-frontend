import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';

const PremiumSubscription = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [membershipType, setMembershipType] = useState("");

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async()=>{
    try {
      const response = await axios.get(BASE_URL + "/payment/verify/membership",{withCredentials : true});
      console.log(response);
      if(response?.data?.data?.isPremium){
        setIsPremium(true);
        setMembershipType(response?.data?.data?.membershipType);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

const handleOrder = async(type)=>{
        try{
            const response = await axios.post(BASE_URL + `/payment/create/${type}`, {}, {
                withCredentials: true,
              });
              console.log(response);
              
              const {amount,currency,orderId,notes} = response?.data?.data 
              const options = {
                key: response?.data?.keyId || "rzp_test_8FM8TA2cTcNSig",
                amount, 
                currency,
                name: 'DevConnect',
                description: `${notes.membershipType} Subscription`,
                order_id: orderId, // This is the order_id created in the backend
                prefill: {
                  name: `${notes.firstName} ${notes.lastName}`,
                  email: notes.emailId,
                  contact: '9999999999'
                },
                theme: {
                  color: '#54f3a1'
                },
                handler : verifyPremiumUser,
              };
            
              const rzp = new (window as any).Razorpay(options);
              rzp.open();
            // toast.success(response?.data?.message);
        }catch(e){
            toast.error(e?.response?.data?.Error);
        }
}
  return isPremium ? <div className='text-xl font-bold flex justify-center items-center h-screen w-full'>You are already a {membershipType} user,No need to buy again</div> : (
    <div className='mb-40 ml-20'>
      <div>
        <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl">Pricing</h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
          Get started on our free plan and upgrade when you are ready.
        </p>
      </div>
      <div className="mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Free Plan */}
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Silver</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight">₹ 299</span>
              <span className="ml-1 text-xl font-semibold">/6 month</span>
            </p>
            <p className="mt-6">You just want to discover</p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Chat With Other for 6 Month</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Blue Tick for 6 Month</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Add Unlimited Connections for 6 Month</span>
              </li>
            </ul>
          </div>
          <button
            type="button"
            onClick={()=> handleOrder("silver")}
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
          >
            Subscribe
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Gold</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
              Most popular
            </p>
            <p className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight">₹ 499</span>
              <span className="ml-1 text-xl font-semibold">/1 year</span>
            </p>
            <p className="mt-6">You want to learn and have a personal assistant</p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Chat With Other for 1 Year</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Blue Tick for 1 Year</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Add Unlimited Connections for 1 Year</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Enable Ai Assistant</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3">Access to all features</span>
              </li>
            </ul>
          </div>
          <a
            className="bg-emerald-500 cursor-pointer text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            type="button"
            onClick={()=> handleOrder("gold")}
          >
            Subscribe
          </a>
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscription;
