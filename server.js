
// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// // const shiftCronJob = require("./shift");
// const app = express();
// app.use(cors());
// app.use(express.json());

// // 📌 Database Connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// db.connect(err => {
//     if (err) {
//         console.error('❌ Database connection failed:', err);
//     } else {
//         console.log('✅ Connected to MySQL Database');
//     }
// });

// // 📌 Login API with Authorization
// app.post('/login', (req, res) => {
//     const { eskoId, password } = req.body;

//     const sql = 'SELECT * FROM users WHERE eskoId = ?';
//     db.query(sql, [eskoId], (err, results) => {
//         if (err) return res.status(500).json({ message: 'Server error' });

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Invalid Esko ID or password' });
//         }

//         const user = results[0];

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) return res.status(500).json({ message: 'Error comparing passwords' });

//             if (!isMatch) {
//                 return res.status(401).json({ message: 'Invalid Esko ID or password' });
//             }

//             const role = user.eskoId === 'Manager' ? 'Manager' : 'User';

//             const token = jwt.sign(
//                 { id: user.id, eskoId: user.eskoId, role },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '1h' }
//             );

//             // 👉 Include `eskoId`, `name` (or `employee_name`) in the response
//             res.json({
//                 message: 'Login successful',
//                 token,
//                 role,
//                 eskoId: user.eskoId,
                
//             });
//         });
//     });
// });


// // 📌 Middleware to Verify JWT Token
// function verifyToken(req, res, next) {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).json({ message: 'Access denied' });

//     jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
//         if (err) return res.status(401).json({ message: 'Invalid token' });
//         req.user = decoded;
//         next();
//     });
// }

//     const setupShiftCron = require("./shift");
//     setupShiftCron();

//   const userDetailsRoute = require('./userDetails');
//     app.use('/api', userDetailsRoute);
    
    
 

// // 📌 Protected Route for Dashboard
// app.get('/dash', verifyToken, (req, res) => {
//     res.json({ message: 'Welcome to the dashboard', user: req.user });
// });


// // 📌 Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const shiftCronJob = require("./shift");
const app = express();
app.use(cors());
app.use(express.json());

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

// 📌 Login API with Authorization
app.post('/login', (req, res) => {
    const { eskoId, password } = req.body;

    const sql = 'SELECT * FROM users WHERE eskoId = ?';
    db.query(sql, [eskoId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' });

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid Esko ID or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords' });

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Esko ID or password' });
            }

            const role = user.eskoId === 'Manager' ? 'Manager' : 'User';

            const token = jwt.sign(
                { id: user.id, eskoId: user.eskoId, role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // 👉 Include `eskoId`, `name` (or `employee_name`) in the response
            res.json({
                message: 'Login successful',
                token,
            });
            
        });
    });
});


// 📌 Middleware to Verify JWT Token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Access denied' });

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
}

    const setupShiftCron = require("./shift");
    setupShiftCron();

  const userDetailsRoute = require('./userDetails');
    app.use('/api', userDetailsRoute);
    
    
 

// 📌 Protected Route for Dashboard
app.get('/dash', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to the dashboard', user: req.user });
});


// 📌 Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});











