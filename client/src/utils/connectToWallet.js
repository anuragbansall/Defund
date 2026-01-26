import { ethers } from "ethers";
import DefundABI from "../contracts/DefundABI";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const connectToWallet = async () => {
  if (!window.ethereum) {
    console.error("MetaMask is not installed.");

    throw new Error(
      "MetaMask is not installed. Please install it to use this app.",
    );
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const contract = new ethers.Contract(contractAddress, DefundABI, signer);

    return { address, contract };
  } catch (error) {
    console.error("Error connecting to wallet:", error);

    if (error.code === 4001) {
      throw new Error("Connection request was rejected by the user.");
    } else if (error.code === -32002) {
      throw new Error(
        "A connection request is already pending. Please check MetaMask.",
      );
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

export default connectToWallet;
