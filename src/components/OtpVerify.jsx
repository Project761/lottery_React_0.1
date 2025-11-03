import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OtpVerify = ({ onBack, onVerify, MobileNumber, isSubmitting }) => {
    const [otp, setOtp] = useState("");

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }
        await onVerify(otp);
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="p-4 rounded shadow-sm bg-white w-100" style={{ maxWidth: "500px" }}>
                <button onClick={onBack} className="btn btn-link mb-3 p-0 text-decoration-none d-flex align-items-center">
                    <i className="bi bi-arrow-left me-1"></i> Back
                </button>

                <h5 className="fw-bold mb-1">Verify Your OTP</h5>
                <p className="text-muted small mb-4">
                    Enter the OTP sent to your mobile number ({MobileNumber})
                </p>

                <form onSubmit={handleVerify}>
                    <input type="text" className="form-control mb-3" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required autoComplete="off"/>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn w-100"
                        style={{
                            backgroundColor: "#A992F7",
                            color: "white",
                            fontWeight: "500",
                            padding: "10px 0",
                            opacity: isSubmitting ? 0.7 : 1,
                        }}
                    >
                        {isSubmitting ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpVerify;
