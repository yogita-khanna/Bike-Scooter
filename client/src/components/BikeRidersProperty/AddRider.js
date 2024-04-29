import React, { useState } from "react";
import axios from "axios";
import LeftSidebar from "../LeftSidebar";
import Login from "../Login/Login";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8585";

function BikeRiders() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [preOwned, setPreOwned] = useState(0);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [drivingPapers, setDrivingPapers] = useState(null);
  const [error, setError] = useState("");

  console.log(localStorage.getItem("user"));
  if ((!localStorage.getItem("user") || localStorage.getItem("user").length<10)) {
    
    return (
      <div>
        <Login />
      </div>
    );
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    setDrivingPapers(file);
  };

  const addRider = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("preOwned", preOwned);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("drivingPapers", drivingPapers);

    try {
      await axios.post("/api/riders", formData);
      alert("Rider added successfully!");
      setName("");
      setLatitude("");
      setLongitude("");
      setPreOwned(0);
      setAddress("");
      setEmail("");
      setPhoneNumber("");
      setDrivingPapers(null);
    } catch (err) {
      console.error("Error adding rider:", err);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const isValidLatitude = (lat) => {
    return lat >= -90 && lat <= 90;
  };

  const isValidLongitude = (lng) => {
    return lng >= -180 && lng <= 180;
  };



  return (
    <div>
      <LeftSidebar />
      <div className="ml-[25%] w-[75%] container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Bike and Scooter Riders</h1>

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Add Rider</h2>
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={addRider} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">
                Name of the bike/scooter:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">
                Address:
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">
                Email:
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">
                Phone Number :
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div>
              <label htmlFor="drivingPapers" className="block text-lg font-medium text-gray-700">
                Vehicle Papers
              </label>
              <input
                type="file"
                id="drivingPapers"
                name="drivingPapers"
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Pre-Owned:</label>
              <input
                type="number"
                value={preOwned}
                onChange={(e) => setPreOwned(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Latitude:</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Longitude:</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Rider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BikeRiders;
