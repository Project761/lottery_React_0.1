import React, { useState } from "react";
import { Navbar, Button, Dropdown } from "react-bootstrap";
import { FaBars, FaUserCircle, FaSignOutAlt, FaUserCog, FaCog } from "react-icons/fa";
import { showSuccess } from "../../utils/toast";

const NavbarComponent = ({ toggleSidebar, currentPage, totalEntries, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Navbar bg="white" className="shadow-sm px-4 py-2 d-flex align-items-center" style={{
      position: "sticky",
      top: 0,
      zIndex: 1030,
    }}>
      {/* Sidebar toggle (for mobile) */}
      <Button  
        variant="link"
        className="text-dark d-lg-none me-2"
        onClick={toggleSidebar}
      >
        <FaBars />
      </Button>

      {/* Page Title with conditional total entries */}
      <div className="flex-grow-1 d-flex align-items-center">
        <span className="fw-bold text-capitalize fs-5 me-2">
          {currentPage}
        </span>

        {/* Show total entries only on specific pages */}
        
        {/* {totalEntries !== undefined &&
          currentPage.toLowerCase() !== 'dashboard' &&
          currentPage.toLowerCase() !== 'application' &&
          currentPage.toLowerCase() !== 'bankdetails' && (
            <span className="text-muted small">
              – Total {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}:{" "}
              <strong>{totalEntries}</strong>
            </span>
          )} */}
      </div>

      {/* Right-side user dropdown */}
      <div className="d-flex align-items-center ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            id="user-dropdown"
            className="text-dark text-decoration-none d-flex align-items-center"
          >
            <FaUserCircle className="fs-3" />
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0 shadow-sm">
            <Dropdown.Header className="small text-muted">
              {localStorage.getItem('FullName') || 'Admin User'}
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item href="/admin/profile" className="d-flex align-items-center">
              <FaUserCog className="me-2" /> Profile
            </Dropdown.Item>
            <Dropdown.Item href="/admin/settings" className="d-flex align-items-center">
              <FaCog className="me-2" /> Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              as="button"
              className="d-flex align-items-center text-danger"
              onClick={(e) => {
                e.preventDefault();
                showSuccess('Logout...');
                onLogout();
              }}
            >
              <FaSignOutAlt className="me-2" /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
