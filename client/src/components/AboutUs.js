import React from "react";
import LeftSidebar from "./LeftSidebar";
import { useInView } from "react-intersection-observer";
import "animate.css/animate.min.css";

const AboutUs = () => {
  const [whyUsRef, whyUsInView] = useInView({
    threshold: 0.7, // Trigger animation when 70% of the section is visible
    triggerOnce: true, // Trigger animation only once
  });

  const [ourCommitmentRef, ourCommitmentInView] = useInView({
    threshold: 0.9, // Trigger animation when 90% of the section is visible
    triggerOnce: true, // Trigger animation only once
  });

  const [joinUsRef, joinUsInView] = useInView({
    threshold: 0.9, // Trigger animation when 90% of the section is visible
    triggerOnce: true, // Trigger animation only once
  });

  return (
    <div>
      <LeftSidebar />
      <div className="ml-[25%] w-[75%] container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-8 animate__animated animate__fadeIn">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg p-8">
            <img src="https://m.economictimes.com/thumb/msid-106737607,width-1200,height-1200,resizemode-4,imgsize-61740/pride.jpg" alt="Team" className="w-full mb-8 rounded-lg shadow-lg animate__animated animate__fadeInLeft" />
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4 animate__animated animate__fadeInLeft">Who We Are</h2>
              <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeInLeft">
                At <strong>Riders Services</strong>, we are passionate about
                providing convenient and reliable two-wheeler rental solutions to
                our customers. Whether you're a daily commuter, a traveler
                exploring the city, or someone in need of a temporary ride, we've
                got you covered.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg p-8">
            <img
              src="https://img.freepik.com/free-vector/gradient-our-mission-infographics_23-2149090463.jpg"
              alt="Mission"
              className="w-full mb-8 rounded-lg shadow-lg animate__animated animate__fadeInRight"
            />
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4 animate__animated animate__fadeInRight">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeInRight">
                Our mission is to make transportation more accessible and affordable for everyone. We believe in the power of two-wheelers to offer flexibility, reduce congestion, and provide a greener alternative to traditional commuting methods.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={whyUsRef}
          className={`mt-12 bg-gray-100 rounded-lg p-8 ${
            whyUsInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li className="mb-4">
              🏍 <strong>Wide Range of Vehicles:</strong> From scooters to
              motorcycles, we offer a diverse fleet to suit your needs.
            </li>
            <li className="mb-4">
              📲 <strong>Easy Booking:</strong> Our user-friendly platform
              allows you to book your ride in just a few clicks.
            </li>
            <li className="mb-4">
              💰 <strong>Transparent Pricing:</strong> No hidden fees. What you
              see is what you pay.
            </li>
            <li className="mb-4">
              🛠 <strong>Safety First:</strong> All our vehicles undergo regular
              maintenance and safety checks to ensure your ride is smooth and
              secure.
            </li>
          </ul>
        </div>

        <div
          ref={ourCommitmentRef}
          className={`mt-12 bg-gray-100 rounded-lg p-8 ${
            ourCommitmentInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          <h2 className="text-3xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-lg text-gray-700 mb-6">
            We are committed to delivering exceptional customer service and
            ensuring your experience with us is hassle-free. Our dedicated team
            is always ready to assist you with any queries or concerns you may
            have.
          </p>
        </div>

        <div
          ref={joinUsRef}
          className={`mt-12 bg-gray-100 rounded-lg p-8 ${
            joinUsInView ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          <h2 className="text-3xl font-semibold mb-4">Join Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            Join the <strong>Riders Services</strong> community today and
            experience the freedom of riding on your terms!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
