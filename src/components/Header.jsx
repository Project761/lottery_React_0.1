import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-2 border-bottom shadow-sm bg-white">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none">
          <h5 className="header-title fw-bold mb-0 text-uppercase position-relative" style={{ color: '#000' }}>
            SERENITY RESIDENCY
            <span
              style={{
                display: "block",
                height: "2px",
                width: "100%",
                backgroundColor: "red",
                marginTop: "2px",
              }}
            ></span>
          </h5>
        </Link>

        <Link to="/login">
          <Button
            style={{
              backgroundColor: "#A992F7",
              border: "none",
              fontWeight: "500",
              padding: "6px 18px",
              borderRadius: "6px",
              textDecoration: 'none',
              color: 'white'
            }}
          >
            Applicant Login
          </Button>
        </Link>
      </Container>
    </header>
  );
};

export default Header;
