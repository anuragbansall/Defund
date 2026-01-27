import React, { useContext } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { WalletContext } from "../../contexts/WalletContext";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";
import connectToWallet from "../../utils/connectToWallet";
import formatAddress from "../../utils/formatAddress";
import Logo from "./Logo";

function Header() {
  const {
    connectedAccount,
    setConnectedAccount,
    setIsConnecting,
    setConnectError,
    setContract,
  } = useContext(WalletContext);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setConnectError(null);

    try {
      const { address, contract } = await connectToWallet();
      setConnectedAccount(address);
      setContract(contract);
      setIsConnecting(false);
    } catch (error) {
      setConnectError(error.message);
      setIsConnecting(false);
    }
  };

  return (
    <header className="w-full border-b border-white/10 bg-[#0B0B11]/70 backdrop-blur-md text-zinc-100 px-6 py-4 flex items-center justify-between">
      <Link className="flex items-center gap-3" to="/">
        <Logo />
        <div className="leading-tight">
          <span className="block text-lg font-semibold tracking-tight">
            Defund
          </span>
          <span className="block text-xs text-zinc-400">
            Secure, non-custodial by design
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {connectedAccount && (
          <div
            className="hidden items-center rounded-full bg-green-100 px-3 py-1 text-xs text-gray-700 sm:flex"
            title={connectedAccount}
          >
            <span className="mr-1 font-medium text-gray-600">User:</span>
            <span className="font-mono">{formatAddress(connectedAccount)}</span>
          </div>
        )}

        {!connectedAccount ? (
          <button
            type="button"
            aria-label="Connect wallet"
            className="primary-button"
            onClick={handleConnectWallet}
          >
            <IoWalletOutline className="h-5 w-5" aria-hidden="true" />
            <span>Connect Wallet</span>
          </button>
        ) : (
          <Link
            to="/create-campaign"
            type="button"
            aria-label="Create campaign"
            className="primary-button"
          >
            <MdCampaign className="h-5 w-5" aria-hidden="true" />
            <span>Create Campaign</span>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
