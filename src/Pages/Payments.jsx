import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";

const ModalControl = () => {
  const { state, open, close } = useTonConnectModal();
  const wallet = useTonWallet();

  return (
    <div>
      {wallet && (
        <div>
          <span>Connected wallet: {wallet.name}</span>
          <span>Device: {wallet.device.appName}</span>
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
    </div>
  );
};
export default ModalControl;
