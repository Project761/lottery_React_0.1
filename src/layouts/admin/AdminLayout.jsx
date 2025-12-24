import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/admin/NavbarComponent";
import Footer from "../../components/admin/Footer";
import Sidebar from "../../components/admin/Sidebar";

const AdminLayout = ({ onLogout }) => {
  
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getPageTitle = () => {
    const path = location.pathname;
    // Handle both /admin/... and /... paths
    const pathParts = path.split('/').filter(Boolean);
    const basePath = pathParts[1] || pathParts[0] || 'dashboard';

    // Convert kebab-case to Title Case (e.g., 'bank-details' -> 'Bank Details')
    return basePath
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="d-flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        setSidebarOpen={setSidebarOpen}
        onLogout={onLogout}
      />

      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: isMobile ? "0" : "250px",
          transition: "all 0.3s",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          currentPage={getPageTitle()}
          totalEntries={totalEntries}
          onLogout={onLogout}
        />

        <main className="flex-grow-1" style={{ width: "100%" }}>
          <div className="page-wrapper">
            <Outlet context={{ setTotalEntries }} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
