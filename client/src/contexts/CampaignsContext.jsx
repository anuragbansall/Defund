import { createContext, useContext, useEffect, useState } from "react";
import { getCampaigns, getCampaignById } from "../utils/contractUtils";
import { WalletContext } from "./WalletContext";

const CampaignsContext = createContext([]);

function CampaignsProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true);
  const [campaignsError, setCampaignsError] = useState(null);

  const { contract } = useContext(WalletContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setCampaignsLoading(true);
      setCampaignsError(null);

      try {
        const campaignsData = await getCampaigns(contract);

        setCampaigns(campaignsData);
      } catch (err) {
        setCampaignsError(err);
      } finally {
        setCampaignsLoading(false);
      }
    };

    if (contract) {
      fetchCampaigns();
    }
  }, [contract]);

  // Subscribe to contract events to update UI in real time
  useEffect(() => {
    if (!contract) return;

    const handleCampaignCreated = async (
      id /* BigInt */,
      owner,
      target,
      deadline,
    ) => {
      try {
        const campaign = await getCampaignById(contract, Number(id));
        if (!campaign) return;

        setCampaigns((prev) => {
          const exists = prev.some((c) => c.id === campaign.id);
          return exists
            ? prev.map((c) => (c.id === campaign.id ? campaign : c))
            : [...prev, campaign];
        });
      } catch (e) {
        console.error("CampaignCreated handler error:", e);
      }
    };

    const handleDonationMade = async (id /* BigInt */, donor, amount) => {
      try {
        const campaign = await getCampaignById(contract, Number(id));
        if (!campaign) return;

        setCampaigns((prev) =>
          prev.map((c) => (c.id === campaign.id ? campaign : c)),
        );
      } catch (e) {
        console.error("DonationMade handler error:", e);
      }
    };

    contract.on("CampaignCreated", handleCampaignCreated);
    contract.on("DonationMade", handleDonationMade);

    return () => {
      contract.off("CampaignCreated", handleCampaignCreated);
      contract.off("DonationMade", handleDonationMade);
    };
  }, [contract]);

  return (
    <CampaignsContext.Provider
      value={{ campaigns, setCampaigns, campaignsLoading, campaignsError }}
    >
      {children}
    </CampaignsContext.Provider>
  );
}

export { CampaignsContext, CampaignsProvider };
