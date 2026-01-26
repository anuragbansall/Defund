import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CampaignsContext } from "../../contexts/CampaignsContext";
import CampaignCard from "../common/CampaignCard";
import { IoWalletOutline } from "react-icons/io5";
import { MdCampaign, MdSecurity } from "react-icons/md";
import { FaEthereum, FaGlobeAmericas } from "react-icons/fa";

function Home() {
  const { campaigns = [] } = useContext(CampaignsContext);

  const stats = useMemo(() => {
    const totalCampaigns = campaigns.length;
    const totals = campaigns.reduce(
      (acc, c) => {
        const target = Number(c?.targetAmount ?? 0);
        const collected = Number(c?.amountCollected ?? 0);
        acc.target += isNaN(target) ? 0 : target;
        acc.collected += isNaN(collected) ? 0 : collected;
        return acc;
      },
      { target: 0, collected: 0 },
    );

    const fundedPct =
      totals.target > 0
        ? Math.min(100, Math.round((totals.collected / totals.target) * 100))
        : 0;

    return {
      totalCampaigns,
      totalRaised: totals.collected,
      totalTarget: totals.target,
      fundedPct,
    };
  }, [campaigns]);

  const featured = useMemo(() => campaigns.slice(0, 3), [campaigns]);

  return (
    <div className="h-full w-full space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 shadow-xl bg-[url('/hero-section-bg.jpg')] bg-cover bg-center z-0">
        <div className="absolute inset-0 bg-black/20 -z-1 backdrop-blur-sm">
          {/* overlay */}
          {/* overlay */}
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 opacity-30">
          <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-emerald-500/40 blur-3xl" />
          <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/40 blur-3xl" />
        </div>

        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 leading-normal">
            Fund ideas you believe in. Non‑custodial. On‑chain. Global.
          </h1>
          <p className="mt-3 text-zinc-300">
            Defund is a decentralized crowdfunding platform. Create campaigns,
            donate in ETH, and track progress transparently on-chain. Funds go
            directly to campaign owners — no intermediaries.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link to="/create-campaign" className="primary-button">
              <MdCampaign className="h-5 w-5" aria-hidden="true" />
              <span>Start a Campaign</span>
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition text-white text-center"
            >
              Explore Campaigns
            </Link>
          </div>
        </div>

        {/* Quick stats */}

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-white/10 bg-[#1C1C24]/60 p-4">
            <div className="text-xs text-zinc-400">Total Raised</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-100">
              {stats.totalRaised.toFixed(2)} ETH
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1C1C24]/60 p-4">
            <div className="text-xs text-zinc-400">Total Target</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-100">
              {stats.totalTarget.toFixed(2)} ETH
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#1C1C24]/60 p-4">
            <div className="text-xs text-zinc-400">Overall Progress</div>
            <div className="mt-3 h-2 w-full rounded-full bg-white/10 ring-1 ring-inset ring-white/10">
              <div
                className="h-2 green-gradient rounded-full"
                style={{ width: `${stats.fundedPct}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-zinc-300">
              {stats.fundedPct}% funded
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: IoWalletOutline,
            title: "Connect Wallet",
            description:
              "Use your preferred wallet to authenticate. Your keys never leave your device.",
          },
          {
            icon: MdCampaign,
            title: "Create Campaign",
            description:
              "Describe your idea, set a target and deadline, and publish on-chain.",
          },
          {
            icon: FaEthereum,
            title: "Donate in ETH",
            description:
              "Support campaigns instantly. Funds are sent directly to owners via the smart contract.",
          },
          {
            icon: FaGlobeAmericas,
            title: "Track Progress",
            description:
              "Everything is transparent and verifiable on-chain — no hidden balances.",
          },
        ].map((step, i) => (
          <div
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
            key={i}
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10 text-emerald-300">
              <step.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">
              {step.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-300">{step.description}</p>
          </div>
        ))}
      </section>

      {/* Product pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: MdSecurity,
            title: "Non‑custodial by design",
            description:
              "Defund never holds user funds. Donations flow directly to the campaign owner’s address using the contract’s payable function.",
          },
          {
            icon: FaEthereum,
            title: "On‑chain transparency",
            description:
              "Campaign data, donations, and totals are stored on-chain and can be independently verified by anyone.",
          },
          {
            icon: FaGlobeAmericas,
            title: "Open and global",
            description:
              "Anyone can create a campaign or donate from anywhere. All you need is a wallet and ETH.",
          },
        ].map((pillar, i) => (
          <div
            className="rounded-2xl border border-white/10 bg-[#1C1C24] p-6"
            key={i}
          >
            <div className="flex items-center gap-2 text-emerald-300">
              <pillar.icon className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-zinc-100">
                {pillar.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">{pillar.description}</p>
          </div>
        ))}
      </section>

      {/* Featured campaigns */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Campaigns</h2>
          <Link
            to="/dashboard"
            className="text-sm text-emerald-300 hover:text-emerald-200"
          >
            View all
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-3 gap-y-6 place-items-center">
            {featured.map((c, i) => (
              <CampaignCard key={i} campaign={{ ...c, id: i }} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-zinc-400">
            No campaigns yet. Be the first to{" "}
            <Link
              to="/create-campaign"
              className="text-emerald-300 hover:text-emerald-200"
            >
              create one
            </Link>
            !
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
