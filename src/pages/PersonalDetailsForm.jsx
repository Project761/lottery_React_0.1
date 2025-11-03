import React, { useState, useEffect } from "react";
import OtpVerify from "../components/OtpVerify";
import BankDetailsForm from "./BankDetailsForm";
import { showSuccess, showError } from '../utils/toast';
import Select from '../../node_modules/react-select/dist/react-select.esm.js';
import axios from "axios";
import { fetchPostData } from "../components/hooks/Api";
import { Dropdown } from "bootstrap";
import { onChangeDropdown } from "../utils/Comman.js";
import { useFormData } from "../context/FormDataContext.jsx";

const sendOtpToMobile = async (MobileNumber) => {
    try {
        const response = await fetchPostData('SMS/SendMessage', { MobileNo: MobileNumber });
        if (response) {
            showSuccess(`OTP sent to ${MobileNumber}`);
            return true;
        } else {
            showError('Failed to send OTP. Please try again.');
            return false;
        }
    } catch {
        showError('Error sending OTP');
        return false;
        // console.error('Error sending OTP');
    }
};

const verifyMobileOtp = async (MobileNumber, otp) => {
    try {
        const response = await fetchPostData('SMS/Check_Otp', { MobileNo: MobileNumber, Otp: otp });
        // console.log("OTP Verification Response:", response[0]);
        if (response) {
            const table = response[0];
            if (table?.IsValid === 0) {
                return true;
            } else {
                showError('Invalid OTP. Please try again.');
                return false;
            }
        } else {
            showError('Failed to verify OTP. Please try again.');
            return false;
        }
    }
    catch {
        showError('Error verifying OTP');
    }
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
    const [casts, setCasts] = useState([]);

    const {formData, setFormData} = useFormData();
    useEffect(() => {
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
    }, [formData]);

    //---------------------- Add-Data ----------------------
    const AddSave = async () => {
        try {
            const response = await fetchPostData('User/Insert_User', formData)
            if (response) {
                showSuccess("Product Details is saved successfully");
                return true;
            }
        } catch (error) {
            showError('Error saving Product Details');
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
                setCasts(response);
            } else {
                setCasts([]);
            }
        } catch {
            showError('Error fetching States');
        }
    }

    const fetchState = async () => {
        try {
            const response = await fetchPostData('State/GetDataDropDown_State', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            });

            if (response && Array.isArray(response)) {
                setStates(response);
            } else {
                setStates([]);
            }
        } catch {
            showError('Error fetching States');
        }
    }

    const fetchCity = async (stateID) => {
        try {
            const response = await fetchPostData('City/GetDataDropDown_City', {
                StateID: stateID,
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            })
            if (Array.isArray(response)) {
                setCityies(response);
            } else {
                setCityies([]);
            }
        } catch {
            showError('Error fetching District');
        }
    }

    useEffect(() => {
        fetchState();
        fetchCast();
        // AddSave();
    }, []);

    // const validateForm = () => {
    //     const newErrors = {};
    //     const requiredFields = [
    //         'FullName', 'Gender', 'Dob', 'Email', 'NameSelect', 'Fhname',
    //         'Idproof', 'IdproofNo', 'AadharNumber', 'Caste', 'MobileNumber', 'ZipCode',
    //         'City', 'Paraddress'
    //     ];

    //     requiredFields.forEach(field => {
    //         if (!formData[field]) {
    //             newErrors[field] = 'This field is required';
    //         }
    //     });

    //     // Email validation
    //     if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) {
    //         newErrors.Email = 'Please enter a valid Email address';
    //     }

    //     // Mobile number validation
    //     if (formData.MobileNumber && !/^[0-9]{10}$/.test(formData.MobileNumber)) {
    //         newErrors.MobileNumber = 'Please enter a valid 10-digit mobile number';
    //     }

    //     // Aadhaar validation
    //     if (formData.AadharNumber && !/^[0-9]{12}$/.test(formData.AadharNumber)) {
    //         newErrors.AadharNumber = 'Please enter a valid 12-digit Aadhaar number';
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

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
            Posaddress: isChecked,
            postalAddress: isChecked ? formData.Paraddress : ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!validateForm()) {
        //     showError('Please fill all required fields correctly');
        //     return;
        // }

        if (!formData.MobileNumber || formData.MobileNumber.length !== 10) {
            showError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsSubmitting(true);

        try {
            const otpSent = await sendOtpToMobile(formData.MobileNumber);
            if (otpSent) {
                setShowOtp(true);
            }
            // showSuccess(`OTP sent to ${formData.MobileNumber}`);
        } catch (error) {
            showError('Failed to send OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendOtp = async () => {
        if (!formData.MobileNumber || formData.MobileNumber.length !== 10) {
            showError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsSendingOtp(true);
        try {
            // In a real app, call your backend API to send OTP
            const generatedOtp = await sendOtpToMobile(formData.MobileNumber);
            setOtpSent(true);
            showSuccess(`OTP sent to ${formData.MobileNumber}`);
        } catch (error) {
            // console.error('Failed to send OTP:', error);
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
            const isValid = await verifyMobileOtp(formData.MobileNumber, otp);

            if (isValid) {
                showSuccess('Mobile number verified successfully');
                // Clear OTP related states
                setOtp('');
                setOtpSent(false);
                // You can also disable the mobile number field after verification
                // or mark it as verified in your form State
            } else {
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            // console.error('OTP verification failed:', error);
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
            const isValid = await verifyMobileOtp(formData.MobileNumber, otp);

            if (isValid) {
                // On successful verification, move to bank details
                setActiveTab('bank');
                setShowOtp(false);
                showSuccess('Mobile number verified successfully');
            } else {
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            // console.error('OTP verification failed:', error);
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
                                        className={`form-control ${errors.FullName ? 'is-invalid' : ''}`}
                                        name="FullName"
                                        autoComplete="off"
                                        value={formData.FullName}
                                        onChange={(e) => setFormData({ ...formData, FullName: e.target.value })}
                                    />
                                    {errors.FullName && <div className="invalid-feedback">{errors.FullName}</div>}
                                </div>

                                {/* Gender */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Gender <span className="text-danger">*</span></label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check me-3 mb-0">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Gender"
                                                value="male"
                                                checked={formData.Gender === 'male'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Gender"
                                                value="female"
                                                checked={formData.Gender === 'female'}
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
                                        className={`form-control ${errors.Dob ? 'is-invalid' : ''}`}
                                        name="Dob"
                                        autoComplete="off"
                                        value={formData.Dob}
                                        onChange={handleInputChange}
                                        max={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.Dob && <div className="invalid-feedback">{errors.Dob}</div>}
                                </div>

                                {/* Email-Address */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Email Address <span className="text-danger">*</span></label>
                                    <input
                                        type="Email"
                                        className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                                        name="Email"
                                        autoComplete="off"
                                        value={formData.Email}
                                        onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                                    />
                                    {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
                                </div>

                                {/* Select-One */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Select One <span className="text-danger">*</span></label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="NameSelect"
                                                value="father"
                                                checked={formData.NameSelect === 'father'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Father</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="NameSelect"
                                                value="husband"
                                                checked={formData.NameSelect === 'husband'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Husband</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Father/Husband-Name */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Father/Husband Name <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" value={formData.Fhname} onChange={(e) => setFormData({ ...formData, Fhname: e.target.value })} />
                                </div>

                                {/* ID-Type */}
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold mb-1">Select One <span className="text-danger">*</span></label>
                                    <div className="d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Idproof"
                                                value="pan"
                                                checked={formData.Idproof === 'pan'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">PAN</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Idproof"
                                                value="drivingLicense"
                                                checked={formData.Idproof === 'drivingLicense'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">DRIVING LICENSE</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Idproof"
                                                value="voterId"
                                                checked={formData.Idproof === 'voterId'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">Voter ID</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Idproof"
                                                value="rashanCard"
                                                checked={formData.Idproof === 'rashanCard'}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label">RASHAN CARD</label>
                                        </div>

                                    </div>
                                </div>

                                {/* ID-No */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">ID No <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" value={formData.IdproofNo} onChange={(e) => setFormData({ ...formData, IdproofNo: e.target.value })} />
                                </div>

                                {/* Aadhaar-No */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Aadhaar Number <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" value={formData.AadharNumber} onChange={(e) => setFormData({ ...formData, AadharNumber: e.target.value })} />
                                </div>

                                {/* Select-Cast */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Select Cast <span className="text-danger">*</span></label>
                                    <Select
                                        className={`${errors.Caste ? 'is-invalid' : ''}`}
                                        name="Caste"
                                        value={
                                            formData.Caste ?
                                                {
                                                    Value: formData.Caste,
                                                    label: casts.find((c) => c.CastID === formData.Caste)?.Description || '',
                                                } : null
                                        }
                                        onChange={(event) => onChangeDropdown(event, setFormData, formData, 'Caste')}
                                        options={casts.map((c) => ({
                                            value: c.CastID,
                                            label: c.Description,
                                        }))}
                                        placeholder="Select Cast"
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
                                    {errors.Caste && <div className="invalid-feedback">{errors.Caste}</div>}
                                </div>

                                {/* Mobile-No */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">Mobile Number <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.MobileNumber ? 'is-invalid' : ''}`}
                                        name="MobileNumber"
                                        value={formData.MobileNumber}
                                        onChange={(e) => setFormData({ ...formData, MobileNumber: e.target.value })}
                                        maxLength="10"
                                    />
                                    {errors.MobileNumber && <div className="invalid-feedback">{errors.MobileNumber}</div>}
                                </div>

                                {/* ZIP-Code */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">ZIP Code <span className="text-danger">*</span></label>
                                    <input type="text" autoComplete="off" className="form-control" value={formData.ZipCode} onChange={(e) => setFormData({ ...formData, ZipCode: e.target.value })} />
                                </div>

                                {/* State */}
                                <div className="col-md-3">
                                    <label className="form-label fw-semibold mb-1">State <span className="text-danger">*</span></label>
                                    <div className="col-xl-9 col-12">
                                        <Select
                                            value={formData.State ?
                                                {
                                                    value: formData.State,
                                                    label: states.find((st) => st.StateID === formData.State)?.Description || '',
                                                } : null
                                            }
                                            className="w-full"
                                            placeholder="Select State"
                                            options={states.map((st) => ({
                                                value: st.StateID,
                                                label: st.Description,
                                            }))}
                                            onChange={(event) => {
                                                onChangeDropdown(event, setFormData, formData, 'State');
                                                if (event.value) fetchCity(event.value);
                                                // console.log("State selected:", event);
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
                                        value={formData.City
                                            ? {
                                                value: formData.City,
                                                label: cityies.find((d) => d.CityID === formData.City)?.Description || '',
                                            } : null
                                        }
                                        options={cityies.map((d) => ({
                                            value: d.CityID,
                                            label: d.Description,
                                        }))}
                                        onChange={(selectedOption) => {
                                            onChangeDropdown(selectedOption, setFormData, formData, 'City');
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
                                    <textarea autoComplete="off" className="form-control" rows="1" value={formData.Paraddress} onChange={(e) => setFormData({ ...formData, Paraddress: e.target.value })}></textarea>
                                </div>

                                {/* Same-Address */}
                                <div className="col-md-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="sameAddress"
                                            checked={formData.Posaddress}
                                            onChange={(e) => setFormData({ ...formData, Posaddress: e.target.checked, postalAddress: e.target.checked ? formData.Paraddress : '' })}
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
                        <p className="mb-3">We've sent a 6-digit OTP to {formData.MobileNumber}</p>
                        <OtpVerify
                            onBack={() => setShowOtp(false)}
                            onVerify={handleOtpVerify}
                            MobileNumber={formData.MobileNumber}
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

