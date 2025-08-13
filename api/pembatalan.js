const axios = require('axios');

const headers = {
  'x-key': 'pBgL$%12A',
  'Origin': 'https://pusaka-v3.kemenag.go.id',
  'Referer': 'https://pusaka-v3.kemenag.go.id/',
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*'
};

// Ini adalah handler untuk Serverless Function Vercel
module.exports = async (req, res) => {
  // Vercel akan memparsing URL dan query params untuk Anda
  const { nomor } = req.query; // Mengambil 'nomor' dari query string, misal /api/pembatalan?nomor=123

  if (!nomor) {
    return res.status(400).json({ message: 'Nomor porsi diperlukan.' });
  }

  const url = `https://admin-kong-gateway.kemenag.go.id/api/haji-pintar/api-siskohat/siskohat/pembatalan/${nomor}`;

  try {
    const { data } = await axios.get(url, { headers });
    res.status(200).json(data);
  } catch (err) {
    console.error(`Error for ${nomor}:`, err.response?.status || err.message);
    const status = err.response?.status || 500;
    const message = err.response?.data?.message || err.message || 'Terjadi kesalahan pada server';
    res.status(status).json({ message });
  }
};
