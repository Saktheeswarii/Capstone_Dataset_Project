const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

// Utility to convert CSV to JSON
function csvToJson(filePath, res) {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.json(results))
    .on('error', (err) => res.status(500).json({ error: err.message }));
}

// API to get routes data
app.get('/api/routes', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'raw_routes.csv');
  csvToJson(filePath, res);
});

// API to get aircrafts data
app.get('/api/aircrafts', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'raw_aircrafts.csv');
  csvToJson(filePath, res);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
