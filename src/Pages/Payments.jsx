import {
  TonConnectUIContext,
  useTonConnectModal,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useContext } from "react";
import { beginCell, toNano } from "@ton/ton";
import { Address } from "@ton/core";
// [vite]: Rollup failed to resolve import "@ton/ton" from "/vercel/path0/src/Pages/Payments.jsx".

const ModalControl = () => {
  const { state, open, close } = useTonConnectModal();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const tonConnectUI = useContext(TonConnectUIContext);

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
        amount: toNano("0.010").toString(),
        payload: body.toBoc().toString("base64"), // Optional: Additional data
      },
    ],
    validUntil: Math.floor(Date.now() / 1000) + 360, // Expiration time in seconds
  };

  const handleTransaction = () => {
    if (tonConnectUI) {
      tonConnectUI
        .sendTransaction(paymentRequest)
        .then((transactionResult) => {
          console.log("Transaction successful:", transactionResult);
        })
        .catch((error) => {
          console.error("Transaction failed:", error);
        });
    } else {
      alert("Wallet is not connected");
    }
  };

  return (
    <div>
      {wallet && (
        <div>
          <span>Connected wallet: {wallet.name}</span>
          <span>Device: {wallet.device.appName}</span>
          <span>Address: {wallet.address}</span>
          <span>User-friendly address: {userFriendlyAddress}</span>
        </div>
      )}

      <div className="my-10">Modal state: {state?.status}</div>
      <button
        onClick={open}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Open modal
      </button>
      <button
        onClick={close}
        style={{
          backgroundColor: "#f44336",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Close modal
      </button>
      <button
        className="ml-2"
        style={{
          backgroundColor: "#f44536",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleTransaction}
      >
        Send Payment 10
      </button>
    </div>
  );
};
export default ModalControl;
