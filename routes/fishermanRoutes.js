const express = require('express');
const { route } = require('./userRoutes');
const router = express.Router();
const fishermanController = require('../controllers/fishermanController');

router.route("/save-fisherman-record")
    .post(fishermanController.saveFishermanRecord);

router.route("/get-all-fisherman")
    .get(fishermanController.getAllFisherman);

router.route("/save-gps-data")
    .get(fishermanController.saveGpsData);

router.route("/fetch-gps-data")
    .post(fishermanController.fetchGpsData);

// router.route("/save-gps-data")
//     .post(fishermanController.savePostGpsData);

module.exports = router;