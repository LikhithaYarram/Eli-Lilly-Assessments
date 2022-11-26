const goButton = document.getElementById('goBtn');
goButton.addEventListener('click', getStockData);
const symbolInput = document.getElementById('symbolInput');
const Constants = {};
Constants.TIME_SERIES_DAILY = "Time Series (Daily)";
const loader=document.getElementById('loader');

let stockData;
function getStockData() {
    try {
        loader.style.display='block';
        const tickerSymbol = symbolInput.value;
        const myHeaders = new Headers();
        myHeaders.append("User-Agent", "request");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerSymbol}&outputsize=full&apikey=demo`, requestOptions)
            .then(response => response.text())
            .then(result => {
                if (result) {
                    console.log(Constants.TIME_SERIES_DAILY)
                    stockData = result["Time Series (Daily)"];
                    console.log(stockData)
                    loader.style.display='none';
                    document.getElementById("tickerSymbol").innerText = `Stock price over time of ${tickerSymbol}`;
                    document.getElementById('stockData').innerHTML=result;
                    symbolInput.value='';
                }
            })
            .catch(error => {
                console.log('error', error);
                alert('Please enter a valid ticker symbol')
                document.getElementById("tickerSymbol").innerText = '';
            });
    }
    catch (err) {
        console.log(err)
    }
}