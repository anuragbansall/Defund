import { ethers } from "ethers";
import DefundABI from "../contracts/DefundABI";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const connectToWallet = async (
  setConnectedAccount,
  setIsConnecting,
  setConnectError,
  setOwner,
  setContract,
) => {
  if (!window.ethereum) {
    setConnectError("MetaMask is not installed.");
    return null;
  }

  try {
    setIsConnecting(true);
    setConnectError(null);

    const provider = new ethers.BrowserProvider(window.ethereum);

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setConnectedAccount(address);
    setIsConnecting(false);

    const contract = new ethers.Contract(contractAddress, DefundABI, signer);
    setContract(contract);

    return address;
  } catch (error) {
    console.error("Error connecting to wallet:", error);
    if (error.code === 4001) {
      setConnectError("Connection request was rejected by the user.");
    } else if (error.code === -32002) {
      setConnectError("A connection request is already pending.");
    } else {
      setConnectError("An error occurred while connecting to MetaMask.");
    }

    setIsConnecting(false);

    return null;
  }
};

export default connectToWallet;
