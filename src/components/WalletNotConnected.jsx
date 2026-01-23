import React from "react";
import { IoWallet } from "react-icons/io5";

function WalletNotConnected() {
  return (
    <main className="min-h-screen w-full bg-linear-to-br from-[#0B0B11] via-[#13131A] to-[#1A1A24] text-zinc-100 flex items-center justify-center p-6">
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
            <div className="mx-auto mb-5 inline-flex items-center justify-center rounded-xl bg-white/10 p-3 ring-1 ring-inset ring-white/15 text-4xl">
              <IoWallet />
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
            >
              Connect Wallet
            </button>

            <p className="mt-4 text-xs text-zinc-400">
              You can disconnect anytime from settings. For demo purposes, this
              simply simulates a connection.
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
