const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questions');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/questions', questionRoutes);

app.listen(5173, () => console.log('Server running on port 3306'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gamer4life!',
    database: 'auth_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');

    // Initialize database and table
    const initDbQuery = `
        CREATE DATABASE IF NOT EXISTS auth_db;

        USE auth_db;

        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        );
    `;

    db.query(initDbQuery, (err) => {
        if (err) {
            console.error('Error initializing database:', err);
        } else {
            console.log('Database and table initialized successfully.');
        }
    });
});

// Registration route
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'User already exists.' });
                }
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'User registered successfully.' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        res.status(200).json({ message: 'Login successful.', token: 'mock-token' });
    });
});

// Start the server
const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});