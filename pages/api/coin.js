export default async function handler(req, res) {
  const coinAddress = "GRUmPYbiTpq9ZPy5LAqBMMze7kErf5dEX2i9qYfwoSmR"; // Адрес монеты
  const url = `https://public-api.solscan.io/token/meta?address=${coinAddress}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
      const price = data?.price?.usd ?? "N/A";
      const marketCap = data?.market_cap ?? "N/A";
      const currentSupply = data?.circulating_supply ?? "N/A";
      const holders = data?.holder_count ?? "N/A";

      res.status(200).json({
        price,
        marketCap,
        currentSupply,
        holders,
      });
    } else {
      res.status(404).json({ error: "Coin data not found" });
    }
  } catch (error) {
    console.error("Error fetching coin data:", error.message);
    res.status(500).json({ error: "Failed to fetch coin data" });
  }
}
