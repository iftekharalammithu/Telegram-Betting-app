import React, { useEffect, useState } from "react";

const Refers = () => {
  const [initData, setInitData] = useState("");
  const [userId, setUserId] = useState("");
  const [startParam, setStartParam] = useState("");
  const INVITE_URL = "http://t.me/Mini00_test_bot/Testmini";
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || "");
        setStartParam(WebApp.initDataUnsafe.start_param || "");
        setUserProfile(WebApp.initDataUnsafe.user || "");
        console.log(WebApp.initDataUnsafe.user);
      }
    };

    initWebApp();
  }, []);

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    navigator.clipboard.writeText(inviteLink);
    notify("Copied!");
  };

  const [copy, setcopy] = useState("");

  const notify = (message) => {
    setcopy(message); // Set error message
    setTimeout(() => setcopy(null), 2000); // Clear error after 4 seconds
  };

  const handleSharelink = () => {
    const inviteLink = `${INVITE_URL}?startapp=${userId}`;
    window.Telegram.WebApp.openTelegramLink(inviteLink);
  };

  return (
    <div className="mx-4 gap-5 flex flex-col items-center justify-center break-words">
      <h1>Init Data :{initData}</h1>
      <h1>User ID: {userId}</h1>
      <h1>Start Param: {startParam}</h1>
      <button
        onClick={handleSharelink}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Share Links
      </button>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleCopyLink}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy Invite Link
        </button>
        {copy && (
          <div className=" items-center absolute bdr mt-7 text-center text-red-500 p-2 rounded  animate-fadeIn">
            {copy}
          </div>
        )}
      </div>
      <div>
        <img
          className="h-40 w-40 animate-[move-left-right_2s_ease-in-out_infinite] "
          src="public/basket2.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Refers;
