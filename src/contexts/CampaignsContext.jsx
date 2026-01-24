import { createContext, useContext, useEffect, useState } from "react";
import { getCampaigns } from "../utils/contractUtils";
import { WalletContext } from "./WalletContext";

const CampaignsContext = createContext([]);

function CampaignsProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [CampaignsLoading, setCampaignsLoading] = useState(true);
  const [CampaignsError, setCampaignsError] = useState(null);

  const { contract } = useContext(WalletContext); // Ensure you have access to the contract context

  useEffect(() => {
    const fetchCampaigns = async () => {
      setCampaignsLoading(true);
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

  return (
    <CampaignsContext.Provider
      value={{ campaigns, setCampaigns, CampaignsLoading, CampaignsError }}
    >
      {children}
    </CampaignsContext.Provider>
  );
}

export { CampaignsContext, CampaignsProvider };
