const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactDetails');
const User = require('../models/userSchema');
const bcryptjs = require('bcryptjs');
const  func = require('./adminAuth');



router.post('/user/register', func.signup_post)

router.post('/user/login', func.login_post);

router.get('/user/logout', (req, res) => {
    try {
        // Clear the token cookie by setting it to an empty string and expiring it immediately
        return res.cookie("token", "", { expires: new Date(0) }).json({
            message: "User logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
});

module.exports = router;
