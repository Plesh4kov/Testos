document.addEventListener('DOMContentLoaded', () => {
  fetch('https://public-api.solscan.io/account?address=ВАШ_АДРЕС', {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ВАШ_API_КЛЮЧ'
    }
  })
    .then(response => response.json())
    .then(data => {
      const balance = data.lamports / 1000000000;
      document.getElementById('wallet-balance').innerText = `Balance: ${balance} SOL`;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('wallet-balance').innerText = 'Error loading balance.';
    });
});
