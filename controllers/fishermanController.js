const AppError = require('../utils/appError');
const fishermanModel = require('../models/fishermanModel');

exports.saveFishermanRecord = async (req, res, next) => {
    try {
        const { name, address, contact_number, 
            family_contact_number } = req.body;

        console.log("-- save fisherman --");

        const save_fisherman = fishermanModel.create({
            name, address, contact_number, family_contact_number
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