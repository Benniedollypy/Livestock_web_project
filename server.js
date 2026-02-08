const express = require("express");
const path = require("path");
const { Pool } = require("pg"); // ✅ Make sure you import Pool
const app = express();
const PORT = 5000;

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Livestock_web_App_db",
  password: "5454", // <-- Replace this with your real password
  port: 5432, // <-- Use the correct port shown in pgAdmin
});

// Middleware
app.use(express.static("public")); // serve HTML, CSS, JS
app.use(express.json()); // parse JSON data from frontend

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Login route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
