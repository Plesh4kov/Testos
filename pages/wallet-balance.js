import { useEffect, useState } from "react";

export default function WalletBalance() {
  const [balance, setBalance] = useState("Loading...");

  useEffect(() => {
    const walletAddress = "3HMkAtzMwjH9mVZwR6rgGL6f2P5z7BswAx4FnqEcubWp"; // Ваш адрес кошелька

    async function fetchBalance() {
      try {
        const response = await fetch(
          `https://public-api.solscan.io/account?address=${walletAddress}`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wallet balance");
        }

        const data = await response.json();

        if (data && data.lamports) {
          const balanceInSOL = data.lamports / 1000000000; // Преобразуем lamports в SOL
          setBalance(`${balanceInSOL.toFixed(2)} SOL`);
        } else {
          setBalance("Balance not found.");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance("Error loading balance.");
      }
    }

    fetchBalance();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        margin: "50px auto",
        width: "300px",
      }}
    >
      <h1 style={{ marginBottom: "10px", color: "#333", fontSize: "24px" }}>
        Wallet Balance
      </h1>
      <div
        style={{ fontSize: "20px", color: "#007acc", fontWeight: "bold" }}
      >
        {balance}
      </div>
    </div>
  );
}
