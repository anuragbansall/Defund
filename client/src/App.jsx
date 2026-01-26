import React, { useContext } from "react";
import { WalletContext } from "./contexts/WalletContext";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MainApplication from "./components/common/MainApplication";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCampaign from "./components/createCampaign/CreateCampaign";
import ViewCampaign from "./components/dashboard/ViewCampaign";
import EthereumPage from "./components/ethereum/EthereumPage";
import WalletNotConnected from "./components/common/WalletNotConnected";

function App() {
  const { connectedAccount, isConnecting } = useContext(WalletContext);

  if (!connectedAccount || isConnecting) {
    return <WalletNotConnected />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainApplication />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<ViewCampaign />} />
          <Route path="/ethereum" element={<EthereumPage />} />
        </Route>
      </Routes>

      <Analytics />
    </>
  );
}

export default App;
