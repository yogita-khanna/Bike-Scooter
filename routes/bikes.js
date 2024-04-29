const express = require("express");
const router = express.Router();
const Rider = require("../models/Biker"); // Assuming Biker.js contains the Rider model
const { requireAuth } = require("../middleware/isLoggedIn");
const multer = require("multer");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g., smtp.gmail.com for Gmail
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,

    //resource for creating two factor passkey  MAIL_PASSWORD  this is passkey
    //   https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer#:~:text=The%20solution%20is%20to%20enable,%3A%2F%2Fmyaccount.google.com%2F

    
    //So the bottom code will probably stop working with Gmail. The solution is to enable 2-Step Verification and generate Application password, then you can use the generated password to send emails using nodemailer.To do so you need to do the following:

    // Go to your Google account at https://myaccount.google.com/
    // Go to Security
    // Choose 2-Step Verification - here you have to verify yourself, in my case it was with phone number and a confirmation code send as text message. After that you will be able to enabled 2-Step Verification
    // Visit https://myaccount.google.com/apppasswords to create your app.
    // Put a name e.g. nodemailer to your app and create it.
    // A modal dialog will appear with the password. Get that password and use it in your code.
  },
});



// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

router.post(
  "/riders",
  upload.fields([
    { name: "drivingPapers", maxCount: 1 },
  ]),
  // requireAuth,
  async (req, res) => {
    try {
      const {
        name,
        latitude,
        longitude,
        preOwned,
        address,
        email,
        phoneNumber,
      } = req.body;
      const newRider = new Rider({
        name,
        preOwned,
        address,
        email,
        phoneNumber,
        drivingPapers: req.files['drivingPapers'][0].path,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      });
      await newRider.save();



// Send email
const mailOptions = {
  from: process.env.MAIL_ID,
  to: email,
  subject: "Inspection Details from Two Wheeler Rental Platform",
  text: `Dear Customer,
  
Thank you for using our Two Wheeler Rental Platform. We are in the process of inspecting the details you provided for your rental. Our team will be visiting your location to verify the information and inspect the vehicle.

Please ensure that the following details are accurate:
  
Name: ${name}
Address: ${address}
Latitude: ${latitude}
Longitude: ${longitude}
Pre-Owned: ${preOwned}
Phone Number: ${phoneNumber} 
Our team will take pictures of the bike/scooter during the inspection process for verification purposes.

For any queries or concerns, please feel free to reach out to us.

Regards,
Two Wheeler Rental Platform Team`,
  html: `
<h3>Dear Customer,</h3>

<p>Thank you for using our <strong>Two Wheeler Rental Platform</strong>. We are in the process of inspecting the details you provided for your rental. Our team will be visiting your location to verify the information and inspect the vehicle.</p>

<p>Please ensure that the following details are accurate:</p>

<ul>
  <li><strong>Name :</strong> ${name}</li>
  <li><strong>Address :</strong> ${address}</li>
  <li><strong>Latitude :</strong> ${latitude}</li>
  <li><strong>Longitude :</strong> ${longitude}</li>
  <li><strong>Phone Number :</strong> ${phoneNumber}</li>
  <li><strong>Pre-Owned :</strong> ${preOwned}</li>

</ul>

<p>Our team will take pictures of the bike/scooter during the inspection process for verification purposes.</p>

<p>For any queries or concerns, please feel free to reach out to us.</p>

<p>Regards,<br>
<strong>Two Wheeler Rental Platform Team</strong></p>`,
attachments: [
  {
    path: req.files['drivingPapers'][0].path, // Path to the file
  }
]
};


    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });



      res.status(201).json(newRider);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/nearest-riders", async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const riders = await Rider.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: 10000, // Max distance in meters (adjust as needed)
        },
      },
    });
    res.json(riders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
