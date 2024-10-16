import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl="https://purple-selected-toad-148.mypinata.cloud/ipfs/QmcXf3PSvRELE5TBMkYce189VNi3nqRJYQmzvaY2vwkJGH">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TonConnectUIProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition:Bounce
    />
  </StrictMode>
);
