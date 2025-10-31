import React, { useState, useEffect } from "react";
import OtpVerify from "../components/OtpVerify";
import BankDetailsForm from "./BankDetailsForm";
import { showSuccess, showError } from '../utils/toast';
import Select from '../../node_modules/react-select/dist/react-select.esm.js';
import axios from "axios";
import { fetchPostData } from "../components/hooks/Api";
import { Dropdown } from "bootstrap";
import { onChangeDropdown } from "../utils/Comman.js";

const sendOtpToMobile = async (mobileNumber) => {
    return new Promise((resolve) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`OTP for ${mobileNumber}: ${otp}`);
        setTimeout(() => resolve(otp), 1000);
    });
};

const verifyMobileOtp = async (mobileNumber, otp) => {
    return new Promise((resolve) => {
        setTimeout(() => {
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

    // New-State
    const [data, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [cityies, setCityies] = useState([]);
    const [cast, setCast] = useState([]);

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

    //---------------------- Add-Data ----------------------
    const AddSave = async () => {
        try {
            const response = await fetchPostData('User/Insert_User', formData)
            if(response){
                toastifySuccess("Product Details is saved successfully");
                return true;
            }
        } catch (error) {
            toastifyError('Error saving Product Details');
        }
    }

    //---------------------- Dropdowns -----------------------
    const fetchCast = async () => {
        try {
            const response = await fetchPostData('Cast/GetDataDropDown_Cast', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            });
            // console.log(response);

            if (response && Array.isArray(response)) {
                setCast(response);
            } else {
                setCast([]);
            }
        } catch {
            toastifyError('Error fetching States');
        }
    }

    const fetchState = async () => {
        try {
            const response = await fetchPostData('State/GetDataDropDown_State', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            });
            console.log(response);

            if (response && Array.isArray(response)) {
                setStates(response);
            } else {
                setStates([]);
            }
        } catch {
            toastifyError('Error fetching States');
        }
    }

    const fetchCity = async (stateID) => {
        try {
            const response = await fetchPostData('https://api.crushererp.com/api/City/GetDataDropDown_City', {
                StateId: stateID,
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            })
            console.log(response);
            if (response && Array.isArray(response)) {
                setCity(response);
            } else {
                setCity([]);
            }
        } catch {
            toastifyError('Error fetching District');
        }
    }

    useEffect(() => {
        fetchState();
    }, []);

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
                                {/* Applicant-Name */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Applicant Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.applicantName ? 'is-invalid' : ''}`}
                                        name="applicantName"
                                        autoComplete="off"
                                        value={formData.applicantName}
                                        onChange={(e) => setFormData({...formData, applicantName: e.target.value})}
                                    />
                                    {errors.applicantName && <div className="invalid-feedback">{errors.applicantName}</div>}
                                </div>

                                {/* Gender */}
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

                                {/* Date-Of-Birth */}
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

                                {/* Email-Address */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Email Address <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        autoComplete="off"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                {/* Select-One */}
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

                                {/* Father/Husband-Name */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Father/Husband Name <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" value={formData.relationName} onChange={(e) => setFormData({...formData, relationName: e.target.value})}/>
                                </div>

                                {/* ID-Type */}
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

                                {/* ID-No */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">ID No <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                {/* Aadhaar-No */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Aadhaar Number <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                {/* Select-Cast */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Select Cast <span className="text-danger">*</span></label>
                                    <Select
                                        className={`${errors.cast ? 'is-invalid' : ''}`}
                                        name="cast"
                                        value={castOptions.find(option => option.value === formData.cast) || null}
                                        onChange={(event) => onChangeDropdown(event, setFormData, formData, 'cast')}
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

                                {/* Mobile-No */}
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

                                {/* ZIP-Code */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">ZIP Code <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" />
                                </div>

                                {/* State */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">State <span className="text-danger">*</span></label>
                                    <div className="col-xl-9 col-12">
                                        <Select
                                            value={formData.state ?
                                                {
                                                    value: formData.state,
                                                    label: states.find((st) => st.StateID === formData.state)?.StateCode || '',
                                                } : null
                                            }
                                            className="w-full"
                                            placeholder="Select State"
                                            options={states.map((st) => ({
                                                value: st.StateID,
                                                label: st.StateCode,
                                            }))}
                                            onChange={(event) => {
                                                onChangeDropdown(event, setFormData, formData, 'state');
                                                if (stateID) fetchCity(stateID);
                                            }}
                                            isClearable
                                            isSearchable
                                        />
                                    </div>
                                </div>

                                {/* City */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">City <span className="text-danger">*</span></label>
                                    <Select
                                        className="w-full"
                                        placeholder="Select City"
                                        value={formData.city
                                            ? {
                                                value: formData.city,
                                                label: cityies.find((d) => d.CityID === formData.city)?.Description || '',
                                            } : null
                                        }
                                        options={cityies.map((d) => ({
                                            value: d.CityID,
                                            label: d.Description,
                                        }))}
                                        onChange={(selectedOption) => {
                                            onChangeDropdown(selectedOption, setFormData, formData, 'city');
                                        }}
                                        isClearable
                                        isSearchable
                                    />
                                </div>

                                {/* Country */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Country <span className="text-danger">*</span></label>
                                    <input type="text" value="INDIA" autoComplete="off" className="form-control" readOnly />
                                </div>

                                {/* Permanent-Address */}
                                <div className="col-md-12">
                                    <label className="form-label fw-semibold mb-1">Permanent Address <span className="text-danger">*</span></label>
                                    <textarea autoComplete="off" className="form-control" rows="1"></textarea>
                                </div>

                                {/* Same-Address */}
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
                                {/* Postal-Address */}
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
