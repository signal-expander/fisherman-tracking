const mongoose = require('mongoose');

const gpsPointsSchema = new mongoose.Schema({
    fisherman_id: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at' 
    }
});


const GpsPoints = mongoose.model('gps_points', gpsPointsSchema);
module.exports = GpsPoints;