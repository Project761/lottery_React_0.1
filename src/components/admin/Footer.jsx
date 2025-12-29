import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-3 bg-light border-top">
      <Container fluid>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            {/* <span className="text-muted">
              © {currentYear} RIYASAT VATIKA. All rights reserved.
            </span> */}
          </Col>
          <Col md={6} className="text-center text-md-end text-muted">
            <span>
              Made with ❤️ by{' '}
              <a
                href="https://arustu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                Arustu Technology
              </a>
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
