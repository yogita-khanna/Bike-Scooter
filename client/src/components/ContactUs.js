import React, { useState } from "react";
import axios from "axios";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import LeftSidebar from "./LeftSidebar";

const fadeInAnimation = keyframes`${fadeIn}`;

const FadeInDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8585/api/contact", {
        name,
        email,
        message,
        phoneNo,
        vehicleType,
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setName("");
        setEmail("");
        setMessage("");
        setPhoneNo("");
        setVehicleType("");
      } else {
        setErrorMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div>
      <LeftSidebar />
      <FadeInDiv>
        <div className="container mx-auto px-4 py-8 ml-[25%] w-[75%]">
          <h1 className="text-4xl font-semibold mb-8 text-center">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Get In Touch</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Have questions, suggestions, or feedback? We'd love to hear from
                you! Reach out to us via phone, email, or through our contact form
                below.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">Contact Information</h2>
              <ul className="list-disc list-inside text-lg text-gray-700">
                <li className="mb-2">📞 <strong>Phone:</strong> +1 (123) 456-7890</li>
                <li className="mb-2">📧 <strong>Email:</strong> info@riderservices.com</li>
                <li className="mb-2">📍 <strong>Address:</strong> 123 Main St, City, State, ZIP</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Send Us A Message</h2>

            {successMessage && (
              <p className="text-green-500 mb-4">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-lg text-gray-800">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg text-gray-800">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phoneNo" className="block text-lg text-gray-800">Phone No</label>
                  <input
                    type="text"
                    id="phoneNo"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="vehicleType" className="block text-lg text-gray-800">Vehicle Type</label>
                  <input
                    type="text"
                    id="vehicleType"
                    name="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter vehicle type"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-lg text-gray-800">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </FadeInDiv>
    </div>
  );
};

export default ContactUs;
