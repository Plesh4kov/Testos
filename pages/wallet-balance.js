if (typeof window !== "undefined") {
  // Код выполняется только в браузере
  document.addEventListener("DOMContentLoaded", () => {
    const walletAddress = "3HMkAtzMwjH9mVZwR6rgGL6f2P5z7BswAx4FnqEcubWp"; // Адрес кошелька

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
          const balance = data.lamports / 1000000000; // Преобразование lamports в SOL
          const balanceElement = document.getElementById("wallet-balance");

          if (balanceElement) {
            balanceElement.innerText = `Balance: ${balance.toFixed(2)} SOL`;
          }
        } else {
          const balanceElement = document.getElementById("wallet-balance");
          if (balanceElement) {
            balanceElement.innerText = "Balance not found.";
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
        const balanceElement = document.getElementById("wallet-balance");
        if (balanceElement) {
          balanceElement.innerText = "Error loading balance.";
        }
      });
  });
}
