import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../utils/toast";

const TermsModal = ({ show, onClose, onAgree }) => {
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(show);

    useEffect(() => {
        setShowModal(show);
        if (show) {
            setAgree(false);
        }
    }, [show]);

    const handleSubmit = () => {
        if (agree) {
            showSuccess("Terms accepted successfully!");
            handleClose();
            setTimeout(() => {
                onAgree();
            }, 1000);
        } else {
            showError("Please agree to the terms and conditions before proceeding!");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        onClose();
    };

    return (
        <Modal
            show={showModal}
            onHide={handleClose}
            centered
            size="md"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Term and Condition</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    style={{
                        border: "1px solid #ccc",
                        height: "200px",
                        borderRadius: "4px",
                        padding: "15px",
                        overflowY: "auto",
                    }}
                >
                    <h5>Terms and Conditions</h5>
                    <p>1. By agreeing to these terms, you confirm that all information provided is accurate.</p>
                    <p>2. The developer reserves the right to verify all submitted information.</p>
                    <p>3. Any false information may result in disqualification from the lottery.</p>
                    <p>4. The decision of the developer will be final and binding.</p>
                </div>

                <div className="form-check mt-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreeCheck"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="agreeCheck">
                        I have read and understood the terms and conditions and agree to be bound by them.
                    </label>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{
                        backgroundColor: "#555",
                        borderColor: "#555",
                        width: "100px",
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    style={{
                        background: "linear-gradient(to right, #9b5cff, #8a7dff)",
                        border: "none",
                        width: "100px",
                    }}
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TermsModal;
