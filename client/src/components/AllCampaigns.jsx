import React, { useContext } from "react";
import CampaignCard from "./CampaignCard";
import { CampaignsContext } from "../contexts/CampaignsContext";
import Loading from "./Loading";

function AllCampaigns() {
  const { campaigns, CampaignsLoading, CampaignsError } =
    useContext(CampaignsContext);

  if (CampaignsLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full h-full">
      <h1 className="text-2xl font-semibold mb-4">
        All Campaigns ({campaigns.length > 0 ? campaigns.length : 0})
      </h1>

      {campaigns.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-x-3 gap-y-6 place-items-center">
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index} campaign={{ ...campaign, id: index }} />
          ))}
        </div>
      ) : (
        <div className="h-full w-full flex items-center justify-center flex-col gap-4">
          <p className="text-zinc-400 text-lg">No campaigns found.</p>
        </div>
      )}
    </section>
  );
}

export default AllCampaigns;
