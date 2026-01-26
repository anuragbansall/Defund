import React, { useContext } from "react";
import { IoWallet } from "react-icons/io5";
import connectToWallet from "../../utils/connectToWallet";
import { WalletContext } from "../../contexts/WalletContext";
import Logo from "./Logo";

function WalletNotConnected() {
  const {
    setConnectedAccount,
    setIsConnecting,
    isConnecting,
    connectError,
    setConnectError,
    setOwner,
    setContract,
  } = useContext(WalletContext);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setConnectError(null);

    try {
      const { address, contract } = await connectToWallet();
      setConnectedAccount(address);
      setContract(contract);
      const ownerAddress = await contract.owner();
      setOwner(ownerAddress);
      setIsConnecting(false);
    } catch (error) {
      setConnectError(error.message);
      setIsConnecting(false);
    }
  };

  return (
    <main className="h-full w-full text-zinc-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-25"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/60 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-fuchsia-500/60 blur-3xl" />
          </div>

          <section className="px-8 pt-10 pb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Logo size={60} />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              Connect Your Wallet
            </h1>
            <p className="mt-2 text-sm text-zinc-300">
              Connect your wallet to continue. This securely verifies your
              identity and lets you interact with the app using your on-chain
              account.
            </p>

            <ul className="mt-5 space-y-2 text-left text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Non-custodial: your keys stay on your device.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>No funds move without your explicit approval.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Works with popular wallet providers.</span>
              </li>
            </ul>

            <button
              type="button"
              className="primary-button mt-6 w-full items-center justify-center"
              disabled={isConnecting}
              onClick={handleConnectWallet}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>

            {connectError && (
              <p className="mt-4 text-sm text-red-500">{connectError}</p>
            )}

            <p className="mt-4 text-xs text-zinc-400">
              You can disconnect anytime from settings. For demo purposes, this
              app is set to connect to a testnet.
            </p>
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          By connecting, you agree to proceed using your wallet address.
        </p>
      </div>
    </main>
  );
}

export default WalletNotConnected;
