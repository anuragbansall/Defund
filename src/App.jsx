import React, { useContext } from "react";
import { WalletContext } from "./contexts/WalletContext";
import MainApplication from "./components/MainApplication";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateCampaign from "./components/CreateCampaign";
import WalletNotConnected from "./components/WalletNotConnected";
import ViewCampaign from "./components/ViewCampaign";

function App() {
  const { wallet, setWallet, contract, setContract } =
    useContext(WalletContext);

  // TODO: Uncomment when ready to test wallet connection flow
  // if (!wallet) {
  //   return <WalletNotConnected />;
  // }

  return (
    <Routes>
      <Route path="/" element={<MainApplication />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/campaign/:id" element={<ViewCampaign />} />
      </Route>
    </Routes>
  );
}

export default App;
