<div id="wallet-container">
  <h1>Wallet Balance</h1>
  <div id="wallet-balance">Loading balance...</div>
</div>

<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background: #f9f9f9;
  }

  #wallet-container {
    text-align: center;
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  #wallet-container h1 {
    margin-bottom: 10px;
    color: #333;
    font-size: 24px;
  }

  #wallet-balance {
    font-size: 20px;
    color: #007acc;
    font-weight: bold;
    margin-top: 10px;
  }
</style>

<script>
  const walletAddress = "ВАШ_АДРЕС"; // Замените на адрес вашего кошелька

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
