const AppError = require('../utils/appError');
const fishermanModel = require('../models/fishermanModel');
const gpsPointsModel = require('../models/gpsPointsModel');

exports.saveFishermanRecord = async (req, res, next) => {
    try {
        const { name, address, contact_number, 
            family_contact_number, id_number } = req.body;

        const save_fisherman = await fishermanModel.create({
            id_number, name, address, contact_number, family_contact_number
        });

        if (!save_fisherman)
            return next(new AppError(401, 'fail', 
                'Failed save fisherman!'), req, res, next);

        res.status(200).json({
            status: 'success',
            msg: "Fisherman successfully saved!"
        });

    } catch (err) {
        next(err);
    }
};

exports.getAllFisherman = async (req, res, next) => {
    try {
        const fisherman = await fishermanModel.find();

        if (!fisherman)
            return next(new AppError(401, 'fail', 
                'Unable to fetch fisherman records!'), req, res, next);

        res.status(200).json({
            status: 'success',
            data: fisherman,
        })

    } catch(err) {
        next(err);
    }
};

exports.saveGpsData = async (req, res, next) => {
    try {
        const { node_id, lat, long, datetime } = req.query;

        console.log("query : ", node_id, " > ", lat, " > ", long, " > ", datetime);

        /*const fisherman = await fishermanModel.findOne({ id_number: node_id });

        if (!fisherman)
            return res.status(404).send("failed");
            // return next(new AppError(401, 'fail', 
            //     'Fisherman ID not found!'), req, res, next);

        await gpsPointsModel.create({
            fisherman_id: fisherman.id,
            latitude: lat,
            longitude: long,
            node_time: datetime
        }); */
    
        res.status(200).send("ok");

    } catch(err) {
        next(err);
    }
}

exports.savePostGpsData = async (req, res, next) => {
    try {

        console.log("body -> ", req.body);


        //res.status(200).send("ok");
        next({ status: 200 })

    } catch (err) {
        next({ status: 500 });
    }
};
//  -> 62546770