import React, { useEffect, useState } from "react";
import { FaHome, FaUserFriends, FaWallet } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load Telegram Web App SDK
    const telegram = window.Telegram.WebApp;

    // Ensure that the WebApp is opened inside Telegram and user data is available
    if (telegram.initDataUnsafe && telegram.initDataUnsafe.user) {
      const { first_name, last_name, id } = telegram.initDataUnsafe.user;
      const userName = `${first_name} ${last_name || ""}`.trim();
      setUser({ name: userName, id });
    } else {
      console.error("User information is not available");
    }
  }, []);
  return (
    <div className="items-center   justify-center">
      <h2 className="font-extrabold mb-4 text-6xl text-red-100">
        THis is test app
      </h2>
      {user ? (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
          <p className="text-lg font-semibold">User Name: {user.name}</p>
          <p className="text-lg">User ID: {user.id}</p>
        </div>
      ) : (
        <p className="text-yellow-400">Loading user info...</p>
      )}
      <Link className="text-3xl mt-20 flex text-yellow-400" to="/payment">
        {" "}
        Payment
      </Link>
      <Link className="text-3xl mt-20 flex text-yellow-400" to="/referals">
        {" "}
        Referals
      </Link>
      <button className="bg-gradient-to-r from-[#7ed8f7] via-[#f17de7]  to-[#f8b86d] text-white font-semibold mx-4 py-2 w-[90%]  rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300">
        Next
      </button>
      <div className="h-screen flex-col w-screen bg-[#1a2726] flex items-center justify-center">
        <div className="mt-9 flex items-center justify-center w-fit p-5 rounded-3xl bg-slate-300 shadow-[5px_12px_25px_rgba(0,0,0,0.7)] relative">
          {/* Inset shadow */}
          <div className="absolute inset-0 rounded-3xl  shadow-[inset_10px_10px_20px_rgba(0,0,0,0.3)] pointer-events-none"></div>

          {/* SVG content */}
          <svg
            className="w-10 h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 1v22M5 7l7-4 7 4M5 7v10M19 7v10M9 22h6" />
          </svg>
        </div>
        <div className=" flex rounded-3xl justify-evenly bg-gradient-to-tl from-green-500 to-yellow-500  py-4 w-[95%]">
          <FaHome className="text-5xl p-2 bg-transparent shadow-[5px_12px_25px_rgba(0,0,0,0.7)] text-white rounded-xl" />
          <MdLeaderboard className="text-5xl p-2 bg-transparent shadow-[5px_12px_25px_rgba(0,0,0,0.7)] text-white rounded-xl" />
          <FaUserFriends className="text-5xl p-2 bg-transparent shadow-[5px_12px_25px_rgba(0,0,0,0.7)] text-white rounded-xl" />
          <FaWallet className="text-5xl p-2 bg-transparent shadow-[5px_12px_25px_rgba(0,0,0,0.7)] text-white rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Home;
