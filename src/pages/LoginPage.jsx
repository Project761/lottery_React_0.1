import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginPage = () => {
    const [mobile, setMobile] = useState("");
    const [applicant, setApplicant] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const applicantNumber = searchParams.get('applicantNumber');
        if (applicantNumber) {
            setApplicant(applicantNumber);
        }
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!mobile.trim() || !applicant.trim()) {
            setError("Please fill in all fields");
            return;
        }
        console.log("Login attempt with:", { mobile, applicant });


        // navigate('/payment');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-white text-center py-3">
                            <h4 className="mb-0 fw-bold" style={{ color: "#333" }}>EWS-LIG</h4>
                        </div>
                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Mobile Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Mobile Number"
                                            value={mobile}
                                            autoComplete="off"
                                            onChange={(e) => setMobile(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Applicant Number <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Applicant Number"
                                            value={applicant}
                                            autoComplete="off"
                                            onChange={(e) => setApplicant(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}
                                <div className="mt-4 text-center">
                                    <button
                                        type="submit"
                                        className="btn text-white fw-semibold py-2 px-4"
                                        style={{
                                            backgroundColor: "#A992F7",
                                            fontSize: "16px",
                                            width: "auto",
                                            minWidth: "100px"
                                        }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
