const stocks = [
    { symbol: "AAPL", spyWeightage: "7.7%" },
    { symbol: "TSLA", spyWeightage: "2.3%" },
    { symbol: "GOOGL", spyWeightage: "3.1%" },
    { symbol: "AMZN", spyWeightage: "5.5%" },
    { symbol: "MSFT", spyWeightage: "6.2%" },
    { symbol: "NVDA", spyWeightage: "2.8%" },
    { symbol: "META", spyWeightage: "4.5%" }
];

let viewCount = 0;

function fetchData(apiKey) {
    // This is where the fetch code for the APIs would go, using Alpha Vantage or Finnhub based on the key provided
    // For demonstration purposes, we'll use mock data
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: stocks.map(stock => ({
                    ...stock,
                    openPrice: Math.random() * 1000,
                    previousClose: Math.random() * 1000,
                    currentPrice: Math.random() * 1000,
                    rsi: (Math.random() * 100).toFixed(2),
                    ema20: (Math.random() * 1000).toFixed(2),
                    ema50: (Math.random() * 1000).toFixed(2),
                    lastUpdated: new Date().toLocaleString()
                }))
            });
        }, 2000);
    });
}

function updateTable(data) {
    const tableBody = document.querySelector("#apiData tbody");
    tableBody.innerHTML = ""; // Clear the previous data
    
    data.forEach(stock => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${stock.symbol}</td>
            <td>${stock.openPrice.toFixed(2)}</td>
            <td>${stock.previousClose.toFixed(2)}</td>
            <td>${stock.currentPrice.toFixed(2)}</td>
            <td>${stock.spyWeightage}</td>
            <td>${stock.rsi}</td>
            <td>${stock.ema20}</td>
            <td>${stock.ema50}</td>
            <td>${stock.lastUpdated}</td>
        `;
        tableBody.appendChild(row);
    });
}

function submitAPI() {
    const alphaVantageAPI = document.getElementById("alphaVantageAPI").value;
    const finnhubAPI = document.getElementById("finnhubAPI").value;

    if (alphaVantageAPI || finnhubAPI) {
        fetchData(alphaVantageAPI || finnhubAPI).then(response => {
            updateTable(response.data);
            document.getElementById("lastUpdated").innerText = "Last Updated: " + new Date().toLocaleString();
        });
    } else {
        alert("Please enter an API key.");
    }

    // Increment the views count
    viewCount += 1;
    document.getElementById("viewCount").innerText = viewCount;
}

// Set default table (with " -" in cells) when page loads
document.addEventListener("DOMContentLoaded", () => {
    updateTable(stocks.map(stock => ({
        ...stock,
        openPrice: "-",
        previousClose: "-",
        currentPrice: "-",
        rsi: "-",
        ema20: "-",
        ema50: "-",
        lastUpdated: "-"
    })));
});
