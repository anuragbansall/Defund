import React from "react";
import { Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import MainApplication from "./components/common/MainApplication";
import EthereumPage from "./components/ethereum/EthereumPage";
import Home from "./components/home/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Campaigns from "./components/campaign/Campaigns";
import CreateCampaign from "./components/campaign/CreateCampaign";
import ViewCampaign from "./components/campaign/ViewCampaign";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainApplication />}>
          <Route index element={<Home />} />
          <Route
            path="/campaigns"
            element={
              <ProtectedRoute>
                <Campaigns />
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
            path="/campaigns/:id"
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
