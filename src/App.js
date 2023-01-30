import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState("0");
  const [select, SetSelect] = useState("1");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then(response => response.json())
      .then(json => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChange = event => setUsd(event.target.value);
  const setSelectCoin = event => SetSelect(event.target.value);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={setSelectCoin}>
            {coins.map((coin, index) => (
              <option key={index} value={coin.rank}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div>
            <span>USD:</span>
            <input onChange={onChange} value={usd} type="number" />
            <h3>Coins: {usd / coins[select - 1].quotes.USD.price}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
