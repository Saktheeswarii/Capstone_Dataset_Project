const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = async (req, res) => {
  const results = [];
  const filePath = path.join(__dirname, '..', 'data', 'raw_routes.csv');

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(results);
    })
    .on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
};
