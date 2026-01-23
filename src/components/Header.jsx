import React, { useContext } from "react";
import { SiHiveBlockchain } from "react-icons/si";
import { IoWalletOutline } from "react-icons/io5";
import { WalletContext } from "../contexts/WalletContext";
import { MdCampaign } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  const { wallet } = useContext(WalletContext);
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

      {!wallet ? (
        <button
          type="button"
          aria-label="Connect wallet"
          className="primary-button"
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
    </header>
  );
}

export default Header;
