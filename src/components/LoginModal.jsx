import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const LoginModal = ({ show, onClose }) => {
    const [mobile, setMobile] = useState("");
    const [applicant, setApplicant] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Mobile:", mobile);
        console.log("Applicant:", applicant);
        // You can add login logic here
    };

    return (
        <Modal 
            show={show} 
            onHide={onClose}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center fw-bold" style={{ color: "#333" }}>
                    EWS-LIG
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label className="fw-semibold" style={{ fontSize: "14px" }}>
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Your Reg. Mobile Number"
                                value={mobile}
                                autoComplete="off"
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-6 mb-3">
                            <label className="fw-semibold" style={{ fontSize: "14px" }}>
                                Applicant Number
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

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn w-auto mt-2 text-white fw-semibold"
                            style={{
                                backgroundColor: "#A992F7",
                                fontSize: "16px",
                                letterSpacing: "0.5px",
                                border: "none",
                                padding: "8px 15px",
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
