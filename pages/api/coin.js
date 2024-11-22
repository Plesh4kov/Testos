import axios from "axios";
import cheerio from "cheerio";

export default async function handler(req, res) {
  const url = "https://solscan.io/token/GRUmPYbiTpq9ZPy5LAqBMMze7kErf5dEX2i9qYfwoSmR";

  try {
    // Запрос HTML-страницы Solscan
    const response = await axios.get(url);
    const html = response.data;

    // Парсинг HTML с использованием Cheerio
    const $ = cheerio.load(html);

    // Извлечение данных
    const price = $("div:contains('Price')").next().text().trim();
    const marketCap = $("div:contains('Market Cap')").next().text().trim();
    const currentSupply = $("div:contains('Current Supply')").next().text().trim();
    const holders = $("div:contains('Holders')").next().text().trim();

    // Ответ API
    res.status(200).json({
      price: price || "N/A",
      marketCap: marketCap || "N/A",
      currentSupply: currentSupply || "N/A",
      holders: holders || "N/A",
    });
  } catch (error) {
    console.error("Error fetching coin data:", error.message);
    res.status(500).json({ error: "Failed to fetch coin data" });
  }
}
