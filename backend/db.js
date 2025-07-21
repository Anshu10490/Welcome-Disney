// db.js
const mysql = require('mysql2');

// ✅ Create a connection pool for efficient management
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Anshu@17', // your actual password
  database: 'disney_movies_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ✅ Export pool for query execution
module.exports = pool.promise();
