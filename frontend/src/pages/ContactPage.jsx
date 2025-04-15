import React from "react";
import greenplants from "../../assets/greenplants.jpg";
import { Link } from "react-router-dom";
import ContactUs from "../components/ContactUs";

const ContactPage = () => {
  return (
    <div>
      <div
        className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center"
        style={{ backgroundImage: `url(${greenplants})`, height: "40vh" }}
      >
        <p className="tracking-widest text-sm mb-2 font-light">Contact Us</p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 px-4">
          Let's Connect
        </h1>
      </div>
      <ContactUs />
    </div>
  );
};

export default ContactPage;
