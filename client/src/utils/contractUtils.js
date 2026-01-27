import { ethers, formatUnits, parseEther } from "ethers";

export const createCampaign = async (contract, contractData) => {
  try {
    const tx = await contract.createCampaign(
      contractData.title,
      contractData.description,
      contractData.target,
      contractData.deadline,
      contractData.image,
    );
    await tx.wait();

    return true;
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw error;
  }
};

export const donateToCampaign = async (contract, campaignId, amount) => {
  try {
    const tx = await contract.donateToCampaign(campaignId, {
      value: parseEther(amount.toString()),
    });

    await tx.wait();
    return true;
  } catch (error) {
    console.error("Error donating to campaign:", error);
    throw error;
  }
};

export const getDonators = async (contract, campaignId) => {
  try {
    const tx = await contract.getDonators(campaignId);
    return tx;
  } catch (error) {
    console.error("Error fetching donators:", error);
    return [];
  }
};

export const getCampaigns = async (contract) => {
  try {
    const tx = await contract.getCampaigns();

    const campaigns = tx.map((campaign) => ({
      id: Number(campaign.id),
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      targetAmount: formatUnits(campaign.target, "ether"),
      // Convert seconds to milliseconds for JS Date
      deadline: Number(campaign.deadline) * 1000,
      amountCollected: formatUnits(campaign.amountCollected, "ether"),
      image: campaign.image,
      isCompleted: Boolean(campaign.isCompleted),
      category: "General",
    }));

    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};

export const getCampaignById = async (contract, campaignId) => {
  try {
    const c = await contract.campaigns(campaignId);

    return {
      id: Number(c.id),
      owner: c.owner,
      title: c.title,
      description: c.description,
      targetAmount: formatUnits(c.target, "ether"),
      deadline: Number(c.deadline) * 1000,
      amountCollected: formatUnits(c.amountCollected, "ether"),
      image: c.image,
      isCompleted: Boolean(c.isCompleted),
      category: "General",
    };
  } catch (error) {
    console.error("Error fetching campaign by id:", error);
    return null;
  }
};

export const getNumberOfCampaigns = async (contract) => {
  try {
    const tx = await contract.numberOfCampaigns();
    return tx.toNumber();
  } catch (error) {
    console.error("Error fetching number of campaigns:", error);
    return 0;
  }
};
