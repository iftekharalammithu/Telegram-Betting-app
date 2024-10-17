import React, { useEffect, useState } from "react";
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
    </div>
  );
};

export default Home;
