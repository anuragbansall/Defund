import { ethers } from "ethers";

// TODO: Replace with actual contract address and ABI
// const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
// const contractABI = [];

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

    // TODO: Uncomment and set up contract when ABI and address are available
    // const contract = new ethers.Contract(contractAddress, contractABI, signer);
    // setContract(contract);

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
