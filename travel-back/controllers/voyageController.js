// controllers/voyageController.js
const voyageModel = require('../models/voyage');
const fs = require('fs');
const path = require('path');

exports.getAllVoyages = async (req, res) => {
    try {
        const voyages = await voyageModel.getAllVoyages();
        res.json(voyages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVoyageById = async (req, res) => {
    try {
        const voyage = await voyageModel.getVoyageById(req.params.id);
        if (!voyage) {
            return res.status(404).json({ message: 'Voyage not found' });
        }
        res.json(voyage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createVoyage = async (req, res) => {
    try {
        const data = req.body;
        console.log("Request body:", req.body);

        // If there's an uploaded file, add its path to the data
        if (req.file) {
            data.image = `/uploads/${req.file.filename}`;
        }

        const voyage = await voyageModel.createVoyage(data);
        res.status(201).json(voyage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateVoyage = async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        // Check if voyage exists
        const existingVoyage = await voyageModel.getVoyageById(id);
        if (!existingVoyage) {
            return res.status(404).json({ message: 'Voyage not found' });
        }

        // If there's an uploaded file, add its path to the data and remove the old image
        if (req.file) {
            data.image = `/uploads/${req.file.filename}`;

            // Remove old image if it exists
            if (existingVoyage.image) {
                const oldImagePath = path.join(__dirname, '../public', existingVoyage.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        } else {
            // Keep existing image
            data.image = existingVoyage.image;
        }

        const updatedVoyage = await voyageModel.updateVoyage(id, data);
        res.json(updatedVoyage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteVoyage = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if voyage exists
        const existingVoyage = await voyageModel.getVoyageById(id);
        if (!existingVoyage) {
            return res.status(404).json({ message: 'Voyage not found' });
        }

        // Remove image if it exists
        if (existingVoyage.image) {
            const imagePath = path.join(__dirname, '../public', existingVoyage.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        const deletedVoyage = await voyageModel.deleteVoyage(id);
        res.json({ message: 'Voyage deleted successfully', voyage: deletedVoyage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};