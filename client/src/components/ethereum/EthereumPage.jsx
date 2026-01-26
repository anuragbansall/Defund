import React, { useState } from "react";
import EthereumPriceChart from "./EthereumPriceChart";
import { convertEthToInr, convertInrToEth } from "../../utils/getEthPrice";

function EthereumPage() {
  const [ethAmount, setEthAmount] = useState("");
  const [inrAmount, setInrAmount] = useState("");

  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const handleEthChange = async (e) => {
    const ethValue = e.target.value;
    setEthAmount(ethValue);
    setInrAmount("");
  };

  const handleInrChange = async (e) => {
    const inrValue = e.target.value;
    setInrAmount(inrValue);
    setEthAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isConverting) return;
    if (!ethAmount && !inrAmount) return;

    setIsConverting(true);
    setError(null);

    try {
      if (ethAmount && !inrAmount) {
        const inrValue = await convertEthToInr(Number(ethAmount));
        setInrAmount(inrValue.toFixed(2));
      }

      if (inrAmount && !ethAmount) {
        const ethValue = await convertInrToEth(Number(inrAmount));
        setEthAmount(ethValue.toFixed(6));
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="md:p-6 w-full h-full">
      <h1 className="text-3xl font-bold mb-6">Ethereum Price Chart</h1>
      <section className="mb-8 w-full bg-zinc-800/20 rounded-lg">
        <EthereumPriceChart />
      </section>

      <h2 className="text-2xl font-semibold mb-4">Convert ETH to INR</h2>
      <section className="w-full bg-zinc-800/20 rounded-lg p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="ethAmount"
                className="block text-sm font-medium mb-2"
              >
                Amount in ETH:
              </label>
              <input
                type="number"
                id="ethAmount"
                className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600"
                placeholder="Enter amount in ETH"
                value={ethAmount}
                onChange={handleEthChange}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="inrAmount"
                className="block text-sm font-medium mb-2"
              >
                Amount in INR:
              </label>
              <input
                type="number"
                id="inrAmount"
                className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600"
                placeholder="Enter amount in INR"
                value={inrAmount}
                onChange={handleInrChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="primary-button"
            disabled={isConverting}
          >
            {isConverting ? "Converting..." : "Convert Amount"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default EthereumPage;
