// routes/voyage.js
const express = require('express');
const router = express.Router();
const voyageController = require('../controllers/voyageController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes (no authentication required)
router.get('/', voyageController.getAllVoyages);
router.get('/:id', voyageController.getVoyageById);

// Protected routes (authentication required)
router.post('/', authMiddleware, upload.single('image'), voyageController.createVoyage);
router.put('/:id', authMiddleware, upload.single('image'), voyageController.updateVoyage);
router.delete('/:id', authMiddleware, voyageController.deleteVoyage);

module.exports = router;