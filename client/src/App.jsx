import React, { useContext } from "react";
import { WalletContext } from "./contexts/WalletContext";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MainApplication from "./components/common/MainApplication";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCampaign from "./components/createCampaign/CreateCampaign";
import ViewCampaign from "./components/dashboard/ViewCampaign";
import EthereumPage from "./components/ethereum/EthereumPage";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainApplication />}>
          <Route index element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-campaign"
            element={
              <ProtectedRoute>
                <CreateCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaign/:id"
            element={
              <ProtectedRoute>
                <ViewCampaign />
              </ProtectedRoute>
            }
          />
          <Route path="/ethereum" element={<EthereumPage />} />
        </Route>
      </Routes>

      <Analytics />
    </>
  );
}

export default App;
