import React from "react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
    const applicantNumber = "12844";

    return (
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

                        <Link 
                            to={`/login?applicantNumber=${applicantNumber}`}
                            className="btn btn-primary px-4"
                            style={{ backgroundColor: '#A992F7', border: 'none' }}
                        >
                            Login 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
