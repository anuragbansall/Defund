import React, { useContext } from "react";
import { SiHiveBlockchain } from "react-icons/si";
import { IoWalletOutline } from "react-icons/io5";
import { WalletContext } from "../contexts/WalletContext";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";
import connectToWallet from "../utils/connectToWallet";
import formatAddress from "../utils/formatAddress";

function Header() {
  const {
    connectedAccount,
    setConnectedAccount,
    setIsConnecting,
    setConnectError,
    setOwner,
    setContract,
    owner,
  } = useContext(WalletContext);

  const handleConnectWallet = () => {
    connectToWallet(
      setConnectedAccount,
      setIsConnecting,
      setConnectError,
      setOwner,
      setContract,
    );
  };

  return (
    <header className="w-full border-b border-white/10 bg-[#0B0B11]/70 backdrop-blur-md text-zinc-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-inset ring-white/15">
          <SiHiveBlockchain
            className="h-6 w-6 text-white/90"
            aria-hidden="true"
          />
        </span>
        <div className="leading-tight">
          <span className="block text-lg font-semibold tracking-tight">
            Defund
          </span>
          <span className="block text-xs text-zinc-400">
            Secure, non-custodial by design
          </span>
        </div>
      </div>

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
        {owner && (
          <div
            className="hidden items-center rounded-full bg-green-100 px-3 py-1 text-xs text-gray-700 sm:flex"
            title={owner}
          >
            <span className="mr-1 font-medium text-gray-600">Owner:</span>
            <span className="font-mono">{formatAddress(owner)}</span>
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
