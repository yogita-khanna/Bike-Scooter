const express = require('express');
const router = express.Router();
const  Contact = require('../models/ContactDetails');
const isLoggedIn = require('../middleware/isLoggedIn');

router.post('/contact', async (req, res) => {
    try {
        const { name, email, message, phoneNo, vehicleType } = req.body;
        const userId = req.session.user ? req.session.user._id : null;

        // Check if the email already exists
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).json({
                message: "Email already exists.",
                success: false,
            });
        }

        // Create a new contact with user's ID
        const newContact = new Contact({
            user: userId, // Assign user's ID to the contact
            name,
            email,
            message,
            phoneNo,
            vehicleType
        });

        // Save the contact to the database
        await newContact.save();

        return res.status(201).json({
            message: "Contact details saved successfully.",
            success: true,
            contact: newContact,
        });
    } catch (error) {
        console.error("Error saving contact details:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
});



module.exports = router;
