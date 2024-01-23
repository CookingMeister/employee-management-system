const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({extended: true}));

const app = express();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Office2024!',
    database: 'office',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

app.get('/', (req, res) => {
  db.query('SELECT * FROM {db}', (err, results) => {
    if(err) throw err;
    res.json(results.row);
  });
});

app.post('/', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO {db} SET ?', data, (err, results) => {
    if(err) throw err;
    res.send('Values Inserted');
  });
});

app.patch('/', (req, res) => {
  const data = req.body;
  const id = req.params.id;
  db.query('UPDATE {db} SET ? WHERE id = ?', [data, id], (err, results) => {
    if(err) throw err;
    res.send('Values Updated');
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});