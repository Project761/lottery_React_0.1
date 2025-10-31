import React, { useState, useEffect } from "react";
import OtpVerify from "../components/OtpVerify";
import BankDetailsForm from "./BankDetailsForm";
import { showSuccess, showError } from '../utils/toast';
import Select from '../../node_modules/react-select/dist/react-select.esm.js';

// Simulate sending OTP to mobile (replace with actual API call)
const sendOtpToMobile = async (mobileNumber) => {
    // In a real app, this would be an API call to your backend
    return new Promise((resolve) => {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP for ${mobileNumber}: ${otp}`); // For testing
        setTimeout(() => resolve(otp), 1000);
    });
};

// Simulate verifying OTP (replace with actual API call)
const verifyMobileOtp = async (mobileNumber, otp) => {
    // In a real app, this would verify with your backend
    return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
            // In a real app, the backend would verify the OTP
            resolve(true);
        }, 1000);
    });
};

const PersonalDetailsForm = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [showOtp, setShowOtp] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({});

    const castOptions = [
        { value: 'General', label: 'General' },
        { value: 'OBC', label: 'OBC' },
        { value: 'SC', label: 'SC' },
        { value: 'ST', label: 'ST' }
    ];

    const [formData, setFormData] = useState({
        applicantName: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        relation: '',
        relationName: '',
        idType: '',
        idNumber: '',
        aadhaarNumber: '',
        cast: '',
        mobileNumber: '',
        rashanCardNumber: '',
        zipCode: '',
        city: '',
        state: 'RAJASTHAN',
        country: 'INDIA',
        permanentAddress: '',
        sameAsPermanent: false,
        postalAddress: ''
    });

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'applicantName', 'gender', 'dateOfBirth', 'email', 'relation', 'relationName',
            'idType', 'idNumber', 'aadhaarNumber', 'cast', 'mobileNumber', 'zipCode',
            'city', 'permanentAddress'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Mobile number validation
        if (formData.mobileNumber && !/^[0-9]{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
        }

        // Aadhaar validation
        if (formData.aadhaarNumber && !/^[0-9]{12}$/.test(formData.aadhaarNumber)) {
            newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleSameAddressChange = (e) => {
        const isChecked = e.target.checked;
        setFormData({
            ...formData,
            sameAsPermanent: isChecked,
            postalAddress: isChecked ? formData.permanentAddress : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showError('Please fill all required fields correctly');
            return;
        }

        // Validate mobile number
        if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
            showError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsSubmitting(true);

        try {
            // Send OTP to mobile
            await sendOtpToMobile(formData.mobileNumber);

            // Show OTP verification screen
            setShowOtp(true);
            showSuccess(`OTP sent to ${formData.mobileNumber}`);
        } catch (error) {
            console.error('Error sending OTP:', error);
            showError('Failed to send OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendOtp = async () => {
        if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
            showError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsSendingOtp(true);
        try {
            // In a real app, call your backend API to send OTP
            const generatedOtp = await sendOtpToMobile(formData.mobileNumber);
            setOtpSent(true);
            showSuccess(`OTP sent to ${formData.mobileNumber}`);
        } catch (error) {
            console.error('Failed to send OTP:', error);
            showError('Failed to send OTP. Please try again.');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setErrors({ ...errors, otp: 'Please enter a valid 6-digit OTP' });
            return;
        }

        setIsSubmitting(true);
        try {
            // In a real app, verify OTP with your backend
            const isValid = await verifyMobileOtp(formData.mobileNumber, otp);

            if (isValid) {
                showSuccess('Mobile number verified successfully');
                // Clear OTP related states
                setOtp('');
                setOtpSent(false);
                // You can also disable the mobile number field after verification
                // or mark it as verified in your form state
            } else {
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            showError('Invalid OTP. Please try again.');
            setErrors({ ...errors, otp: 'Invalid OTP. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpVerify = async (otp) => {
        try {
            setIsSubmitting(true);

            // Verify OTP with your backend
            const isValid = await verifyMobileOtp(formData.mobileNumber, otp);

            if (isValid) {
                // On successful verification, move to bank details
                setActiveTab('bank');
                setShowOtp(false);
                showSuccess('Mobile number verified successfully');
            } else {
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            throw new Error('Invalid OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mb-4 px-0">

            {/* Form Area */}
            <div className="form-container border bg-white shadow-sm  " style={{ borderTop: "none", borderRadius: "0 0 10px 10px" }}>
                <div className="text-center text-white fw-semibold py-2 mb-2" style={{ backgroundColor: "#6c757d" }}>
                    Fill Personal Details
                </div>
                {!showOtp ? (
                    activeTab === "personal" && (
                        <form onSubmit={handleSubmit}>
                            <div className="row g-2 p-3 ">
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Applicant Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.applicantName ? 'is-invalid' : ''}`}
                                        name="applicantName"
                                        autoComplete="off"
                                        value={formData.applicantName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.applicantName && <div className="invalid-feedback">{errors.applicantName}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Gender <span className="text-danger">*</span></label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check me-3 mb-0">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Date of Birth <span className="text-danger">*</span></label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                                        name="dateOfBirth"
                                        autoComplete="off"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Email Address <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        autoComplete="off"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Select One <span className="text-danger">*</span></label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="relation"
                                                value="father"
                                                checked={formData.relation === 'father'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Father</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="relation"
                                                value="husband"
                                                checked={formData.relation === 'husband'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Husband</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Father/Husband Name <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold mb-1">Select One <span className="text-danger">*</span></label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="idType"
                                                value="pan"
                                                checked={formData.idType === 'pan'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">PAN</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="idType"
                                                value="drivingLicense"
                                                checked={formData.idType === 'drivingLicense'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">DRIVING LICENSE</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="idType"
                                                value="voterId"
                                                checked={formData.idType === 'voterId'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Voter ID</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="idType"
                                                value="rashanCard"
                                                checked={formData.idType === 'rashanCard'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">RASHAN CARD</label>
                                        </div>

                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">ID No <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Aadhaar Number <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Select Cast <span className="text-danger">*</span></label>
                                    <Select
                                        className={`${errors.cast ? 'is-invalid' : ''}`}
                                        name="cast"
                                        value={castOptions.find(option => option.value === formData.cast) || null}
                                        onChange={(selectedOption) => handleInputChange({
                                            target: {
                                                name: 'cast',
                                                value: selectedOption ? selectedOption.value : ''
                                            }
                                        })}
                                        options={castOptions}
                                        placeholder="--Select Cast--"
                                        isClearable
                                        classNamePrefix="select"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                minHeight: '38px',
                                                height: '38px',
                                            })
                                        }}
                                    />
                                    {errors.cast && <div className="invalid-feedback">{errors.cast}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Mobile Number <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        maxLength="10"
                                    />
                                    {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">ZIP Code <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">City <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">State <span className="text-danger">*</span></label>
                                    <input type="text" value="RAJASTHAN" autoComplete="off" className="form-control" readOnly />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Country <span className="text-danger">*</span></label>
                                    <input type="text" value="INDIA" autoComplete="off" className="form-control" readOnly />
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label fw-semibold mb-1">Permanent Address <span className="text-danger">*</span></label>
                                    <textarea autoComplete="off" className="form-control" rows="1"></textarea>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="sameAddress"
                                            checked={formData.sameAsPermanent}
                                            onChange={handleSameAddressChange}
                                        />
                                        <label className="form-check-label" htmlFor="sameAddress">
                                            Same as above address
                                        </label>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label fw-semibold mb-1">Postal Address <span className="text-danger">*</span></label>
                                    <textarea autoComplete="off" className="form-control" rows="1"></textarea>
                                </div>
                            </div>

                            <div className="text-center mt-3 mb-4">
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: "#A992F7",
                                        border: "none",
                                        fontWeight: "500",
                                        padding: "8px 24px",
                                        borderRadius: "6px",
                                        color: "white",
                                        opacity: isSubmitting ? 0.7 : 1,
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending OTP...' : 'Next →'}
                                </button>
                            </div>
                        </form>
                    )
                ) : (
                    <div className="text-center">
                        <p className="mb-3">We've sent a 6-digit OTP to {formData.mobileNumber}</p>
                        <OtpVerify
                            onBack={() => setShowOtp(false)}
                            onVerify={handleOtpVerify}
                            mobileNumber={formData.mobileNumber}
                            isSubmitting={isSubmitting}
                        />
                        <p className="mt-3">
                            Didn't receive the OTP?
                            <button
                                className="btn btn-link p-0 ms-1"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                Resend OTP
                            </button>
                        </p>
                    </div>
                )}
            </div>

            {activeTab === "bank" && (
                <BankDetailsForm onBack={() => setActiveTab("personal")} />
            )}
        </div>
    );
};

export default PersonalDetailsForm;
