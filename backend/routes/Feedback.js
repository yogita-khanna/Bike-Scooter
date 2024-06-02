const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Assuming your model is named Feedback
// const isLoggedIn = require('../middleware/isLoggedIn');

router.post('/feedback', async (req, res) => {
    try {
        const { name, email, rating, comments, date, vehicleType } = req.body;

        // Check if the email already exists
        const existingFeedback = await Feedback.findOne({ email });
        if (existingFeedback) {
            return res.status(400).json({
                message: "Feedback already exists.",
                success: false,
            });
        }

        // Create a new feedback
        const newFeedback = new Feedback({
            name,
            email,
            rating,
            comments,
            vehicleType,
            date
        });

        // Save the feedback to the database
        await newFeedback.save();

        return res.status(201).json({
            message: "Feedback saved successfully.",
            success: true,
            feedback: newFeedback,
        });
    } catch (error) {
        console.error("Error saving feedback:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});

module.exports = router;
