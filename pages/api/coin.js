import axios from "axios";

export default async function handler(req, res) {
  const coinAddress = "GRUmPYbiTpq9ZPy5LAqBMMze7kErf5dEX2i9qYfwoSmR";
  const url = `https://public-api.solscan.io/token/meta?address=${coinAddress}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 200 && response.data) {
      const { price, market_cap, circulating_supply, holder_count, last_buy } = response.data;

      res.status(200).json({
        price: price?.usd ?? "N/A",
        marketCap: market_cap ?? "N/A",
        currentSupply: circulating_supply ?? "N/A",
        holders: holder_count ?? "N/A",
        lastBuy: last_buy ?? "N/A",
      });
    } else {
      res.status(404).json({ error: "Coin data not found" });
    }
  } catch (error) {
    console.error("Error fetching coin data:", error.message);
    res.status(500).json({ error: "Failed to fetch coin data" });
  }
}
