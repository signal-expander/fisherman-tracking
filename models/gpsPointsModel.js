const mongoose = require('mongoose');

const gpsPointsSchema = new mongoose.Schema({
    fisherman_id: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    node_time: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'created_at' 
    }
});


const GpsPoints = mongoose.model('gps_points', gpsPointsSchema);
module.exports = GpsPoints;