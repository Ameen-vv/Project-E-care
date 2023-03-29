import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const AboutUs = () => {
  return (
    <>
    <Header/>
    <div className="bg-white px-4 py-8 md:px-16 md:py-12 lg:px-24 lg:py-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-8">About Us</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <img className="w-full rounded-lg shadow-lg" src="/doctor.jpg" alt="Doctor" />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 pl-0 md:pl-8">
          <p className="text-gray-700 text-lg leading-relaxed mb-4 md:mb-8">
            We are a team of experienced doctors dedicated to providing you with the best healthcare experience possible. Our goal is to help you achieve optimal health and wellness by providing personalized and comprehensive care. 
          </p>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faPhone} className="text-gray-600 mr-2" />
            <a href="tel:555-555-5555" className="text-gray-600 hover:text-blue-600 transition-colors">555-555-5555</a>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-600 mr-2" />
            <a href="mailto:info@doctorbooking.com" className="text-gray-600 hover:text-blue-600 transition-colors">info@doctorbooking.com</a>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
