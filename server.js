const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

const headers = {
  'x-key': 'pBgL$%12A',
  'Origin': 'https://pusaka-v3.kemenag.go.id',
  'Referer': 'https://pusaka-v3.kemenag.go.id/',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*'
};

app.get('/api/estimasi/:nomor', async (req, res) => {
  const { nomor } = req.params;
  const url = `https://admin-kong-gateway.kemenag.go.id/api/haji-pintar/api-siskohat/siskohat/estimasi/${nomor}`;

  try {
    console.log(`Fetching data for: ${nomor}`);
    const { data } = await axios.get(url, { headers });
    res.json(data);
  } catch (err) {
    console.error(`Error for ${nomor}:`, err.response?.status || err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || err.message || 'Terjadi kesalahan pada server';
    res.status(status).json({ message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
