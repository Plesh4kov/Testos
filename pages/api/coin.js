export default async function handler(req, res) {
  const coinAddress = "GRUmPYbiTpq9ZPy5LAqBMMze7kErf5dEX2i9qYfwoSmR";

  try {
    const response = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenSupply",
        params: [coinAddress],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Solana API Response:", data); // Лог ответа

    if (data && data.result) {
      res.status(200).json({
        supply: data.result.value.amount,
        decimals: data.result.value.decimals,
      });
    } else {
      res.status(404).json({ error: "Token data not found" });
    }
  } catch (error) {
    console.error("Error fetching token data:", error.message);
    res.status(500).json({ error: "Failed to fetch token data" });
  }
}
