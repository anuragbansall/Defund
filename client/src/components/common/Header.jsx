import React, { useContext } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { WalletContext } from "../../contexts/WalletContext";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";
import connectToWallet from "../../utils/connectToWallet";
import formatAddress from "../../utils/formatAddress";
import Logo from "./Logo";
import { GiHamburgerMenu } from "react-icons/gi";

function Header({ onOpenSidebar }) {
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
          <span className="text-lg font-semibold tracking-tight hidden sm:block">
            Defund
          </span>
          <span className="hidden text-xs text-zinc-400 sm:block">
            Secure, non-custodial by design
          </span>
        </div>
      </Link>

      <div className="items-center gap-4 hidden md:flex">
        {connectedAccount && (
          <div
            className="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs text-gray-700"
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

      <div className="text-2xl md:hidden">
        <button
          type="button"
          aria-label="Open menu"
          className="p-2 rounded-md hover:bg-white/10 active:bg-white/20 transition"
          onClick={onOpenSidebar}
        >
          <GiHamburgerMenu />
        </button>
      </div>
    </header>
  );
}

export default Header;
