export default async function handler(req, res) {
  const walletAddress = "3HMkAtzMwjH9mVZwR6rgGL6f2P5z7BswAx4FnqEcubWp"; // Адрес кошелька
  const url = `https://solscan.io/account/${walletAddress}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();

    // Регулярное выражение для поиска баланса в HTML-странице
    const balanceRegex = /<div[^>]*class="[^"]*account-balance[^"]*">[\s\S]*?<span[^>]*class="value"[^>]*>([\s\S]*?)<\/span>/;
    const match = html.match(balanceRegex);

    if (match && match[1]) {
      const balance = match[1].trim();
      res.status(200).json({ balance });
    } else {
      res.status(404).json({ error: "Balance not found" });
    }
  } catch (error) {
    console.error("Error fetching balance:", error.message);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
}
