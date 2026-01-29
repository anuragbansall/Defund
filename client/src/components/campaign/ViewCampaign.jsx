import React, { useState, useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { FiClock, FiUser } from "react-icons/fi";
import { WalletContext } from "../../contexts/WalletContext";
import { donateToCampaign } from "../../utils/contractUtils";
import Confetti from "react-confetti";
import { FaEthereum } from "react-icons/fa";
import { CampaignsContext } from "../../contexts/CampaignsContext";
import MessagePopup from "../common/MessagePopup";
import Loading from "../common/Loading";

function ViewCampaign() {
  const { id } = useParams();
  const { connectedAccount, contract } = useContext(WalletContext);
  const { campaigns, campaignsLoading } = useContext(CampaignsContext);

  const campaignFromList = useMemo(
    () => campaigns.find((c) => String(c.id) === String(id)),
    [campaigns, id],
  );

  const campaign = campaignFromList || null;

  const target = campaign?.targetAmount;
  const collected = campaign?.amountCollected;

  const progressPct =
    target > 0 ? Math.min(100, Math.round((collected / target) * 100)) : 0;

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("ETH");
  const [isFunding, setIsFunding] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const canFund = Boolean(connectedAccount) && amount && parseFloat(amount) > 0;

  const isFundingGoalReached = campaign?.isCompleted || collected >= target;

  console.log("Funding goal reached:", isFundingGoalReached);

  const handleFund = async (e) => {
    e.preventDefault();
    if (isFunding) return;
    if (!canFund) return;

    setError(null);
    setSuccess(null);

    if (!connectedAccount) {
      setError("Connect your wallet to fund this campaign.");
      return;
    }

    try {
      setIsFunding(true);

      const success = await donateToCampaign(contract, id, amount);

      setIsFunding(false);
      if (success) {
        setSuccess(`Funded ${amount} ${token} to the campaign.`);
        setAmount("");
      }
    } catch (error) {
      if (error.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient funds in your wallet.");
        return;
      }

      if (error.code === "ACTION_REJECTED") {
        setError("Transaction rejected in wallet.");
        return;
      }

      const rspMsg = error?.info?.error?.message || error.message || null;

      if (rspMsg) {
        setError(`Transaction failed: ${rspMsg}`);
      } else {
        setError("Transaction failed. Please try again.");
      }
    } finally {
      setIsFunding(false);
    }
  };

  const handleCloseMessage = (type) => {
    if (type === "error") {
      setError(null);
    } else if (type === "success") {
      setSuccess(null);
    }
  };

  if (campaignsLoading) {
    return <Loading />;
  }

  if (!campaign) {
    return (
      <div className="min-h-full w-full flex items-center justify-center">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-zinc-300">
          <p className="mb-3">No campaign data found for ID {id}.</p>
          <Link
            to="/"
            className="primary-button inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden h-full overflow-y-auto">
      {isFundingGoalReached && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Confetti />
        </div>
      )}

      <section className="flex flex-col md:flex-row w-full h-full justify-between gap-6 md:gap-8">
        {/* Left Column */}
        <div className="flex flex-col grow">
          <div className="relative h-48 sm:h-56 md:min-h-60 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img-placeholder-dark.jpg";
              }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white ring-1 ring-white/20 backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-medium">{campaign.category}</span>
            </div>
          </div>

          <div className="mt-6 w-full gap-6">
            <div className="w-full">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h1 className="text-2xl font-semibold text-zinc-100">
                  {campaign.title}
                </h1>
                <p className="mt-2 text-sm text-zinc-300">
                  {campaign.description}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
                    <div className="text-zinc-200 font-semibold">Target</div>
                    <div className="truncate flex items-center gap-1 py-1">
                      <FaEthereum />
                      {campaign.targetAmount} ETH
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
                    <div className="text-zinc-200 font-semibold">Collected</div>
                    <div className="truncate flex items-center gap-1 py-1">
                      <FaEthereum />
                      {campaign.amountCollected} ETH
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-300">
                    <div className="flex items-center gap-1 text-zinc-200 font-semibold">
                      <FiClock className="h-3.5 w-3.5" aria-hidden="true" />
                      Deadline
                    </div>
                    <div className="truncate">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </div>
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
                      <span className="text-zinc-200 font-semibold">
                        Target:
                      </span>{" "}
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

                {isFundingGoalReached && (
                  <MessagePopup
                    type="success"
                    message="🎉 Funding goal reached! Thank you to all contributors."
                    onClose={() => handleCloseMessage("success")}
                    className="mt-6"
                  />
                )}

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
          </div>
        </div>

        {/* Right Column */}
        <aside className="w-200 h-auto md:h-full bg-green-900/5 mt-6 md:mt-0 shrink-0 md:max-w-100">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md h-full flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-zinc-100">
              Fund this campaign
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
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
                  <option value="ETH" title="Ethereum">
                    ETH
                  </option>
                  <option value="BTC" disabled title="Coming Soon">
                    BTC
                  </option>
                  <option value="SOL" disabled title="Coming Soon">
                    SOL
                  </option>
                </select>
              </div>

              {error && (
                <MessagePopup
                  type="error"
                  message={error}
                  onClose={() => handleCloseMessage("error")}
                  className="mt-4"
                />
              )}

              {success && (
                <MessagePopup
                  type="success"
                  message={success}
                  onClose={() => handleCloseMessage("success")}
                  className="mt-4"
                />
              )}

              <button
                type="submit"
                disabled={!canFund || isFunding}
                className="primary-button w-full mt-8"
              >
                {isFunding ? "Funding..." : "Fund Campaign"}
              </button>
            </form>

            <p className="mt-4 text-sm text-zinc-500">
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
