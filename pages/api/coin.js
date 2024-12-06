export default async function handler(req, res) {
  const coinAddress = "GRUmPYbiTpq9ZPy5LAqBMMze7kErf5dEX2i9qYfwoSmR";

  try {
    // Получение информации о токене с помощью Solana RPC
    const tokenSupplyResponse = await fetch("https://api.mainnet-beta.solana.com", {
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

    if (!tokenSupplyResponse.ok) {
      throw new Error(`HTTP error! Status: ${tokenSupplyResponse.status}`);
    }

    const tokenSupplyData = await tokenSupplyResponse.json();
    let supply = tokenSupplyData.result.value.amount;
    const decimals = tokenSupplyData.result.value.decimals;

    // Получение метаданных токена
    const metadataUriResponse = await fetch(`https://api.mainnet-beta.solana.com`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 2,
        method: "getAccountInfo",
        params: [
          coinAddress,
          {
            encoding: "jsonParsed",
          },
        ],
      }),
    });

    if (!metadataUriResponse.ok) {
      throw new Error(`Error fetching metadata URI: ${metadataUriResponse.status}`);
    }

    const metadataUriData = await metadataUriResponse.json();
    const metadataUri = metadataUriData.result?.value?.data?.parsed?.info?.uri;

    let metadata = {};
    if (metadataUri) {
      const metadataResponse = await fetch(metadataUri);
      metadata = await metadataResponse.json();
    }

    // Возвращаем информацию о токене
    res.status(200).json({
      name: metadata?.name || "Unknown",
      symbol: metadata?.symbol || "Unknown",
      description: metadata?.description || "No description available",
      image: metadata?.image || "No image available",
      totalSupply: (supply / Math.pow(10, decimals)).toLocaleString(),
      decimals,
      uri: metadataUri || "No metadata URI available",
    });
  } catch (error) {
    console.error("Error fetching token data:", error.message);
    res.status(500).json({ error: "Failed to fetch token data" });
  }
}
