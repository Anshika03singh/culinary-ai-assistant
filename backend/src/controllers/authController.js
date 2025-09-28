    const pool = require('../models/db');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    const register = async (req, res) => {
        const { name, email, password } = req.body;
        try {
            // Check if user already exists
            const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userCheck.rows.length > 0) {
                return res.status(400).json({ msg: "User with this email already exists." });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await pool.query(
                "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
                [name, email, hashedPassword]
            );

            const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.status(201).json({ token, user: { id: newUser.rows[0].id, name: newUser.rows[0].name, email: newUser.rows[0].email } });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error" });
        }
    };

    const login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userResult.rows.length === 0) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const user = userResult.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error" });
        }
    };

    // This line exports the functions so other files can use them
    module.exports = { register, login };
    
    
