import React from "react";
import { FiClock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

function CampaignCard({ campaign }) {
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

  return (
    <Link
      to={`/campaign/${campaign.id}`}
      state={{ campaign }}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition hover:border-white/20 hover:shadow-xl"
    >
      <div className="relative">
        <img
          src={campaign.image}
          alt={campaign.title}
          className="h-52 w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent opacity-90" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white ring-1 ring-white/20 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-medium">{campaign.category}</span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-100">
          {campaign.title}
        </h2>
        <p className="mt-1 text-sm text-zinc-300 line-clamp-3">
          {campaign.description}
        </p>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
            <span>
              <span className="text-zinc-200 font-semibold">Collected:</span>{" "}
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

        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
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

        <div className="mt-4 flex items-center gap-3 text-sm text-zinc-300">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
            <FiUser className="h-4 w-4 text-white/80" aria-hidden="true" />
          </div>
          <div>
            <div className="text-zinc-200 font-semibold">Owner</div>
            <div className="truncate text-xs text-zinc-400">
              {campaign.owner}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CampaignCard;
