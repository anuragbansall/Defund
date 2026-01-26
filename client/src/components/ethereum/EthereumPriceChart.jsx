import { useEffect, useState } from "react";

const EthereumPriceChart = ({ handleError }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const scriptId = "coingecko-widget-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://widgets.coingecko.com/gecko-coin-price-chart-widget.js";
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load the CoinGecko widget script.");
        setError("Failed to load the price chart widget.");
        handleError("Failed to load the price chart widget.");
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <gecko-coin-price-chart-widget
      locale="en"
      dark-mode="true"
      transparent-background="true"
      coin-id="ethereum"
      initial-currency="inr"
    />
  );
};

export default EthereumPriceChart;
