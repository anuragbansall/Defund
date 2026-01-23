import React, { useState, useContext } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { FiClock, FiUser } from "react-icons/fi";
import { WalletContext } from "../contexts/WalletContext";

function ViewCampaign() {
  const location = useLocation();
  const { id } = useParams();
  const { wallet } = useContext(WalletContext);

  const campaign = location.state?.campaign || null;

  const parseAmount = (v) => {
    if (typeof v === "string") {
      const n = parseFloat(v.replace(/[^0-9.]/g, ""));
      return isNaN(n) ? 0 : n;
    }
    const n = Number(v);
    return isNaN(n) ? 0 : n;
  };

  const target = parseAmount(campaign?.targetAmount);
  const collected = parseAmount(campaign?.amountCollected);
  const progressPct =
    target > 0 ? Math.min(100, Math.round((collected / target) * 100)) : 0;

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("ETH");
  const [status, setStatus] = useState(null);

  const canFund = Boolean(wallet) && amount && parseFloat(amount) > 0;

  const handleFund = (e) => {
    e.preventDefault();
    if (!wallet) {
      setStatus({
        type: "error",
        message: "Connect your wallet to fund this campaign.",
      });
      return;
    }
    setStatus({ type: "loading", message: "Submitting transaction..." });
    setTimeout(() => {
      setStatus({
        type: "success",
        message: `Funded ${amount} ${token} to the campaign.`,
      });
      setAmount("");
    }, 900);
  };

  if (!campaign) {
    return (
      <div className="min-h-full w-full flex items-center justify-center">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-zinc-300">
          <p className="mb-3">No campaign data found for ID {id}.</p>
          <Link
            to="/dashboard"
            className="primary-button inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white ring-1 ring-white/20 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-medium">{campaign.category}</span>
        </div>
      </div>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h1 className="text-2xl font-semibold text-zinc-100">
              {campaign.title}
            </h1>
            <p className="mt-2 text-sm text-zinc-300">{campaign.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
                <div className="text-zinc-200 font-semibold">Target</div>
                <div className="truncate">{campaign.targetAmount}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
                <div className="text-zinc-200 font-semibold">Collected</div>
                <div className="truncate">{campaign.amountCollected}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
                <div className="flex items-center gap-1 text-zinc-200 font-semibold">
                  <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
                  Deadline
                </div>
                <div className="truncate">{campaign.deadline}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                <span>
                  <span className="text-zinc-200 font-semibold">
                    Collected:
                  </span>{" "}
                  {collected}
                </span>
                <span>
                  <span className="text-zinc-200 font-semibold">Target:</span>{" "}
                  {target}
                </span>
              </div>
              <div className="relative h-2 w-full rounded-full bg-white/10 ring-1 ring-inset ring-white/10">
                <div
                  className="absolute left-0 top-0 h-2 rounded-full green-gradient shadow-[0_0_14px_-4px_rgba(217,70,239,0.5)]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="mt-2 text-right text-xs text-zinc-400">
                {progressPct}% funded
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 text-sm text-zinc-300">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                <FiUser
                  className="h-4.5 w-4.5 text-white/80"
                  aria-hidden="true"
                />
              </div>
              <div>
                <div className="text-zinc-200 font-semibold">Owner</div>
                <div className="truncate text-xs text-zinc-400">
                  {campaign.owner}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="text-lg font-semibold text-zinc-100">
              Fund this campaign
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Connect your wallet to fund securely on-chain.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleFund}>
              <div>
                <label className="text-xs text-zinc-400">Amount</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.1"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Token</label>
                <select
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                >
                  <option value="ETH">ETH</option>
                  <option value="USDC">USDC</option>
                  <option value="DAI">DAI</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!canFund}
                className="primary-button"
              >
                Fund Campaign
              </button>
            </form>

            {status && (
              <div
                className={
                  `mt-3 rounded-lg px-3 py-2 text-xs ` +
                  (status.type === "success"
                    ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                    : status.type === "error"
                      ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30"
                      : "bg-white/10 text-zinc-300 ring-1 ring-white/20")
                }
              >
                {status.message}
              </div>
            )}

            <p className="mt-4 text-[11px] text-zinc-500">
              You approve transactions from your wallet. No funds move without
              your consent.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default ViewCampaign;
