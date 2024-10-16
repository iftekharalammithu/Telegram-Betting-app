import {
  TonConnectUIContext,
  useTonConnectModal,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useContext, useState } from "react"; // Added useState import
import { beginCell, toNano } from "@ton/ton";
import { Address } from "@ton/core";
import { useNavigate } from "react-router-dom";

const ModalControl = () => {
  const { state, open, close } = useTonConnectModal();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const tonConnectUI = useContext(TonConnectUIContext);
  const [error, setError] = useState(null); // Moved state declaration here

  const body = beginCell()
    .storeUint(0, 32) // Write 32 zero bits to indicate a text comment will follow
    .storeStringTail("test transection ") // Write the text comment (data.id assumed to be dynamic)
    .endCell();
  const destination = Address.parse(
    "UQDqroQ2XO6CTyrSLg_xStqvxusx_1ajmlpmC_31lmn0r9TK"
  ).toRawString();

  const paymentRequest = {
    messages: [
      {
        address: destination,
        amount: toNano("0.0050").toString(),
        payload: body.toBoc().toString("base64"), // Optional: Additional data
      },
    ],
    validUntil: Math.floor(Date.now() / 1000) + 360, // This sets the expiration time for the payment request to 360 seconds (6 minutes) from the current time.
  };

  const handleTransaction = () => {
    if (tonConnectUI.connector._wallet) {
      console.log(tonConnectUI.connector._wallet);
      tonConnectUI
        .sendTransaction(paymentRequest)
        .then((transactionResult) => {
          console.log("Transaction successful:", transactionResult);
        })
        .catch((error) => {
          console.error("Transaction failed: ", error);
          notify("Transaction failed Try Again! ");
        });
    } else {
      console.log("wallet not connected");
      notify("Wallet is not connected");
      // alert("Wallet is not connected");
    }
  };
  const handleDisconnect = () => {
    tonConnectUI.disconnect(); // Disconnect the wallet
  };
  const notify = (error) => {
    setError(error); // Set error message
    setTimeout(() => setError(null), 3000); // Clear error after 4 seconds
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="max-w-[360px] bdr ">
      {wallet && (
        <div className="break-words">
          <span>Connected wallet: {wallet.name}</span>
          <span>Device: {wallet.device.appName}</span>
          <span>Address: {wallet.address}</span>
          <span>User-friendly address: {userFriendlyAddress}</span>
        </div>
      )}
      <button
        onClick={handleBack}
        className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
      >
        Go Back
      </button>
      {error && (
        <div className="error-popup absolute items-center text-center text-red-500 border border-red-500 p-2 rounded my-2 animate-fadeIn">
          {error}
        </div>
      )}{" "}
      {/* Display error message */}
      <div className="my-10">Modal state: {state?.status}</div>
      <div className="gap-3 flex flex-row">
        <button
          onClick={open}
          className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer mr-2"
        >
          Open modal
        </button>
        <button
          onClick={close}
          className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
        >
          Close modal
        </button>
        {wallet && (
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white py-2 px-4 rounded cursor-pointer"
          >
            Disconnect Wallet
          </button>
        )}

        <button
          className="bg-red-600 text-white py-2 px-4 rounded cursor-pointer ml-2"
          onClick={handleTransaction}
        >
          Send Payment 10
        </button>
      </div>
    </div>
  );
};
export default ModalControl;
