import React from "react";
import CampaignCard from "./CampaignCard";

function AllCampaigns() {
  const campaigns = [
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
    {
      image:
        "https://images.wallpapersden.com/image/download/assassins-s-creed-shadows-4k-gaming_bmdtZWmUmZqaraWkpJRobWllrWdmbm4.jpg",
      category: "Education",
      title: "Build a School in Africa",
      description:
        "Help us build a school in a remote village in Africa to provide education for underprivileged children.",
      targetAmount: "5 ETH",
      amountCollected: "3 ETH",
      deadline: "2023-12-31",
      owner: "0x1234...abcd",
    },
  ];
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-4">All Campaigns (2)</h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-2">
        {campaigns.map((campaign, index) => (
          <CampaignCard key={index} campaign={{ ...campaign, id: index + 1 }} />
        ))}
      </div>
    </section>
  );
}

export default AllCampaigns;
