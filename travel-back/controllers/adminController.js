// controllers/adminController.js
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if admin exists
        const admin = await adminModel.findByUsername(username);
        if (!admin) {
            return res.status(401).json({ message: 'Authentication failed: User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed: Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Authentication successful',
            token: token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email
            }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if username already exists
        const existingAdmin = await adminModel.findByUsername(username);
        if (existingAdmin) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Create new admin
        const newAdmin = await adminModel.createAdmin({ username, password, email });

        return res.status(201).json({
            message: 'Admin created successfully',
            admin: {
                id: newAdmin.id,
                username: newAdmin.username,
                email: newAdmin.email
            }
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};