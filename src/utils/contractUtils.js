import { ethers, formatUnits, parseEther } from "ethers";

export const createCampaign = async (contract, contractData) => {
  try {
    const tx = await contract.createCampaign(
      contractData.owner,
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
    return false;
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
    return false;
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

    const campaigns = tx.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      targetAmount: formatUnits(campaign.target, "ether"),
      deadline: Number(campaign.deadline),
      amountCollected: formatUnits(campaign.amountCollected, "ether"),
      image: campaign.image,
      category: "General",
    }));

    console.log(tx[2]);
    console.log(tx[2].amountCollected);

    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};

export const getNumberOfCampaigns = async (contract) => {
  try {
    const tx = await contract.getNumberOfCampaigns();
    return tx.toNumber();
  } catch (error) {
    console.error("Error fetching number of campaigns:", error);
    return 0;
  }
};
