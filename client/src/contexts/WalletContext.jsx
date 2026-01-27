import { createContext, useEffect, useState } from "react";
import connectToWallet from "../utils/connectToWallet";

const WalletContext = createContext(null);

function WalletProvider({ children }) {
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState(null);

  useEffect(() => {
    const initializeWalletConnection = async () => {
      setIsConnecting(true);
      setConnectError(null);

      try {
        const { address, contract } = await connectToWallet();
        setConnectedAccount(address);
        setContract(contract);
      } catch (error) {
        setConnectError(error.message);
      } finally {
        setIsConnecting(false);
      }
    };

    initializeWalletConnection();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connectedAccount,
        setConnectedAccount,
        contract,
        setContract,
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
