import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const FrontPage = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.5, // Trigger animation when 50% of the section is visible
    triggerOnce: true, // Trigger animation only once
  });

  const [whyUsRef, whyUsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [howItWorksRef, howItWorksInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [faqsRef, faqsInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div className="ml-[25%]">
      <div>
        <h1 className="text-5xl flex justify-center font-bold m-8">
          Two Wheeler Rental Platform
        </h1>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`ml-4 mr-4 text-white py-24 px-6 ${
          heroInView ? "animate__animated animate__fadeIn" : ""
        }`}
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?cs=srgb&dl=pexels-nicholas-dias-1119542-2116475.jpg&fm=jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">
            Your Next Adventure Starts Here
          </h1>
          <p className="text-xl mb-5">
            Rent a two-wheeler hassle-free and explore your city like never
            before.
          </p>
          <Link to="/gallery" className="hover:text-white">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyUsRef}
        className={`m-4 py-10 px-6 bg-white ${
          whyUsInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-lg mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
              erat a libero pellentesque pulvinar. Cras sodales, libero nec
              dignissim malesuada.
            </p>
            <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
              <li>Convenient Booking</li>
              <li>Quality Two-Wheelers</li>
              <li>Flexible Rental Plans</li>
              <li>24/7 Customer Support</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://etimg.etb2bimg.com/photo/69841284.cms"
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className={`m-4 py-24 px-6 bg-gray-100 ${
          howItWorksInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-semibold mb-4">Choose Your Ride</h3>
              <p className="text-lg">
                Select from a variety of two-wheelers that suit your needs.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-semibold mb-4">Book & Ride</h3>
              <p className="text-lg">
                Book your ride online and get ready to hit the road.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white">
              <h3 className="text-2xl font-semibold mb-4">Return & Relax</h3>
              <p className="text-lg">
                Return the vehicle and enjoy the memories of your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className={`m-4 py-24 px-6 ${
          testimonialsInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 rounded-lg shadow-md bg-white">
              <p className="mb-4">
                "I had an amazing experience renting a scooter from
                TwoWheelerRental. The process was smooth and hassle-free!"
              </p>
              <span className="font-semibold">- Jane Doe</span>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white">
              <p className="mb-4">
                "The bikes are well-maintained, and the staff is very
                cooperative. Highly recommended!"
              </p>
              <span className="font-semibold">- John Doe</span>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-white">
              <p className="mb-4">
                "Easy booking, great service, and affordable rates. Will rent
                again!"
              </p>
              <span className="font-semibold">- Alice Smith</span>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={faqsRef}
        className={`m-4 py-24 px-6 bg-gray-100 ${
          faqsInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-5xl font-extrabold mb-16 text-gray-800 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">
                How do I book a ride?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Booking a ride with{" "}
                <strong className="text-blue-600">
                  Two Wheeler Rental Platform
                </strong>{" "}
                is easy! Simply visit our website, choose your preferred
                vehicle, select your pickup and drop-off locations, and confirm
                your booking.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">
                Are there any hidden fees?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                No, we believe in transparent pricing. What you see is what you
                pay.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">
                What payment methods do you accept?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We accept all major credit cards, debit cards, and online
                payment methods for your convenience.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">
                Is there a minimum rental period?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Yes, the minimum rental period is 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">
                Can I modify my booking?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Absolutely! You can modify your booking up to 12 hours before
                the scheduled pickup time.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-3xl font-semibold mb-6 text-gray-800">
                Do you offer insurance?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Yes, we offer optional insurance coverage for your peace of
                mind.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontPage;
