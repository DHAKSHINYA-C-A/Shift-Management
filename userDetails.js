

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// 📌 Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
    }
});

// 📌 Route to Get Users with Details
router.get('/users-with-details', (req, res) => {
    const query = `
      SELECT 
        users.id AS id, 
        users.eskoId AS eskoId, 
        user_details.contact AS contact, 
        user_details.employee_status AS employee_status 
      FROM users 
      JOIN user_details 
      ON users.id = user_details.user_id
    `;
    
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(result);
    });
});
router.get("/get-shifts-by-date", (req, res) => {
  const { shift_date } = req.query;
  const query = `
    SELECT users.id, users.eskoId, user_details.contact, user_details.employee_status, user_shifts.shift_time
    FROM user_shifts
    JOIN users ON users.id = user_shifts.user_id
    JOIN user_details ON users.id = user_details.user_id
    WHERE shift_date = ?
  `;

  db.query(query, [shift_date], (err, result) => {
    if (err) {
      console.error("Error fetching shifts by date:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(result);
  });
});
router.post("/update-shift", async (req, res) => {
  const { id, shift_time } = req.body;
  console.log("Update request received:", id, shift_time);

  if (!id || !shift_time) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const query = `
      UPDATE user_shifts 
      SET shift_time = ?, modified_by = 'Manager', updated_at = NOW() 
      WHERE user_id = ?
    `;

    const [result] = await db.promise().query(query, [shift_time, id]);
    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Shift ID not found." });
    }

    res.json({ message: "Shift updated successfully." });
  } catch (error) {
    console.error("Error updating shift:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});



module.exports = router;



