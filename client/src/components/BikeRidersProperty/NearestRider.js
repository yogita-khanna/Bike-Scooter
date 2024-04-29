import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LeftSidebar from "../LeftSidebar";
axios.defaults.baseURL = "http://localhost:8585";

function BikeRiders() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [findLatitude, setFindLatitude] = useState("");
  const [findLongitude, setFindLongitude] = useState("");
  const [nearestRiders, setNearestRiders] = useState([]);
  const [error, setError] = useState("");

  const isValidLatitude = (lat) => {
    return lat >= -90 && lat <= 90;
  };

  const isValidLongitude = (lng) => {
    return lng >= -180 && lng <= 180;
  };

  const findNearestRiders = async (event) => {
    event.preventDefault();

    if (!isValidLatitude(findLatitude) || !isValidLongitude(findLongitude)) {
      setError("Invalid latitude or longitude values.");
      return;
    }

    try {
      const response = await axios.get(
        `/api/nearest-riders?latitude=${findLatitude}&longitude=${findLongitude}`
      );
      console.log(
        "Finding nearest riders URL:",
        `/api/nearest-riders?latitude=${findLatitude}&longitude=${findLongitude}`
      );

      setNearestRiders(response.data);
    } catch (err) {
      console.error("Error finding nearest riders:", err); // Log the error
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <LeftSidebar />
      <div className="container w-[75%] mx-auto p-8 ml-[25%]">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Two Wheeler Rental Platform
          </h1>
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Find Nearest Riders</h2>
          <form onSubmit={findNearestRiders} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Latitude:</label>
              <input
                type="text"
                value={findLatitude}
                onChange={(e) => setFindLatitude(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Longitude:</label>
              <input
                type="text"
                value={findLongitude}
                onChange={(e) => setFindLongitude(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Find Nearest Riders
            </button>
          </form>
        </div>

        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

        <div className="my-8">
  <h2 className="text-2xl font-semibold mb-4">Nearest Riders</h2>
  <ul className="divide-y divide-gray-300">
    {nearestRiders.map((rider, index) => (
      <Link 
        to="/personaldetails" 
        key={index} 
        className="block hover:bg-blue-500 hover:text-white transition duration-300"
      >
        <li className="py-3 flex justify-between items-center">
          <div className="flex-1">
            <p className="text-lg font-semibold">
              <strong>Name:</strong> {rider.name}
            </p>
            <p className="text-sm">
              <strong>Pre-Owned:</strong> {rider.preOwned}
            </p>
          </div>
          <div className="flex space-x-4">
            <p className="text-sm">
              <strong>Latitude:</strong> {rider.location.coordinates[1]}
            </p>
            <p className="text-sm">
              <strong>Longitude:</strong> {rider.location.coordinates[0]}
            </p>
          </div>
        </li>
      </Link>
    ))}
  </ul>
</div>

      </div>
    </div>
  );
}

export default BikeRiders;
