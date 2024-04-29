<section
        ref={heroRef}
        className={`ml-4 mr-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 ${
          heroInView ? "animate__animated animate__fadeIn" : ""
        }`}
      >
        <div className="container  text-center">
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