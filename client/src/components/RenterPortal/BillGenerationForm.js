import React, { useState } from "react";
import LeftSidebar from "../LeftSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BillGenerationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    renewableDate: "",
    bikeType: "standard",
    email: "",
    vehicleName: "Hero Splendor Plus",
    dropLocation: "",
    advancePayment: 0,
    numberOfDays: 0,
    dateOfRenting: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8585/api/billGeneration",
        formData
      );

      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setFormData({
          renewableDate: "",
          bikeType: "standard",
          email: "",
          vehicleName: "",
          dropLocation: "",
          advancePayment: 0,
          numberOfDays: 0,
          dateOfRenting: "",
        });

        alert(response.data.message);
        navigate("/");
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
    <div className="">
      <LeftSidebar />
      <div class="ml-[25%] w-[75%] container mx-auto px-4 py-8">
        <h1 class="text-4xl font-semibold mb-4">
          Bike and Scooter Rental Form
        </h1>

        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} class="space-y-4">
        <div>
            <label
              for="pickup"
              class="block text-lg font-medium text-gray-700"
            >
              Pickup Address 
            </label>
            <div
              id="pickup"
              name="pickup"
              class="mt-1 p-2 w-full border rounded-md"
            >Sector 7, Main Market</div>
          </div>

          <div>
            <label
              for="renewableDate"
              class="block text-lg font-medium text-gray-700"
            >
              Renewable Date
            </label>
            <input
              type="date"
              id="renewableDate"
              name="renewableDate"
              value={formData.renewableDate}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <label
              for="bikeType"
              class="block text-lg font-medium text-gray-700"
            >
              Bike/Scooter Type
            </label>
            <select
              id="bikeType"
              name="bikeType"
              value={formData.bikeType}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
            >
              <option value="standard">Standard</option>
              <option value="sports">Sports</option>
              <option value="cruiser">Cruiser</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              for="vehicleName"
              class="block text-lg font-medium text-gray-700"
            >
              Vehicle Name
            </label>
            <select
              id="vehicleName"
              name="vehicleName"
              value={formData.vehicleName}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
            >
              <option value="standard">Hero Splendor Plus</option>
              <option value="sports">Tvs Apache</option>
              <option value="cruiser">Royal Enfield</option>
              <option value="electric">TVS Jupiter</option>
              <option value="cruiser">Honda Activa</option>
              <option value="electric">Honda Grazia</option>
            </select>
          </div>

          <div>
            <label
              for="dropLocation"
              class="block text-lg font-medium text-gray-700"
            >
              Drop Location
            </label>
            <input
              type="text"
              id="dropLocation"
              name="dropLocation"
              value={formData.dropLocation}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter drop location"
            />
          </div>

          <div>
            <label
              for="advancePayment"
              class="block text-lg font-medium text-gray-700"
            >
              Advance Payment
            </label>
            <input
              type="number"
              id="advancePayment"
              name="advancePayment"
              value={formData.advancePayment}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter advance payment amount"
              min="1000"
            />
          </div>

          <div>
            <label
              for="dateOfRenting"
              class="block text-lg font-medium text-gray-700"
            >
              Date Of Renting the Bike
            </label>
            <input
              type="date"
              id="dateOfRenting"
              name="dateOfRenting"
              value={formData.dateOfRenting}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter number of days"
            />
          </div>

          <div>
            <label
              for="numberOfDays"
              class="block text-lg font-medium text-gray-700"
            >
              Number of Days
            </label>
            <input
              type="number"
              id="numberOfDays"
              name="numberOfDays"
              value={formData.numberOfDays}
              onChange={handleChange}
              class="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter number of days"
              min='0'
              max='10'
            />
          </div>

          <div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillGenerationForm;
