import React, { useState } from "react";
import LoginModal from "./LoginModal";

const ThankYouPage = () => {
    const applicantNumber = "12844";
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginClick = (e) => {
        e.preventDefault();
        setShowLoginModal(true);
    };

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#e6e6e6", minHeight: "100vh" }}
            >
                <div className="container text-center">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2 className="fw-semibold mb-3" style={{ color: "#333" }}>
                                Thank You! for Your Registration
                            </h2>

                            <h5 className="fw-semibold mb-2">
                                Your Applicant Number is
                            </h5>

                            <h4 className="fw-bold mb-3 text-danger">{applicantNumber}</h4>

                            <p className="text-muted mb-4">Please Login for payment</p>

                            <hr />

                            <a 
                                href="#" 
                                className="text-primary text-decoration-none"
                                onClick={handleLoginClick}
                                style={{ cursor: 'pointer' }}
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <LoginModal 
                show={showLoginModal} 
                onClose={() => setShowLoginModal(false)} 
            />
        </>
    );
};

export default ThankYouPage;
