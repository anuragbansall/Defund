import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import WalletNotConnected from "./WalletNotConnected";

const ProtectedRoute = ({ children }) => {
  const { connectedAccount } = useContext(WalletContext);

  if (!connectedAccount) {
    return <WalletNotConnected />;
  }

  return children;
};

export default ProtectedRoute;
