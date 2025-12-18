import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    BiHome,
    BiBuildingHouse,
    BiUser,
    BiFolder,

    BiMap,
    BiLogOut,
    BiCreditCard,
} from "react-icons/bi";
import { showSuccess } from "../../utils/toast";

const Sidebar = ({ sidebarOpen, isMobile, setSidebarOpen, onLogout }) => {
    const location = useLocation();

    const menuItems = [
        { path: "/admin/dashboard", icon: <BiHome />, label: "Dashboard" },
        { path: "/admin/bank", icon: <BiBuildingHouse />, label: "Banks" },
        { path: "/admin/DemandDraftAmount", icon: <BiBuildingHouse />, label: "Demand Draft Amount" },
        { path: "/admin/caste", icon: <BiUser />, label: "Castes" },

        // { path: "/admin/city", icon: <BiUser />, label: "Cities" },
        // { path: "/admin/project", icon: <BiFolder />, label: "Projects" },
        // { path: "/admin/plot", icon: <BiMap />, label: "Plots" },
        // { path: "/admin/application", icon: <BiFolder />, label: "Applications" },
        // { path: "/admin/bank-details", icon: <BiCreditCard />, label: "Bank Details" },
    ];

    // Function to check if a menu item is active
    const isActive = (path) => {
        return location.pathname === path ||
            (path === "/admin/dashboard" && location.pathname === "/admin");
    };

    return (
        <>
            {/* Sidebar */}
            <div
                className={`bg-dark text-white p-3 vh-100 ${sidebarOpen ? "d-block" : "d-none d-lg-block"
                    }`}
                style={{
                    width: "250px",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    overflowY: "auto",
                    transition: "all 0.3s",
                    zIndex: 1001,
                }}
            >
                <div className="d-flex flex-column h-100">
                    <div className="mb-3 text-center">
                        <h5 className="fw-bold mb-0">🏠 RIYASAT VATIKA</h5>
                        <p className="text-secondary small mb-0">PHASE - 1</p>
                    </div>

                    <ul className="nav flex-column">
                        {menuItems.map((item) => (
                            <li key={item.path} className="nav-item mb-1">
                                <Link
                                    to={item.path}
                                    className={`nav-link text-white d-flex align-items-center gap-2 ${isActive(item.path)
                                        ? "active bg-primary rounded-2 px-2"
                                        : ""
                                        }`}
                                    onClick={() => isMobile && setSidebarOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Logout */}
                    <div className="mt-auto pt-3 border-top">
                        <div
                            className="nav-link text-white d-flex align-items-center gap-2 w-100 bg-transparent border-0"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                showSuccess('Logging out...');
                                onLogout();
                            }}
                        >
                            <BiLogOut /> <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobile && sidebarOpen && (
                <div
                    className="position-fixed bg-dark bg-opacity-50 w-100 h-100"
                    style={{ zIndex: 1000, top: 0, left: 0 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
