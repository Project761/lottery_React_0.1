import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormData } from "../../context/FormDataContext";

const Header = () => {
  const { resetFormData } = useFormData();
  let userID = localStorage.getItem('UserID');

  return (
    <header className="py-2 border-bottom shadow-sm bg-white">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none">
          <h5 className="header-title fw-bold mb-0 text-uppercase position-relative" style={{ color: '#000' }}>
            SERENITY RESIDENCY
            <span style={{ display: "block", height: "2px", width: "100%", backgroundColor: "red", marginTop: "2px", }}></span>
          </h5>
        </Link>

        {userID ? (
          <div>
            <Link to="/personal-details">
              <Button className="log-button" style={{marginRight: '18px'}}>Download Receipt</Button>
            </Link>
            <Link to="/">
              <Button className="log-button" onClick={resetFormData}>Logout</Button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <Button className="log-button">
              Applicant Login
            </Button>
          </Link>
        )}
      </Container>
    </header>
  );
};

export default Header;
