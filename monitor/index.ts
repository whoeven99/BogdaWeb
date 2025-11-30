import express from 'express';
import path from 'path';
import axios from 'axios';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3000;

// Parse JSON bodies for PUT/DELETE
app.use(express.json());

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

// helper to pick external base url by env
function getConfigBaseUrl(env?: string) {
  if (env === 'test') {
    return 'https://springbackendservice-e3hgbjgqafb9cpdh.canadacentral-01.azurewebsites.net';
  }
  // default to production
  return 'https://springbackendprod.azurewebsites.net';
}

// New API endpoint that returns config key/value pairs from external service
app.get('/api/config', async (req, res) => {
    try {
        const env = String(req.query.env || 'prod');
        const base = getConfigBaseUrl(env);
        console.log(`[config GET] env=${env} base=${base} url=${base}/bogdaconfig`);
        const response = await axios.get(`${base}/bogdaconfig`);
        // Expecting a JSON object with string keys and string values
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching config from external API:', error);
        res.status(502).json({ error: 'Failed to fetch config from external API' });
    }
});

// New API endpoint to add/update a key/value (proxy to external PUT)
app.put('/api/config', async (req, res) => {
    const { key, value } = req.body || {};
    if (typeof key !== 'string' || typeof value !== 'string') {
        return res.status(400).json({ error: 'Missing key or value (must be strings)' });
    }
    try {
        const env = String(req.query.env || 'prod');
        const base = getConfigBaseUrl(env);
        console.log(`[config PUT] env=${env} base=${base} params=key=${key}&value=${value}`);
        // External API expects query params: /bogdaconfig?key=...&value=...
        const response = await axios.put(`${base}/bogdaconfig`, null, {
            params: { key, value }
        });
        // Expect the external service to return the latest full config object
        res.json(response.data);
    } catch (error) {
        console.error('Error putting config to external API:', error);
        res.status(502).json({ error: 'Failed to update config at external API' });
    }
});

// New API endpoint to delete a key (proxy to external DELETE)
app.delete('/api/config', async (req, res) => {
    // Accept key either in JSON body or query param
    const key = (req.body && req.body.key) || req.query.key;
    if (typeof key !== 'string') {
        return res.status(400).json({ error: 'Missing key (must be string)' });
    }
    try {
        const env = String(req.query.env || 'prod');
        const base = getConfigBaseUrl(env);
        console.log(`[config DELETE] env=${env} base=${base} params=key=${key}`);
        // External API expects query param: /bogdaconfig?key=...
        const response = await axios.delete(`${base}/bogdaconfig`, {
            params: { key }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error deleting config at external API:', error);
        res.status(502).json({ error: 'Failed to delete config at external API' });
    }
});

// Serve the UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve config page
app.get('/config', (req, res) => {
  // Serve the static config.html page; the front-end will fetch data from /api/config
  res.sendFile(path.join(__dirname, 'public', 'config.html'));
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
