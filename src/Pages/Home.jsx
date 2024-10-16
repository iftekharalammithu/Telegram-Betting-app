import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="items-center   justify-center">
      <h1 className="font-extrabold text-6xl text-red-500">
        Iftekhar alam Mithu
      </h1>
      <h2 className="font-extrabold mb-4 text-6xl text-red-100">
        THis is test app
      </h2>
      <Link className="text-3xl text-yellow-400" to="/payment">
        {" "}
        Payment
      </Link>
    </div>
  );
};

export default Home;
