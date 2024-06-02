const express = require('express');
const router = express.Router();
const multer = require('multer');
const PersonalDetails = require('../models/PersonalDetails');


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

router.post('/personaldetails', upload.fields([
    { name: 'adharcard', maxCount: 1 },
    { name: 'pancard', maxCount: 1 },
    { name: 'drivinglicence', maxCount: 1 }
  ]), async (req, res) => {
    try {
        const { name, days } = req.body;

        const newPersonalDetails = new PersonalDetails({
            name,
            adharcard: req.files['adharcard'][0].path,
            pancard: req.files['pancard'][0].path,
            drivinglicence: req.files['drivinglicence'][0].path,
            days
        });

        await newPersonalDetails.save();

        res.status(201).json({
            message: 'PersonalDetails details saved successfully.',
            PersonalDetails: newPersonalDetails
        });
    } catch (error) {
        console.error('Error saving Personal details:', error);
        res.status(500).json({
            message: 'Internal server error.',
            error
        });
    }
});

module.exports = router;
