import React, { useState } from "react";
import Select from '../../node_modules/react-select/dist/react-select.esm.js';

const BankDetailsForm = ({ onBack }) => {
    const bankOptions = [
        { value: 'SBI', label: 'State Bank of India' },
        { value: 'HDFC', label: 'HDFC Bank' },
        { value: 'ICICI', label: 'ICICI Bank' },
        { value: 'PNB', label: 'Punjab National Bank' },
        { value: 'BOB', label: 'Bank of Baroda' },
        { value: 'AXIS', label: 'Axis Bank' },
        { value: 'KOTAK', label: 'Kotak Mahindra Bank' },
        { value: 'INDUSIND', label: 'IndusInd Bank' }
    ];

    const [selectedBank, setSelectedBank] = useState(null);
    const [activeTab, setActiveTab] = useState("bank");

    const handleTabChange = (tabId) => {
        if (tabId === 'personal') {
            onBack();
        } else {
            setActiveTab(tabId);
        }
    };
    return (
        <div className="container px-0 ">

            {/* Form Header */}
            <div className="bg-secondary text-white text-center py-2 fw-semibold">
                Applicant Bank Details (Please enter correct Bank details because refund will come in same account)
            </div>

            {/* Form */}
            <form className="border p-4 bg-white shadow-sm">
                <div className="row g-3">
                    {/* Applicant Name */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Applicant Name <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter applicant name" />
                    </div>

                    {/* Account Number */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Bank Account Number <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter account number" />
                    </div>

                    {/* Select Bank */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Select Bank <span className="text-danger">*</span>
                        </label>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="--SELECT Bank--"
                            name="bank"
                            options={bankOptions}
                            value={selectedBank}
                            onChange={(selectedOption) => setSelectedBank(selectedOption)}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: '38px',
                                    height: '38px',
                                })
                            }}
                        />
                    </div>

                    {/* IFSC Code */}
                    <div className="col-md-4">
                        <label className="form-label">
                            IFSC Code <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter IFSC code" />
                    </div>

                    {/* Bank Branch Address */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Bank Branch Address <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter branch address" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        type="button"
                        className="btn btn-secondary px-4"
                        onClick={onBack}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="btn text-white px-4"
                        style={{ backgroundColor: "#A992F7" }}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BankDetailsForm;
