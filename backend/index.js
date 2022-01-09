const express = require('express');
const port = process.env.PORT || 3001;
const app = express();

const alpha = require('alphavantage')({ key: process.env.APIKEY });

app.get('/api', async (req, res) => {
  const assets = ['MSFT', 'XEQT.TO', 'VEQT.TO'];
  const start = '2021-02-02';
  const end = '2022-01-06';
  const data = [];
  try {
    for (asset of assets) {
      const { 'Time Series (Daily)': values } = await alpha.data.daily(
        'MSFT',
        'full',
        'json'
      );
      data.push({
        start: values[start]['1. open'],
        end: values[end]['4. close'],
        asset,
      });
    }
    res.json(data);
  } catch (e) {
    res.json({ error: 'not found' });
  }
});

app.listen(port, () => {
  console.log('server is live');
});
