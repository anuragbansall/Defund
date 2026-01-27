import React, { useContext, useMemo, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { createCampaign } from "../../utils/contractUtils";
import { parseEther } from "ethers";
import { GiArtificialIntelligence } from "react-icons/gi";
import aiWorkerInstance from "../../api/aiWorkerInstance";
import findPhoto from "../../utils/findPhoto";
import CampaignCard from "../common/CampaignCard";
import MessagePopup from "../common/MessagePopup";

function CreateCampaign() {
  const { contract, connectedAccount } = useContext(WalletContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Education",
    targetAmount: "",
    deadline: "",
    image: "",
    imageKeyword: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isAIMakingImpactful, setIsAIMakingImpactful] = useState(false);
  const [isFindingImage, setIsFindingImage] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const previewCampaign = useMemo(
    () => ({
      id: 0,
      image: form.image || "/img-placeholder-dark.jpg",
      category: form.category || "General",
      title: form.title || "Your campaign title",
      description:
        form.description ||
        "Describe the purpose, impact, and how funds will be used.",
      targetAmount: form.targetAmount || "5 ETH",
      amountCollected: "0",
      deadline: form.deadline,
      owner: connectedAccount || "0xYourWallet...",
    }),
    [form, connectedAccount],
  );

  const isValid = Boolean(
    form.title &&
    form.description &&
    form.targetAmount &&
    form.deadline &&
    form.image,
  );

  const canSubmit = Boolean(contract && connectedAccount) && isValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract || !connectedAccount) {
      setError("Please connect your wallet to create a campaign.");
      return;
    }

    if (!isValid || !canSubmit) {
      setError("Please fill all required fields.");
      return;
    }

    if (isCreating || isAIMakingImpactful || isFindingImage) return; // Prevent multiple submissions

    setError(null);
    setSuccess(null);

    try {
      setIsCreating(true);
      const deadlineTimestamp = new Date(form.deadline).getTime();

      const deadlineTimestampSec = Math.floor(deadlineTimestamp / 1000);

      const success = await createCampaign(contract, {
        title: form.title,
        description: form.description,
        target: parseEther(form.targetAmount),
        deadline: deadlineTimestampSec,
        image: form.image,
      });

      if (success) {
        setSuccess("Campaign created successfully!");
        setForm({
          title: "",
          description: "",
          category: "Education",
          targetAmount: "",
          deadline: "",
          image: "",
          imageKeyword: "",
        });
      } else {
        setError("Failed to create campaign. Please try again.");
        setIsCreating(false);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);

      if (error.code === "ACTION_REJECTED") {
        setError("Transaction was rejected by the user.");
      }

      if (error.code === "INSUFFICIENT_FUNDS") {
        setError("Insufficient funds to complete the transaction.");
      }

      const rspMsg = error?.info?.error?.message || error.message || null;

      if (rspMsg) {
        setError(`Error: ${rspMsg}`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleAIMakeImpactful = async () => {
    if (isAIMakingImpactful || isCreating || isFindingImage) return; // Prevent multiple clicks

    setIsAIMakingImpactful(true);
    setError(null);
    setSuccess(null);

    try {
      const data = {
        title: form.title,
        description: form.description,
        category: form.category,
        targetEth: form.targetAmount,
        deadline: form.deadline,
      };

      setIsAIMakingImpactful(true);

      const response = await aiWorkerInstance.post("/enhance-campaign", data);

      console.log("AI enhancement response:", response);

      if (response.data) {
        const { enhancedTitle, enhancedDescription } = response.data;

        setForm((f) => ({
          ...f,
          title: enhancedTitle || f.title,
          description: enhancedDescription || f.description,
        }));

        setSuccess("Campaign content enhanced successfully!");
      } else {
        setError("Failed to enhance campaign content. Please try again.");
      }
    } catch (error) {
      console.error("AI enhancement error:", error);
      setError("Failed to enhance campaign content. Please try again.");
      setIsAIMakingImpactful(false);
    } finally {
      setIsAIMakingImpactful(false);
    }
  };

  const handleFindImage = async (keyword) => {
    try {
      if (isFindingImage || isCreating || isAIMakingImpactful) return;

      setIsFindingImage(true);
      setError(null);
      setSuccess(null);

      const image = await findPhoto(keyword);

      if (image) {
        setForm((f) => ({ ...f, image }));
        setSuccess("Image found and set successfully!");
      } else {
        setError("No image found for the given keyword.");
      }
    } catch (error) {
      console.error("Find image error:", error);
      setError("Failed to find image. Please try again.");
      setIsFindingImage(false);
    } finally {
      setIsFindingImage(false);
    }
  };

  const handleCloseMessage = (type) => {
    if (type === "error") {
      setError(null);
    } else if (type === "success") {
      setSuccess(null);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <h1 className="text-2xl font-semibold text-zinc-100">
            Create a Campaign
          </h1>
          <p className="mt-1 text-sm text-zinc-300">
            Connect your wallet and contract to continue and publish your
            campaign.
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

            <div className="flex flex-col md:flex-row gap-2 w-full items-center">
              <div className="flex-1">
                <label className="text-xs text-zinc-400">Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={onChange}
                  placeholder="https://..."
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>

              <div className="flex-1">
                <label className="text-xs text-zinc-400">
                  {" "}
                  Find Image by Keyword
                </label>
                <input
                  name="imageKeyword"
                  value={form.imageKeyword}
                  onChange={onChange}
                  placeholder="Search image keyword..."
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                type="submit"
                disabled={!canSubmit || isCreating || isAIMakingImpactful}
                className="primary-button"
              >
                {isCreating ? "Creating..." : "Create Campaign"}
              </button>

              <button
                type="button"
                disabled={!canSubmit || isCreating || isAIMakingImpactful}
                className="primary-button"
                onClick={handleAIMakeImpactful}
              >
                <GiArtificialIntelligence />
                {isAIMakingImpactful
                  ? " Enhancing..."
                  : " AI Make it Impactful"}
              </button>

              <button
                type="button"
                disabled={
                  !form.imageKeyword ||
                  isFindingImage ||
                  isAIMakingImpactful ||
                  isCreating
                }
                className="primary-button"
                onClick={() => handleFindImage(form.imageKeyword)}
              >
                {isFindingImage ? "Finding..." : " Find Image"}
              </button>
            </div>

            {error && (
              <MessagePopup
                type="error"
                message={error}
                onClose={() => {
                  handleCloseMessage("error");
                }}
              />
            )}
            {success && (
              <MessagePopup
                type="success"
                message={success}
                onClose={() => {
                  handleCloseMessage("success");
                }}
                className="mt-4"
              />
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

          <div className="pointer-events-none mt-2">
            <CampaignCard campaign={previewCampaign} />
          </div>
        </div>
      </aside>
    </section>
  );
}

export default CreateCampaign;
