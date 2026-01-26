import { createContext, useContext, useEffect, useState } from "react";
import { getCampaigns } from "../utils/contractUtils";
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

  return (
    <CampaignsContext.Provider
      value={{ campaigns, setCampaigns, campaignsLoading, campaignsError }}
    >
      {children}
    </CampaignsContext.Provider>
  );
}

export { CampaignsContext, CampaignsProvider };
