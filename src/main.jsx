import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WalletProvider } from "./contexts/WalletContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CampaignsProvider } from "./contexts/CampaignsContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WalletProvider>
      <CampaignsProvider>
        <App />
      </CampaignsProvider>
    </WalletProvider>
  </BrowserRouter>,
);
