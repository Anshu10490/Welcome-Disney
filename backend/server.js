import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors'; // <-- Added for frontend access

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Create DB connection inside async function
let db;

async function initDB() {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '', // 🔁 Put your correct MySQL password here
      database: 'disney_movies_db',
    });
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit if DB fails to connect
  }
}

await initDB();

// 🔍 Search movie by title
app.get('/api/movies/search', async (req, res) => {
  const title = req.query.title;
  if (!title) return res.status(400).send("Missing title");

  try {
    const [rows] = await db.query(
      'SELECT * FROM movies WHERE LOWER(title) LIKE LOWER(?)',
      [`%${title}%`]
    );

    if (rows.length === 0) return res.status(404).send("Movie not found");
    res.json(rows[0]); // You can also return all: res.json(rows);
  } catch (err) {
    console.error("❌ Error searching movie:", err);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✨ Server running at http://localhost:${PORT}`);
});
