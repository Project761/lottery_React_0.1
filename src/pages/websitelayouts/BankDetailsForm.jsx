import React, { useEffect, useState } from "react";
import Select from '../../../node_modules/react-select/dist/react-select.esm.js';
import { fetchPostData } from "../../components/hooks/Api.js";
import { showError } from "../../utils/toast.js";
import { onChangeDropdown, upperCaseValue, ChangeArrayFormat, selectValue, handleOnlyAlphabet, onlyDigitsWithLimit } from "../../utils/Comman.js";
import { useFormData } from "../../context/FormDataContext.jsx";
import { useNavigate } from "react-router-dom";

const BankDetailsForm = () => {
    const [selectedBank, setSelectedBank] = useState(null);
    const [activeTab, setActiveTab] = useState("bank");
    const { formData, setFormData } = useFormData();
    const [bankDetails, setBankDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
    }, [formData]);

    const fetchBankDetails = async () => {
        try {
            const response = await fetchPostData('Bank/GetDataDropDown_Bank', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: localStorage.getItem('companyID') || 1,
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

    const handleNext = () => {
        const requiredFields = [
            "BankUserName",
            "AccountNumber",
            "BankName",
            "IfscCode",
            "BranchAddress",
        ];

        const isAnyFieldMissing = requiredFields.some(
            (field) =>
                !formData[field] || formData[field].toString().trim() === ""
        );

        if (isAnyFieldMissing) {
            showError("Please fill all mandatory Fields");
            return;
        }

        navigate("/application-processing-fees");
        // navigate("/dd-details");
    };

    const onBack = () => {
        navigate("/apply")
    }

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
                        <label className="form-label fw-semibold mb-1">
                            Applicant Name <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter Applicant Name" value={formData.BankUserName} maxLength="30" onChange={(e) => setFormData({ ...formData, BankUserName: handleOnlyAlphabet(e.target.value) })} />
                    </div>

                    {/* Account Number */}
                    <div className="col-md-4">
                        <label className="form-label fw-semibold mb-1">
                            Bank Account Number <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter Account Number" value={formData.AccountNumber} maxLength="20" onChange={(e) => setFormData({ ...formData, AccountNumber: onlyDigitsWithLimit((e.target.value), 20) })} />
                    </div>
                    {/* Select Bank */}
                    <div className="col-md-4">
                        <label className="form-label fw-semibold mb-1"> Select Bank <span className="text-danger">*</span></label>
                        <Select
                            value={selectValue(bankDetails, 'BankID', formData.BankName, 'Description')}
                            className="w-full"
                            placeholder="Select Bank"
                            options={ChangeArrayFormat(bankDetails, 'BankID', 'Description')}
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
                        <label className="form-label fw-semibold mb-1">
                            IFSC Code <span className="text-danger">*</span>
                        </label>
                        {/* <input type="text"maxLength={11} className="form-control" autoComplete="off" placeholder="Enter IFSC Code" value={formData.IfscCode} onChange={(e) => setFormData({...formData, IfscCode: upperCaseValue(e.target.value)})}/> */}
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter IFSC Code" value={formData.IfscCode} maxLength="11" onChange={(e) => setFormData({ ...formData, IfscCode: upperCaseValue(e.target.value) })} />
                    </div>

                    {/* Bank Branch Address */}
                    <div className="col-md-4">
                        <label className="form-label fw-semibold mb-1">
                            Bank Branch Address <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" autoComplete="off" placeholder="Enter Branch Address" value={formData.BranchAddress} maxLength="250" onChange={(e) => setFormData({ ...formData, BranchAddress: e.target.value })} />
                    </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button type="button" className="btn btn-secondary px-4" onClick={onBack}> Back </button>
                    <button type="button" className="btn text-white px-4" style={{ backgroundColor: "#A992F7" }} onClick={handleNext}> Next </button>
                </div>
            </form>
        </div>
    );
};

export default BankDetailsForm;
