import React, { useState } from "react";
import Select from '../../node_modules/react-select/dist/react-select.esm.js';

const DemandDraftDetails = ({ onBack }) => {
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);

    const bankOptions = [
        { value: 'HDFC', label: 'HDFC Bank' },
        { value: 'SBI', label: 'State Bank of India' },
        { value: 'ICICI', label: 'ICICI Bank' },
        { value: 'PNB', label: 'Punjab National Bank' },
        { value: 'AXIS', label: 'Axis Bank' }
    ];

    const amountOptions = [
        { value: '1000', label: '₹ 1,000' },
        { value: '5000', label: '₹ 5,000' },
        { value: '10000', label: '₹ 10,000' }
    ];

    return (
        <div className="container px-0 ">
            {/* Section Header */}
            <div className="text-center text-white fw-semibold py-1 mb-2" style={{ backgroundColor: "#6c757d" }}>
                Fill Demand Draft Details
            </div>

            {/* Bank Info Bar */}
            <div className="text-center text-white py-1" style={{ backgroundColor: "#6c757d", fontSize: "14px" }}>
                <div className="row g-3 align-items-center">
                    <div className="col-md-12">
                        <span className="me-2">Bank Name: <b>HDFC Bank</b></span>
                        <span className="me-3">A/C Name: <b>New Path Developers LLP</b></span>
                        <span className="me-3">A/C Number: <b>50200110010818</b></span>
                        <span>IFSC Code: <b>HDFC0000054</b></span>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="border p-4 bg-white shadow-sm">
                <form>
                    <div className="row g-3">
                        {/* Demand Draft / Payment Transfer Number */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold " style={{ fontSize: "14px" }}>
                                DEMAND DRAFT / PAYMENT TRANSFER NUMBER <span className="text-danger">*</span>
                            </label>
                            <input type="text" autoComplete="off" className="form-control" />
                        </div>

                        {/* Demand Draft / Online Payment Date */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>
                                DEMAND DRAFT / ONLINE PAYMENT DATE <span className="text-danger">*</span>
                            </label>
                            <input type="date" autoComplete="off" className="form-control" />
                        </div>

                        {/* Select Bank */}
                        <div className="col-md-4">
                            <label
                                className="form-label fw-semibold"
                                style={{ fontSize: "14px" }}
                            >
                                SELECT BANK <span className="text-danger">*</span>
                            </label>

                            <Select
                                options={bankOptions}
                                value={selectedBank}
                                onChange={setSelectedBank}
                                placeholder="--SELECT BANK--"
                                classNamePrefix="react-select"
                            />
                        </div>

                        {/* Select Amount */}
                        <div className="col-md-4">
                            <label
                                className="form-label fw-semibold"
                                style={{ fontSize: "14px" }}
                            >
                                SELECT AMOUNT <span className="text-danger">*</span>
                            </label>

                            <Select
                                options={amountOptions}
                                value={selectedAmount}
                                onChange={setSelectedAmount}
                                placeholder="--SELECT AMOUNT--"
                                classNamePrefix="react-select"

                            />
                        </div>

                        {/* Attachment */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold" style={{ fontSize: "14px" }}>ATTACHMENT</label>
                            <input type="file" autoComplete="off" className="form-control" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button type="button" className="btn btn-secondary px-4" onClick={onBack}>
                            Back
                        </button>
                        <button
                            type="submit"
                            className="btn text-white px-4"
                            style={{ backgroundColor: "#A992F7" }}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DemandDraftDetails;
