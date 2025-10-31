import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../components/TermsModal";
import Select from '../../node_modules/react-select/dist/react-select.esm.js';

const IncomeDetails = ({ onBack }) => {
    const navigate = useNavigate();
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [termsModalData, setTermsModalData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedIncome, setSelectedIncome] = useState(null);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Show terms modal when the form is submitted
        setShowTermsModal(true);
    };
    
    const handleAgreeToTerms = () => {
        // Here you would typically submit the form data to your backend
        const formData = {
            category: selectedCategory,
            income: selectedIncome
        };
        console.log('Form submitted:', formData);
        
        // After successful submission, navigate to thank you page
        navigate('/thank-you');
    };
    
    const categoryOptions = [
        { value: 'General', label: 'General' },
        { value: 'OBC', label: 'OBC' },
        { value: 'SC', label: 'SC' },
        { value: 'ST', label: 'ST' }
    ];
    
    const incomeOptions = [
        { value: 'below3', label: 'Below ₹3 Lakh' },
        { value: '3to6', label: '₹3–₹6 Lakh' },
        { value: '6to10', label: '₹6–₹10 Lakh' },
        { value: 'above10', label: 'Above ₹10 Lakh' }
    ];

    return (
        <div className="container px-0 ">
            {/* Header */}
            <div className="bg-secondary text-white text-center py-2 fw-semibold">
                Fill Income Details
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="border p-4 bg-white shadow-sm">
                <div className="row mb-3">
                    {/* Category */}
                    <div className="col-md-6">
                        <label className="form-label">
                            CATEGORY <span className="text-danger">*</span>
                        </label>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="--SELECT Category--"
                            name="category"
                            options={categoryOptions}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            isSearchable={false}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: '38px',
                                    height: '38px',
                                })
                            }}
                        />
                    </div>

                    {/* Annual Income */}
                    <div className="col-md-6">
                        <label className="form-label">
                            ANNUAL INCOME <span className="text-danger">*</span>
                        </label>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="--SELECT Annual Income--"
                            name="income"
                            options={incomeOptions}
                            value={selectedIncome}
                            onChange={setSelectedIncome}
                            isSearchable={false}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: '38px',
                                    height: '38px',
                                })
                            }}
                        />
                    </div>
                </div>

                {/* Terms Checkbox */}
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="termsCheck"
                                checked={isTermsAgreed}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setIsTermsAgreed(isChecked);
                                    if (isChecked) {
                                        setShowTermsModal(true);
                                    }
                                }}
                            />
                            <label className="form-check-label" htmlFor="termsCheck">
                                I HAVE ACKNOWLEDGED AND AGREE THAT I HAVE READ AND UNDERSTOOD THE TERM AND CONDITION.
                            </label>
                        </div>
                    </div>
                </div>

                {/* Project Name */}
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">
                            PROJECT NAME <span className="text-danger">*</span>
                        </label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="project1"
                                name="project"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="project1">
                                SERENITY RESIDENCY
                            </label>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="agree"
                                className="form-check-input me-2"
                                checked={isTermsAgreed}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    setIsTermsAgreed(isChecked);
                                    if (isChecked) {
                                        setShowTermsModal(true);
                                    }
                                }}
                            />
                            <label htmlFor="agree" className="form-check-label text-muted small">
                                I HAVE ACKNOWLEDGED AND AGREE THAT I HAVE READ AND UNDERSTOOD THE TERM AND CONDITION.
                            </label>
                        </div>
                    </div>
                </div>

                {/* Terms Modal */}
                <TermsModal
                    show={showTermsModal}
                    onClose={() => setShowTermsModal(false)}
                    onAgree={handleAgreeToTerms}
                />

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                        type="button"
                        className="btn btn-secondary px-4"
                        onClick={onBack}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IncomeDetails;
