const express = require('express');
const router = express.Router();
const {
  getAllParts, getPartById, createPart, updatePart, deletePart, estimateCost
} = require('../controllers/parts.controller');

router.get('/estimate', estimateCost);
router.get('/',         getAllParts);
router.get('/:id',      getPartById);
router.post('/',        createPart);
router.put('/:id',      updatePart);
router.delete('/:id',   deletePart);

module.exports = router;