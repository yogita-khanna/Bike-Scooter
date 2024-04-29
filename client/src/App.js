import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NearestRider from "./components/BikeRidersProperty/NearestRider"
import AddRider from "./components/BikeRidersProperty/AddRider"
import Signup from "./components/signup/Signup";
import Login from "./components/Login/Login";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Gallery from "./components/RenterPortal/Gallery";
import PersonalDetails from "./components/RenterPortal/PersonalDetails";
import BillGenerationForm from "./components/RenterPortal/BillGenerationForm";
import Feedback from "./components/Feedback";

function App() {
  return (
    <div className="m-0 p-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nearestrider" element={<NearestRider />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/addrider" element={<AddRider />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/personaldetails" element={<PersonalDetails />} />
          <Route path="/billgeneration" element={<BillGenerationForm />} />
          <Route path="/feedback" element={<Feedback />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
