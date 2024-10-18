import React, { useEffect, useRef, useState } from "react";
import basket from "../assets/basket2.png";

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
        <img className="h-40 w-40  " src={basket} alt="" />
      </div>
      <div
        className=""
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        <TerrainCanvas />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          {/* Your other content goes here */}
          <h1 style={{ color: "white", textAlign: "center", marginTop: "20%" }}>
            Welcome to My App
          </h1>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default Refers;

const TerrainCanvas = () => {
  const bgCanvasRef = useRef(null);
  const entities = useRef([]);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const bgCtx = bgCanvas.getContext("2d");
    const width = window.innerWidth;
    const height = Math.max(document.body.offsetHeight, 400);

    bgCanvas.width = width;
    bgCanvas.height = height;

    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    class Terrain {
      constructor(options = {}) {
        this.terrain = document.createElement("canvas");
        this.terCtx = this.terrain.getContext("2d");
        this.scrollDelay = options.scrollDelay || 90;
        this.lastScroll = Date.now();

        this.terrain.width = width;
        this.terrain.height = height;
        this.fillStyle = options.fillStyle || "#191D4C";
        this.mHeight = options.mHeight || height;

        this.points = [];
        let displacement = options.displacement || 140;
        const power = Math.pow(2, Math.ceil(Math.log(width) / Math.log(2)));

        this.points[0] = this.mHeight;
        this.points[power] = this.points[0];

        for (let i = 1; i < power; i *= 2) {
          for (let j = power / i / 2; j < power; j += power / i) {
            this.points[j] =
              (this.points[j - power / i / 2] +
                this.points[j + power / i / 2]) /
                2 +
              Math.floor(Math.random() * -displacement + displacement);
          }
          displacement *= 0.6;
        }

        document.body.appendChild(this.terrain);
      }

      update() {
        this.terCtx.clearRect(0, 0, width, height);
        this.terCtx.fillStyle = this.fillStyle;

        if (Date.now() > this.lastScroll + this.scrollDelay) {
          this.lastScroll = Date.now();
          this.points.push(this.points.shift());
        }

        this.terCtx.beginPath();
        for (let i = 0; i <= width; i++) {
          if (i === 0) {
            this.terCtx.moveTo(0, this.points[0]);
          } else if (this.points[i] !== undefined) {
            this.terCtx.lineTo(i, this.points[i]);
          }
        }

        this.terCtx.lineTo(width, this.terrain.height);
        this.terCtx.lineTo(0, this.terrain.height);
        this.terCtx.lineTo(0, this.points[0]);
        this.terCtx.fill();
      }
    }

    class Star {
      constructor(options) {
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.05;
        this.x = options.x;
        this.y = options.y;
      }

      reset() {
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.05;
        this.x = width;
        this.y = Math.random() * height;
      }

      update() {
        this.x -= this.speed;
        if (this.x < 0) {
          this.reset();
        } else {
          bgCtx.fillRect(this.x, this.y, this.size, this.size);
        }
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = 0;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.1;
        this.waitTime = Date.now() + Math.random() * 3000 + 500;
        this.active = false;
      }

      update() {
        if (this.active) {
          this.x -= this.speed;
          this.y += this.speed;
          if (this.x < 0 || this.y >= height) {
            this.reset();
          } else {
            bgCtx.lineWidth = this.size;
            bgCtx.beginPath();
            bgCtx.moveTo(this.x, this.y);
            bgCtx.lineTo(this.x + this.len, this.y - this.len);
            bgCtx.stroke();
          }
        } else {
          if (this.waitTime < Date.now()) {
            this.active = true;
          }
        }
      }
    }

    const initStars = () => {
      for (let i = 0; i < height; i++) {
        entities.current.push(
          new Star({
            x: Math.random() * width,
            y: Math.random() * height,
          })
        );
      }

      entities.current.push(new ShootingStar());
      entities.current.push(new ShootingStar());
    };

    const animate = () => {
      bgCtx.fillStyle = "#110E19";
      bgCtx.fillRect(0, 0, width, height);
      bgCtx.fillStyle = "#ffffff";
      bgCtx.strokeStyle = "#ffffff";

      for (const entity of entities.current) {
        entity.update();
      }
      requestAnimationFrame(animate);
    };

    initStars();
    animate();

    // Cleanup on component unmount
    return () => {
      entities.current = [];
    };
  }, []);

  return <canvas ref={bgCanvasRef} />;
};
