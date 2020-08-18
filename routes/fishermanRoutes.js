const express = require('express');
const { route } = require('./userRoutes');
const router = express.Router();
const fishermanController = require('../controllers/fishermanController');

router.route("/save-fisherman-record")
    .post(fishermanController.saveFishermanRecord);

module.exports = router;