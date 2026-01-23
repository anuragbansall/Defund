import { createContext, useEffect, useState } from "react";
import connectToWallet from "../utils/connectToWallet";

const WalletContext = createContext(null);

function WalletProvider({ children }) {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState(null);

  useEffect(() => {
    connectToWallet(
      setConnectedAccount,
      setIsConnecting,
      setConnectError,
      setOwner,
      setContract,
    );
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connectedAccount,
        setConnectedAccount,
        contract,
        setContract,
        owner,
        setOwner,
        isConnecting,
        setIsConnecting,
        connectError,
        setConnectError,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };
