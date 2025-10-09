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

// Serve the UI
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve shop-specific page
app.get('/shop/:shopName', async (req, res) => {
  const shopName = req.params.shopName;
  console.log(`getshopname :${shopName}`);

  try {
    // Fetch data from the external API
    const response = await axios.get(`https://springbackendprod.azurewebsites.net/getTable?shopName=${shopName}`);
      // @ts-ignore
    const data = response.data;

    // Generate HTML table for each table in the response
    let tablesHtml = '';
      // @ts-ignore
    for (const [tableName, rows] of Object.entries(data)) {
      let tableRows = '';
      if (Array.isArray(rows)) {
        // Add a TypeScript directive to suppress type errors for 'unknown' types
        // @ts-ignore
        rows.forEach(row => {
          const rowHtml = Object.values(row).map(value => `<td>${value}</td>`).join('');
          tableRows += `<tr>${rowHtml}</tr>`;
        });
      }

        // @ts-ignore
      const tableHeaders = rows.length > 0 ? Object.keys(rows[0]).map(key => `<th>${key}</th>`).join('') : '';

      tablesHtml += `
        <h2>${tableName}</h2>
        <table>
          <thead>
            <tr>${tableHeaders}</tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      `;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop Data</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f4f4f4;
          }
        </style>
      </head>
      <body>
        <h1>Shop Data for ${shopName}</h1>
        ${tablesHtml}
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).send('Failed to fetch data from API');
  }
});

app.listen(port, () => {
  console.log(`Web service is running at http://localhost:${port}`);
});
