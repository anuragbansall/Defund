import React, { useContext, useMemo, useState } from "react";
import { WalletContext } from "../contexts/WalletContext";
import CampaignCard from "./CampaignCard";

function CreateCampaign() {
  const { wallet } = useContext(WalletContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Education",
    targetAmount: "",
    deadline: "",
    image: "",
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const targetDisplay = useMemo(() => {
    const n = parseFloat(form.targetAmount);
    return isNaN(n) || n <= 0 ? "" : `${n} ETH`;
  }, [form.targetAmount]);

  const previewCampaign = useMemo(
    () => ({
      id: 0,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop",
      category: form.category || "General",
      title: form.title || "Your campaign title",
      description:
        form.description ||
        "Describe the purpose, impact, and how funds will be used.",
      targetAmount: targetDisplay || "5 ETH",
      amountCollected: "0 ETH",
      deadline: form.deadline || "YYYY-MM-DD",
      owner: wallet || "0xYourWallet...",
    }),
    [form, wallet, targetDisplay],
  );

  const isValid = Boolean(
    form.title &&
    form.description &&
    targetDisplay &&
    form.deadline &&
    form.image,
  );
  const canSubmit = Boolean(wallet) && isValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wallet) {
      setStatus({
        type: "error",
        message: "Connect your wallet to create a campaign.",
      });
      return;
    }
    if (!isValid) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }
    setStatus({ type: "loading", message: "Creating campaign on-chain..." });
    setTimeout(() => {
      setStatus({
        type: "success",
        message: "Campaign created successfully (demo).",
      });
    }, 900);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h1 className="text-2xl font-semibold text-zinc-100">
            Create a Campaign
          </h1>
          <p className="mt-1 text-sm text-zinc-300">
            Connect your wallet to continue and publish your campaign.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-zinc-400">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Build a School in Africa"
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                rows={4}
                placeholder="Explain the purpose, impact, milestones, and how funds will be used."
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-zinc-400">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                >
                  <option>Education</option>
                  <option>Health</option>
                  <option>Environment</option>
                  <option>Community</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400">Target (ETH)</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  name="targetAmount"
                  value={form.targetAmount}
                  onChange={onChange}
                  placeholder="5"
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={onChange}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={onChange}
                placeholder="https://..."
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
              />
              <p className="mt-1 text-[11px] text-zinc-500">
                Use a high-quality image to increase trust and engagement.
              </p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="primary-button"
            >
              Create Campaign
            </button>

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

            {!wallet && (
              <p className="mt-3 text-[11px] text-zinc-500">
                Connect your wallet to continue. Your keys stay on your device;
                no funds move without approval.
              </p>
            )}
          </form>
        </div>
      </div>

      <aside className="lg:col-span-1">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-zinc-100">Live Preview</h2>
          <p className="mt-1 text-xs text-zinc-400">
            See how your campaign card will look.
          </p>
          <div className="mt-4 pointer-events-none">
            <CampaignCard campaign={previewCampaign} />
          </div>
        </div>
      </aside>
    </section>
  );
}

export default CreateCampaign;
