import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OtpVerify = ({ onBack }) => {
    const [otp, setOtp] = useState("");

    const handleVerify = (e) => {
        e.preventDefault();
        alert(`Entered OTP: ${otp}`);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div
                className="p-4 rounded shadow-sm bg-white w-100"
                style={{ maxWidth: "500px" }}
            >
                <button 
                    onClick={onBack}
                    className="btn btn-link mb-3 p-0 text-decoration-none d-flex align-items-center"
                >
                    <i className="bi bi-arrow-left me-1"></i> Back
                </button>
                <h5 className="fw-bold mb-1">Verify Your OTP</h5>
                <p className="text-muted small mb-4">
                    Enter the OTP sent to your mobile number
                </p>

                <form onSubmit={handleVerify}>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: "#A992F7",
                            color: "white",
                            fontWeight: "500",
                            padding: "10px 0",
                        }}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerify;
