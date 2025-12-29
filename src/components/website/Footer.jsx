import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import visa from "../../assets/image/visa.png";
import discover from "../../assets/image/discover.png";
import mastercard from "../../assets/image/master-card.png";
import paypal from "../../assets/image/paypal.png";
import amex from "../../assets/image/american-express.png";
import { fetchPostData } from "../hooks/Api";

const Footer = () => {

  const navigate = useNavigate();

  const companyId = localStorage.getItem("companyID") || 1;
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    companyId && getContactInfo();
  }, [companyId]);

  const getContactInfo = async () => {
    const response = await fetchPostData("Company/GetSingleData_Company", {
      "CompanyID": localStorage.getItem('companyID') || 1,
    });
    console.log("🚀🚀🚀 ~ getPaperImage ~ response:", response);
    if (response?.length > 0) {
      response[0]?.ContactNo && setContact(response[0]?.ContactNo)
      response[0]?.EmailID && setEmail(response[0]?.EmailID)
    }
  }

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row text-center align-items-center">
          {/* Email Section */}
          <div className="col-md-4 mb-3 mb-md-0">
            <p className="mb-1 text-white">Email</p>
            <p className="fw-medium mb-0">{email}</p>
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
            <p className="fw-medium mb-3">{contact}</p>
            <p className="mb-0">
              <Link
                to="/admin/login"
                className="btn btn-sm btn-outline-light d-inline-flex align-items-center gap-1"
              >
                <FiUser size={14} /> Admin Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
