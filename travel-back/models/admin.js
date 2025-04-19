// models/admin.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const adminModel = {
    findByUsername: async (username) => {
        const result = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);
        return result.rows[0];
    },

    createAdmin: async (admin) => {
        const { username, password, email } = admin;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO admin (username, password, email) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, email]
        );
        return result.rows[0];
    }
};

module.exports = adminModel;