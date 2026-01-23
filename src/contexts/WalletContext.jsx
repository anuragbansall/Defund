import { createContext, useState } from "react";

const WalletContext = createContext(null);

function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);

  return (
    <WalletContext.Provider
      value={{ wallet, setWallet, contract, setContract }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export { WalletContext, WalletProvider };
