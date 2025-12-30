import React from "react";

const VerifyStatusModal = ({ show, row, onClose, onConfirm }) => {
    if (!show) return null;

    const isVerified =
        String(row?.Status || "").toLowerCase() === "verify";

    return (
        <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    {/* Body */}
                    <div className="modal-body text-center">
                        <p className="mb-0">
                            <strong>
                                Are you sure you want to{" "}
                                {isVerified ? "Unverify" : "Verify"} {" "}
                                this user?
                            </strong>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer justify-content-center border-0">
                        <button className={`btn btn-sm ${isVerified ? "btn-danger" : "btn-success"}`} onClick={onConfirm}>Confirm</button>
                        <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VerifyStatusModal;
