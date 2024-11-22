<div id="wallet-balance">Loading balance...</div>

<script>
  const walletAddress = "GRUmPYbiTpq9ZPy5LAqBMMze7kErf5dEX2i9qYfwoSmR"; // Замените на адрес вашего кошелька

  fetch(`https://public-api.solscan.io/account?address=${walletAddress}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch wallet balance");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.lamports) {
        const balance = data.lamports / 1000000000; // Преобразуем lamports в SOL
        document.getElementById("wallet-balance").innerText = `Balance: ${balance.toFixed(2)} SOL`;
      } else {
        document.getElementById("wallet-balance").innerText = "Balance not found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching balance:", error);
      document.getElementById("wallet-balance").innerText = "Error loading balance.";
    });
</script>
