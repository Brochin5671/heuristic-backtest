const express = require('express');
const port = process.env.PORT || 3001;
const app = express();

const alpha = require('alphavantage')({ key: process.env.APIKEY });

app.get('/api', async (req, res) => {
  const { start, end } = req.query;
  const assets = req.query.assets.split(',');
  const data = [];
  try {
    for (asset of assets) {
      const { 'Time Series (Daily)': values } = await alpha.data.daily(
        asset,
        'full',
        'json'
      );
      data.push({
        cost: Number(values[start]['1. open']),
        sell: Number(values[end]['4. close']),
        ticker: asset,
      });
    }
    res.json(data);
  } catch (e) {
    console.log(e);
    res.json({ error: 'not found' });
  }
});

app.listen(port, () => {
  console.log('server is live');
});
