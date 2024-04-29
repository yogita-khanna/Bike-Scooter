import React, { useState } from "react";
import LeftSidebar from "../LeftSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    adharcard: null,
    pancard: null,
    drivingLicence: null,
    days: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleRouting = () =>{
    let vals = Object.values(formData);
    console.log(vals)
    if(vals[0] && vals[1]){

      navigate('/billgeneration')
    }else{
      return;
    }
    
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("adharcard", formData.adharcard);
    formDataToSend.append("pancard", formData.pancard);
    formDataToSend.append("drivinglicence", formData.drivingLicence);
    formDataToSend.append("days", formData.days);

    try {
      const response = await axios.post("http://localhost:8585/api/personaldetails", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({
          name: "",
          adharcard: null,
          pancard: null,
          drivingLicence: null,
          days: 0,
        });
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
      <div className="ml-[25%] w-[75%]">
        <div className="flex justify-center">
          <h1 className="text-5xl">Personal Details</h1>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-semibold mb-4">Upload Documents</h1>

          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter your name"
              />
            </div>

            
            <div>
              <label htmlFor="adharcard" className="block text-lg font-medium text-gray-700">
                Adharcard Picture
              </label>
              <input
                type="file"
                id="adharcard"
                name="adharcard"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="pancard" className="block text-lg font-medium text-gray-700">
                Pancard Picture
              </label>
              <input
                type="file"
                id="pancard"
                name="pancard"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="drivingLicence" className="block text-lg font-medium text-gray-700">
                Driving Licence Picture
              </label>
              <input
                type="file"
                id="drivingLicence"
                name="drivingLicence"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="days" className="block text-lg font-medium text-gray-700">
                No. of Days
              </label>
              <input
                type="Number"
                id="days"
                name="days"
                max='10'
                min='0'
                value={formData.days}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
           
              <button
              onClick={handleRouting}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
