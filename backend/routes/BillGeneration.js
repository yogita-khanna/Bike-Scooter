const express = require("express");
const router = express.Router();
const BillGeneration = require("../models/BillGeneration");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.MAIL_ID);
// console.log(process.env.MAIL_PASSWORD);

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

router.post("/billGeneration", async (req, res) => {
  try {
    const {
      user,
      renewableDate,
      bikeType,
      email,
      vehicleName,
      dropLocation,
      advancePayment,
      dateOfRenting,
      numberOfDays,
    } = req.body;

    const newBill = new BillGeneration({
      user,
      renewableDate,
      bikeType,
      email,
      vehicleName,
      dropLocation,
      advancePayment,
      dateOfRenting,
      numberOfDays,
    });

    await newBill.save();

    // Send email
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Bill Details from Two Wheeler Rental Platform",
      text: `Dear Customer,
      
        Thank you for choosing our Two Wheeler Rental Platform. Below are the details of your recent rental bill:
      
        Renewable Date: ${renewableDate}
        Bike Type: ${bikeType}
        Vehicle Name : ${vehicleName}
        Drop Location: ${dropLocation}
        Advance Payment: ${advancePayment} Rs
        Date of Renting the Bike: ${dateOfRenting}
        Number of Days: ${numberOfDays}
      
        Total Amount Due: ${advancePayment * numberOfDays} Rs
      
        Pick Up Address: Sector 7 Main Market.

        Time duration is 12pm to 6pm. Sunday is off.
        For any queries or concerns, please feel free to reach out to us.
        Advance Payment is mandatory.
        Regards,
        Two Wheeler Rental Platform Team`,
      html: `
        <h3>Dear Customer,</h3>
      
        <p>Thank you for choosing our <strong>Two Wheeler Rental Platform</strong>. Below are the details of your recent rental bill:</p>
      
        <ul>
          <li><strong>Renewable Date:</strong> ${renewableDate}</li>
          <li><strong>Bike Type:</strong> ${bikeType}</li>
          <li><strong>Vehicle Name:</strong> ${vehicleName}</li>
          <li><strong>Pick Up Address:</strong> Sector 7, Main Market</li>
          <li><strong>Drop Location:</strong> ${dropLocation}</li>
          <li><strong>Advance Payment:</strong> ${advancePayment} Rs</li>
          <li><strong>Date of Final Payment:</strong> ${dateOfRenting}</li>
          <li><strong>Number of Days:</strong> ${numberOfDays}</li>
        </ul>
      
        <p><strong>Total Amount Due:</strong> ${
          advancePayment * numberOfDays
        } USD</p>
      
        <p>For any queries or concerns, please feel free to reach out to us.</p>
      
        <p>Regards,<br>
        <strong>Two Wheeler Rental Platform Team</strong></p>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      message: "Bill details saved successfully and email sent.",
      bill: newBill,
    });
  } catch (error) {
    console.error("Error saving bill details:", error);
    res.status(500).json({
      message: "Internal server error.",
      error,
    });
  }
});

module.exports = router;
