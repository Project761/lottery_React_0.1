import React, { useEffect, useState } from "react";
import Select from '../../node_modules/react-select/dist/react-select.esm.js';
import { fetchPostData } from "../components/hooks/Api.js";
import toast, { showError } from "../utils/toast.js";
import { onChangeDropdown } from "../utils/Comman.js";
import { useFormData } from "../context/FormDataContext.jsx";

const BankDetailsForm = ({ onBack }) => {
    const [selectedBank, setSelectedBank] = useState(null);
    const [activeTab, setActiveTab] = useState("bank");
    const { formData, setFormData } = useFormData();
    const [bankDetails, setBankDetails] = useState([]);

    useEffect(() => {
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
    }, [formData]);

    const handleTabChange = (tabId) => {
        if (tabId === 'personal') {
            onBack();
        } else {
            setActiveTab(tabId);
        }
    };

    const fetchBankDetails = async () => {
        try {
            const response = await fetchPostData('Bank/GetDataDropDown_Bank', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            })
            if (response && Array.isArray(response)) {
                setBankDetails(response);
            } else {
                setBankDetails([]);
            }
        } catch {
            showError('Error fetching Bank Details');
        }
    }
    const applicantName = localStorage.getItem("FullName") || '';

    useEffect(() => {
        fetchBankDetails();
    }, []);

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
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter applicant name" value={applicantName}/>
                    </div>

                    {/* Account Number */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Bank Account Number <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter account number" value={formData.AccountNumber} onChange={(e) => setFormData({...formData, AccountNumber: Number(e.target.value)})}/>
                    </div>

                    {/* Select Bank */}
                    <div className="col-md-4">
                        <label className="form-label"> Select Bank <span className="text-danger">*</span></label>
                        <Select
                            value={
                                formData.BankName ?
                                    {
                                        value: formData.BankName,
                                        label: bankDetails.find((b) => b.BankID === formData.BankName)?.Description || '',
                                    } : null
                            }
                            className="w-full"
                            placeholder="Select Bank"
                            options={bankDetails.map((b) => ({
                                value: b.BankID,
                                label: b.Description
                            }))}
                            onChange={(event) => {
                                onChangeDropdown(event, setFormData, formData, 'BankName');
                            }}
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
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter IFSC code" value={formData.IfscCode} onChange={(e) => setFormData({...formData, IfscCode: e.target.value})}/>
                    </div>

                    {/* Bank Branch Address */}
                    <div className="col-md-4">
                        <label className="form-label">
                            Bank Branch Address <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter branch address" value={formData.BranchAddress} onChange={(e) => setFormData({...formData, BranchAddress: e.target.value})}/>
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
