<div align="center">

   <img src="/client/public/logo.png" alt="Defund Logo" height="96" />

   <h1>Defund — Decentralized Crowdfunding on Ethereum (Sepolia)</h1>
   <p>
      Create impactful campaigns, discover causes, and fund transparently using MetaMask on the Sepolia testnet.
   </p>

   <p>
      Built with Solidity · Remix · React + Vite · Cloudflare Workers · MetaMask
   </p>

</div>

---

## Overview

Defund is a non‑custodial, decentralized crowdfunding platform. Campaigns are created and funded directly on Ethereum (Sepolia testnet) via MetaMask, ensuring transparency and on‑chain accountability. An integrated AI helper refines campaign inputs to make titles and descriptions more impactful.

### Key Features

- Create campaigns with title, description, target amount, deadline, and image
- Fund campaigns using your MetaMask wallet (Sepolia ETH for testing)
- AI assist to improve your campaign content with one click
- View all campaigns on a dashboard and drill into details
- Live Ethereum price chart with INR conversion (ETH ↔ INR)

---

## Screenshots

<table>
   <tr>
      <td align="center">
         <img src="/client/public/demo/dashboard.png" alt="Dashboard" width="480" /><br />Dashboard — browse active campaigns
      </td>
      <td align="center">
         <img src="/client/public/demo/view-campaign.png" alt="View Campaign" width="480" /><br />Campaign details — fund with MetaMask
      </td>
   </tr>
   <tr>
      <td align="center">
         <img src="/client/public/demo/create-campaign.png" alt="Create Campaign" width="480" /><br />Create campaign — AI enhances content
      </td>
      <td align="center">
         <img src="/client/public/demo/ethereum.png" alt="Ethereum Page" width="480" /><br />ETH price chart — convert ETH ↔ INR
      </td>
   </tr>
</table>

---

## Tech Stack

- Smart Contracts: Solidity (deployed via Remix to Sepolia)
- Wallet: MetaMask (Browser extension)
- Frontend: React + Vite
- AI Helper: Cloudflare Worker (HTTP API)
- Price + Conversion: CoinGecko API (demo environment)
- Media: Unsplash API for images

---

## Architecture

```
React (Vite) ───────────▶ MetaMask ───────────▶ Ethereum (Sepolia)
   │                         ▲                         ▲
   │                         │                         │
   │    POST /enhance-campaign│                         │
   ├──────────▶ Cloudflare Worker (AI)                  │
   │                                                 Read/Write
   │                              ───────────▶ Defund Smart Contract
   │
   ├──────────▶ CoinGecko (ETH price, INR conversion)
   └──────────▶ Unsplash (campaign images)
```

---

## Prerequisites

- Node.js 18+ and npm
- MetaMask installed in your browser
- Sepolia test ETH in your MetaMask account
- A deployed Defund contract address on Sepolia

---

## Environment Setup

Create a `.env` file in the `client` folder with the following variables:

```env
# Sepolia Defund contract address (from your Remix deployment)
VITE_CONTRACT_ADDRESS=0xYourSepoliaContractAddress

# Unsplash API access key (for campaign images)
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# CoinGecko demo API key (for ETH price + conversion)
VITE_COINGECKO_API_KEY=your_coingecko_demo_key
```

Notes:

- Contract address is read in `src/utils/connectToWallet.js`.
- Unsplash key is used by `src/api/unsplashInstance.js`.
- CoinGecko key is used by `src/utils/getEthPrice.js` (demo environment).
- The AI helper is configured to call a Cloudflare Worker at `https://ai-worker.defund-ai.workers.dev` via `src/api/aiWorkerInstance.js`. If you deploy your own worker, update that base URL accordingly.

---

## Run Locally

From the `client` directory:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

The app expects MetaMask to be available in the browser and your network set to Sepolia.

---

## Pages

1. Dashboard
   - Lists all campaigns pulled from the Defund smart contract.
   - Click a campaign to view details, donators, and funding history.

2. Create Campaign
   - Input title, description, target amount (ETH), deadline, and image URL.
   - Use the “AI” button to refine your content for better impact.
   - Submits `createCampaign` to the Defund contract via MetaMask.

3. Ethereum Page
   - Live ETH price chart.
   - Simple ETH ↔ INR conversion powered by CoinGecko.

---

## Smart Contract Workflow

- Deploy the Defund contract to Sepolia using Remix.
- Copy the deployed address into `VITE_CONTRACT_ADDRESS`.
- The frontend reads campaigns via `getCampaigns`, creates new ones via `createCampaign`, and funds via `donateToCampaign` using MetaMask/ethers.

---

## Contract Interface (Frontend)

Core functions used by the client:

- `getCampaigns` — fetches all campaigns (owner, title, description, target, deadline, amountCollected, image)
- `createCampaign` — creates a new campaign (writes on-chain)
- `donateToCampaign` — funds a campaign with ETH
- `getDonators` — returns donors and donation amounts for a given campaign
- `numberOfCampaigns` — returns total count

Implementation references:

- Connect and ABI: [client/src/utils/connectToWallet.js](client/src/utils/connectToWallet.js)
- Contract helpers: [client/src/utils/contractUtils.js](client/src/utils/contractUtils.js)

---

## AI Helper

The Create Campaign page includes an AI button that augments your inputs to be more compelling. This is served by a Cloudflare Worker (see `ai-worker/`). If you run your own worker:

1. Deploy with Wrangler to your Cloudflare account.
2. Update the base URL in `src/api/aiWorkerInstance.js` to point at your worker domain.

---

## AI Worker API

- Base: your Cloudflare Worker (e.g., `https://ai-worker.defund-ai.workers.dev`)
- Endpoint: `POST /enhance-campaign`
- Request (JSON):

```json
{
  "title": "...",
  "description": "...",
  "category": "General",
  "targetEth": 1.5,
  "deadline": "2026-02-28T00:00:00.000Z"
}
```

- Response (JSON):

```json
{
  "enhancedTitle": "...",
  "enhancedDescription": "..."
}
```

- Status codes: `200` (OK), `400` (invalid body), `404` (unknown path), `405` (method not allowed), `500/503` (service unavailable/config error)
- CORS: Enabled for `POST, OPTIONS` with `Access-Control-Allow-Origin: *`

Source: [ai-worker/src/index.js](ai-worker/src/index.js)

---

## AI Worker: Development & Deployment

From the `ai-worker` directory:

```bash
npm install
# Set secret for Groq API key (do not commit secrets)
wrangler secret put GROQ_API_KEY

# Local dev
npm run dev

# Deploy
npm run deploy
```

Optional local `.dev.vars` can store non-sensitive dev values. Update the client base URL in [client/src/api/aiWorkerInstance.js](client/src/api/aiWorkerInstance.js) after deployment if your domain changes.

---

## Full-Stack Development

Run the worker and client in separate terminals:

```bash
# Terminal 1: AI Worker
cd ai-worker
npm install
npm run dev

# Terminal 2: Client
cd client
npm install
npm run dev
```

Ensure MetaMask is on Sepolia. Set env variables in `client/.env` before starting.

---

## Troubleshooting

- MetaMask not installed: Install the extension and refresh the page.
- Wrong network: Switch MetaMask to Sepolia; reconnect wallet.
- Pending request: MetaMask may show `-32002`; cancel the pending request or wait, then retry.
- User rejected request: Error `4001`; re-initiate connect and approve.
- No campaigns visible: Verify `VITE_CONTRACT_ADDRESS` points to a valid deployed contract.
- AI helper errors: Confirm the worker is running and `GROQ_API_KEY` is set via Wrangler secrets.

---

## Data & Services

- CoinGecko (demo): ETH price and conversions. Provide a demo API key in `.env`.
- Unsplash: Image search and retrieval. Provide a Client ID in `.env`.

---

## Best Practices & Notes

- Testnet only: Defund currently targets Sepolia for safe testing — do not use real funds.
- Gas fees: Funding campaigns incurs standard Sepolia gas fees.
- Transparency: All campaign activity (creation, funding) is recorded on-chain.

---

## Folder Structure (client)

```
client/
   public/
      logo.png
      demo/
         dashboard.png
         view-campaign.png
         create-campaign.png
         ethereum.png
   src/
      api/
         aiWorkerInstance.js
         unsplashInstance.js
      components/
      contexts/
      utils/
         connectToWallet.js
         contractUtils.js
         getEthPrice.js
```

---

## Acknowledgements

- Ethereum & Sepolia testnet community
- CoinGecko API
- Unsplash
- Cloudflare Workers

---

## Roadmap

- WalletConnect support
- On-chain categories and search
- Campaign updates and milestones
- Multi-currency support and localization

---

## Disclaimer

This is an educational/testnet project. Always verify contracts and endpoints before use. No guarantees or warranties are provided.
