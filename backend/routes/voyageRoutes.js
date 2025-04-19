const express = require('express');
const router = express.Router();
const voyageController = require('../controllers/voyageController');
 router.get('/', voyageController.getVoyages);
router.post('/', voyageController.createVoyage);
router.delete('/:id', voyageController.deleteVoyage);
router.put('/:id', voyageController.updateVoyage);

module.exports = router;
