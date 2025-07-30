const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.resolve(__dirname, "nsa.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1);
  }
});

// ============================
// DB SCHEMA SETUP
// ============================
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      inGateView INTEGER DEFAULT 0,
      inNsaView INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      facilitator TEXT,
      date TEXT,
      status TEXT DEFAULT 'Pending',
      archived INTEGER DEFAULT 0,
      inGateView INTEGER DEFAULT 1,
      inNsaView INTEGER DEFAULT 1
    )
  `);

  db.all("PRAGMA table_info(visitors)", (err, rows) => {
    if (err) {
      console.error("❌ Failed to inspect 'visitors' table:", err.message);
      return;
    }
  
    const existingCols = rows.map((col) => col.name);
  
    if (!existingCols.includes("inNsaView")) {
      db.run(`ALTER TABLE visitors ADD COLUMN inNsaView INTEGER DEFAULT 1`, (err) => {
        if (err) console.error("❌ Failed to add inNsaView:", err.message);
        else console.log("✅ Added missing column: inNsaView");
      });
    }
  
    if (!existingCols.includes("inGateView")) {
      db.run(`ALTER TABLE visitors ADD COLUMN inGateView INTEGER DEFAULT 1`, (err) => {
        if (err) console.error("❌ Failed to add inGateView:", err.message);
        else console.log("✅ Added missing column: inGateView");
      });
    }
  });
  

  const defaultUsers = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "nsa", password: "nsa123", role: "nsa" },
    { username: "gate", password: "gate123", role: "gate" }
  ];

  defaultUsers.forEach((u) => {
    db.run(
      `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
      [u.username, u.password, u.role]
    );
  });
});

// ============================
// AUTH ENDPOINT
// ============================
app.post("/login", (req, res) => {
  const { username, password, role } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`,
    [username, password, role],
    (err, row) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      if (row) return res.json({ success: true, role: row.role, username: row.username });
      return res.json({ success: false });
    }
  );
});

// ============================
// VISITOR ROUTES
// ============================
app.get("/visitors", (_, res) => {
  db.all("SELECT * FROM visitors ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
/** 
app.get("/visitors/view/:role", (req, res) => {
  const role = req.params.role;
  let filterColumn = "";

  if (role === "nsa") {
    filterColumn = "inNsaView";
  } else if (role === "gate") {
    filterColumn = "inGateView";
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }

  //const sql = `SELECT * FROM visitors WHERE ${filterColumn} = 1 AND archived = 0 ORDER BY id DESC`;
  let sql = "";
  if (role === "nsa") {
    sql = "SELECT * FROM visitors WHERE inNsaView = 1 AND archived = 0 ORDER BY id DESC";
  } else if (role === "gate") {
    sql = "SELECT * FROM visitors WHERE inGateView = 1 AND archived = 0 ORDER BY id DESC";
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }

  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
}); **/

app.get("/visitors/view/:role", (req, res) => {
  const role = req.params.role;
  let sql = "";

  if (role === "nsa") {
    sql = "SELECT * FROM visitors WHERE inNsaView = 1 AND archived = 0 ORDER BY id DESC";
  } else if (role === "gate") {
    sql = "SELECT * FROM visitors WHERE inGateView = 1 AND archived = 0 ORDER BY id DESC";
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }

  db.all(sql, (err, rows) => {
    if (err) {
      console.error("❌ Error fetching visitor view:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ visitors fetched for", role, rows); // 🧪 log to debug
    res.json(rows);
  });
});



app.post("/visitors", (req, res) => {
  const { name, phone, facilitator, date, status } = req.body;
  db.run(
    `INSERT INTO visitors (name, phone, facilitator, date, status, inNsaView, inGateView) VALUES (?, ?, ?, ?, ?, 0, 0)`,
    [name, phone, facilitator, date, status || "Pending"],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.put("/visitors/:id", (req, res) => {
  const id = req.params.id;
  const { status, archived } = req.body;
  db.run(
    `UPDATE visitors SET status = ?, archived = ? WHERE id = ?`,
    [status, archived, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.put("/visitors/:id/view", (req, res) => {
  const id = req.params.id;
  const { inGateView, inNsaView } = req.body;

  db.run(
    `UPDATE visitors SET inGateView = ?, inNsaView = ? WHERE id = ?`,
    [inGateView, inNsaView, id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.delete("/visitors/:id", (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM visitors WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ============================
// USER MANAGEMENT
// ============================
app.get("/users", (_, res) => {
  db.all("SELECT id, username, password, role FROM users ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const patched = rows.map((u) => {
      if (u.username === "admin") {
        return { ...u, name: "System Admin", password: "admin123" }; // patched display
      }
      return u;
    });

    const sorted = patched.sort((a, b) => {
      if (a.username === "admin") return -1;
      if (b.username === "admin") return 1;
      return 0;
    });

    res.json(sorted);
  });
});

app.post("/users", (req, res) => {
  const { username, password, role } = req.body;
  if (username === "admin") return res.status(403).json({ error: "Cannot overwrite default admin" });

  db.run(
    `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
    [username, password, role],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.put("/users/:username", (req, res) => {
  const { username } = req.params;
  const { password, role } = req.body;

  if (username === "admin") {
    return res.status(403).json({ error: "Cannot modify the admin user." });
  }

  db.run(
    `UPDATE users SET password = ?, role = ? WHERE username = ?`,
    [password, role, username],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ username, password, role });
    }
  );
});

app.delete("/users/:username", (req, res) => {
  const username = req.params.username;
  if (username === "admin") return res.status(403).json({ error: "Cannot delete default admin" });

  db.run(`DELETE FROM users WHERE username = ?`, [username], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// ============================
// ROOT CHECK
// ============================
app.get("/", (req, res) => {
  res.send("NSA Visitor Log API is running");
});

// ============================
// START SERVER
// ============================
app.listen(PORT, () => {
  console.log(`✅ NSA backend running on http://localhost:${PORT}`);
});
