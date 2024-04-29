import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { GiBuyCard } from "react-icons/gi";
import { RiContrastFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaRegistered } from "react-icons/fa6";
import { RiLogoutCircleFill } from "react-icons/ri";

const LeftSidebar = () => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    await axios.get("http://localhost:8585/api/user/logout");

    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user.length > 10) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <div className="w-[25%] h-[647px] bg-gradient-to-b from-blue-900 to-blue-700 fixed p-2 rounded-lg shadow-lg">
      <h1 className="p-2 font-semibold text-white text-3xl">Riders Services</h1>
      <div className="p-1 font-semibold text-white text-xl space-y-2">
        <Link
          to="/"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <IoHomeSharp className="mt-4" />
          <h5 className="p-2">Home</h5>
        </Link>
        <Link
          to="/aboutus"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <FaInfoCircle className="mt-4" />
          <h5 className="p-2">About Us</h5>
        </Link>
        <Link
          to="/gallery"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <FaRegistered className="mt-4" />
          <h5 className="p-2">Renter Portal</h5>
        </Link>
        <Link
          to="/addrider"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <RiContrastFill className="mt-4" />
          <h5 className="p-2">Owner Portal</h5>
        </Link>
        <Link
          to="/contactus"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <IoMdContact className="mt-4" />
          <h5 className="p-2">Contact Us</h5>
        </Link>
        <Link
          to="/feedback"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <MdFeedback className="mt-4" />
          <h5 className="p-2">Feedback</h5>
        </Link>
        {isLoggedIn ? (
          <></>
        ) : (
          <Link
          to="/login"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <RiLoginCircleFill className="mt-4" />
          <h5 className="p-2">Login</h5>
        </Link>
        )}
        {isLoggedIn ? (
          <></>
        ) : (
          <Link
          to="/register"
          className="rounded hover:bg-blue-700 hover:text-white flex p-2"
        >
          <GiBuyCard className="mt-4" />
          <h5 className="p-2">Register</h5>
        </Link>
        )}

        {isLoggedIn ? (
          <div className="rounded hover:bg-blue-700 hover:text-white flex p-2">
            <RiLogoutCircleFill className="mt-4" />
            <button onClick={handleLogout} className="p-2">
              Logout
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
