const url ="https://www.alphavantage.co/query?function=REALTIME_OPTIONS&symbol=IBM&apikey=5XU8EEG97Y9LF1IQ"

const loadStock = document.getElementById('loadStock');
const loadStockBtn = document.getElementById('load-stock-btn');
const stockTable = document.getElementById('stockTable').getElementsByTagName('tbody')[0];

const ctx = document.getElementById('stockChart').getContext('2d');
let stockChart;


const fetchApi = async() => {
  try{
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  }
  catch(error){
    console.error('Error:', error);
  }
}

async function getTrendingStocks() {
  const response = await fetch(url);
  const data = await response.json();

  const trendingStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NFLX', 'NVDA', 'BABA', 'INTC'];
  return trendingStocks;
}

function displayStockDetails(stockData, symbol) {
  const latestDate = Object.keys(stockData)[0];
  const latestData = stockData[latestDate];
  const price = latestData['4. close'];
  const volume = latestData['5. volume'];
  const change = (latestData['4. close'] - stockData[Object.keys(stockData)[1]]['4. close']).toFixed(2);
  
  stockDetails.innerHTML = `
      <h3>${symbol}</h3>
      <p>Price: $${price}</p>
      <p>Change: $${change}</p>
      <p>Volume: ${volume}</p>
  `;

  updateStockTable(symbol, price, change, volume);
}


function updateStockTable(symbol, price, change, volume) {
  const newRow = stockTable.insertRow();
  newRow.innerHTML = `
      <td>${symbol}</td>
      <td>$${price}</td>
      <td>${change}</td>
      <td>${volume}</td>
  `;
}
// loadStockBtn.addEventListener('click', async() => {
//   const selectedStock = stockDropdown.value;
//     const stockData = await getStockData(selectedStock);
//     if (stockData) {
//         displayStockDetails(stockData, selectedStock);
//         displayStockGraph(stockData);
//     } else {
//         stockDetails.innerHTML = `<p>Stock data not available for ${selectedStock}.</p>`;
//     }
// });

