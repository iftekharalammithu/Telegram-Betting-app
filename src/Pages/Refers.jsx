import React, { useEffect, useState } from "react";

const Refers = () => {
  const [initData, setInitData] = useState("");
  const [userId, setUserId] = useState("");
  const [startParam, setStartParam] = useState("");

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setUserId(WebApp.initDataUnsafe.user?.id.toString() || "");
        setStartParam(WebApp.initDataUnsafe.start_param || "");
      }
    };

    initWebApp();
  }, []);
  return (
    <div className="mx-4 gap-5 flex flex-col items-center justify-center break-words">
      <h1>Init Data :{initData}</h1>
      <h1>User ID: {userId}</h1>
      <h1>Start Param: {startParam}</h1>
    </div>
  );
};

export default Refers;
