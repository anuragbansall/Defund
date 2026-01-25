import Coingecko from "@coingecko/coingecko-typescript";

const client = new Coingecko({
  demoAPIKey: import.meta.env.VITE_COINGECKO_API_KEY,
  environment: "demo",
});

export async function getEthPriceInInr() {
  const price = await client.simple.price.get({
    ids: "ethereum",
    vs_currencies: "inr",
  });

  return price.ethereum.inr;
}

export async function convertEthToInr(ethAmount) {
  const ethPriceInInr = await getEthPriceInInr();
  return ethAmount * ethPriceInInr;
}

export async function convertInrToEth(inrAmount) {
  const ethPriceInInr = await getEthPriceInInr();
  return inrAmount / ethPriceInInr;
}
