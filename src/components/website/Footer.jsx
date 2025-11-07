import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import visa from "../../assets/image/visa.png";
import discover from "../../assets/image/discover.png";
import mastercard from "../../assets/image/master-card.png";
import paypal from "../../assets/image/paypal.png";
import amex from "../../assets/image/american-express.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row text-center align-items-center">
          {/* Email Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <p className="mb-1 text-white">Email</p>
            <p className="fw-medium mb-0">lotteryweb@gmail.com</p>
          </div>

          {/* Payment System Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <p className="mb-2 text-white">Supported Payment System</p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <img
                src={visa}
                alt="Visa"
                width="45"
                height="25"
              />
              <img
                src={discover}
                alt="Discover"
                width="45"
                height="25"
              />
              <img
                src={mastercard}
                alt="Mastercard"
                width="45"
                height="25"
              />
              <img
                src={paypal}
                alt="PayPal"
                width="45"
                height="25"
              />
              <img
                src={amex}
                alt="Amex"
                width="45"
                height="25"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-md-4">
            <p className="mb-1 text-white">Contact</p>
            <p className="fw-medium mb-3">5454565768</p>
            <button 
              onClick={handleAdminClick}
              className="btn btn-sm btn-outline-light d-flex align-items-center mx-auto"
            >
              <FiLock className="me-1" /> Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
