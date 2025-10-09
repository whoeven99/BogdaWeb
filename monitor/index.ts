import express from 'express';
import path from 'path';
import axios from 'axios';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Disable Content Security Policy for development purposes
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

// Endpoint to provide the JSON data
app.get('/data', async (req, res) => {
    try {
        const response = await axios.get('https://springbackendprod.azurewebsites.net/monitor');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

// API endpoint that returns table data for a shop in JSON (used by shop.html)
app.get('/api/shop/:shopName', async (req, res) => {
    const shopName = req.params.shopName;
    try {
        const response = await axios.get(`https://springbackendprod.azurewebsites.net/getTable?shopName=${shopName}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from external API for shop:', shopName, error);
        res.status(502).json({ error: 'Failed to fetch data from external API' });
    }
});

// Serve the UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve shop-specific page
app.get('/shop/:shopName', (req, res) => {
  const shopName = req.params.shopName;
  console.log(`serve shop page for: ${shopName}`);

  // Serve the static shop.html page; the front-end will fetch data from /api/shop/:shopName
  res.sendFile(path.join(__dirname, 'public', 'shop.html'));
});


app.listen(port, () => {
  console.log(`Web service is running at http://localhost:${port}`);
});
