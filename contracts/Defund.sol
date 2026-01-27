// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Defund {
    struct Campaign {
        uint256 id;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isCompleted;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    /* ───────────── EVENTS ───────────── */

    event CampaignCreated(
        uint256 indexed id,
        address indexed owner,
        uint256 target,
        uint256 deadline
    );

    event DonationMade(
        uint256 indexed id,
        address indexed donor,
        uint256 amount
    );

    /* ───────────── CREATE CAMPAIGN ───────────── */

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) external returns (uint256) {
        require(_target > 0, "Target must be greater than zero");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.id = numberOfCampaigns;
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isCompleted = false;

        emit CampaignCreated(numberOfCampaigns, msg.sender, _target, _deadline);

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    /* ───────────── DONATE ───────────── */

    function donateToCampaign(uint256 _id) external payable {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        require(msg.value > 0, "Donation must be greater than zero");

        Campaign storage campaign = campaigns[_id];

        require(!campaign.isCompleted, "Campaign already completed");
        require(campaign.deadline > block.timestamp, "Deadline has passed");
        require(
            campaign.amountCollected + msg.value <= campaign.target,
            "Donation exceeds target"
        );

        /* Effects */
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        campaign.amountCollected += msg.value;

        if (campaign.amountCollected == campaign.target) {
            campaign.isCompleted = true;
        }

        emit DonationMade(_id, msg.sender, msg.value);

        /* Interaction */
        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "ETH transfer failed");
    }

    /* ───────────── GETTERS ───────────── */

    function getDonators(
        uint256 _id
    ) external view returns (address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }
}
