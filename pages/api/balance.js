export default async function handler(req, res) {
  const walletAddress = "3HMkAtzMwjH9mVZwR6rgGL6f2P5z7BswAx4FnqEcubWp";

  try {
    const response = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [walletAddress],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.result && data.result.value) {
      const balance = data.result.value / 1000000000; // lamports to SOL
      res.status(200).json({ balance: balance.toFixed(2) });
    } else {
      res.status(404).json({ error: "Balance not found" });
    }
  } catch (error) {
    console.error("Error fetching balance:", error.message);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
}
