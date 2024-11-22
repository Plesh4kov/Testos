// Ожидание загрузки DOM перед выполнением кода
document.addEventListener("DOMContentLoaded", () => {
  const walletAddress = "3HMkAtzMwjH9mVZwR6rgGL6f2P5z7BswAx4FnqEcubWp"; // Адрес кошелька

  // Запрос к API для получения баланса кошелька
  fetch(`https://public-api.solscan.io/account?address=${walletAddress}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      // Проверка, что запрос был успешным
      if (!response.ok) {
        throw new Error("Failed to fetch wallet balance");
      }
      return response.json();
    })
    .then((data) => {
      // Проверка данных и преобразование баланса из lamports в SOL
      if (data && data.lamports) {
        const balance = data.lamports / 1000000000; // Преобразование lamports в SOL
        const balanceElement = document.getElementById("wallet-balance");

        // Обновление текста элемента с балансом
        if (balanceElement) {
          balanceElement.innerText = `Balance: ${balance.toFixed(2)} SOL`;
        }
      } else {
        // Если данных нет, отобразить сообщение об отсутствии баланса
        const balanceElement = document.getElementById("wallet-balance");
        if (balanceElement) {
          balanceElement.innerText = "Balance not found.";
        }
      }
    })
    .catch((error) => {
      // Обработка ошибок и вывод сообщения
      console.error("Error fetching balance:", error);
      const balanceElement = document.getElementById("wallet-balance");
      if (balanceElement) {
        balanceElement.innerText = "Error loading balance.";
      }
    });
});
