import { useEffect } from "react";

const EthereumPriceChart = () => {
  useEffect(() => {
    // Load CoinGecko widget script once
    const scriptId = "coingecko-widget-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://widgets.coingecko.com/gecko-coin-price-chart-widget.js";
      script.async = true;
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
