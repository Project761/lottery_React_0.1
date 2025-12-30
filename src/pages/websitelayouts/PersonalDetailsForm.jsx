//In this tell me so that our top condition will work

import React, { useState, useEffect } from "react";
import { showSuccess, showError } from "../../utils/toast";
import Select from "../../../node_modules/react-select/dist/react-select.esm.js";
import { fetchPostData } from "../../components/hooks/Api";
import { onChangeDropdown, formatTextwithSpace, mobileNoValidation, ChangeArrayFormat, selectValue, handleOnlyAlphabet, onlyDigitsWithLimit } from "../../utils/Comman.js";
import { useFormData } from "../../context/FormDataContext.jsx";
import { defaultFormStructure } from "../../context/FormDataContext";
import { useNavigate } from "react-router-dom";
import OtpVerify from "../../components/website/OtpVerify.jsx";
import BankDetailsForm from "./BankDetailsForm.jsx";

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
            if (table?.IsValid === 1) {
                return true;
            } else if (table?.Message === "OTP expired") {
                showError("Your OTP Expired. Please try again.");
                return false;
            }
            else {
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
    const [errors, setErrors] = useState({});
    const Navigate = useNavigate();

    // New-State
    const [states, setStates] = useState([]);
    const [cityies, setCityies] = useState([]);
    const [casts, setCasts] = useState([]);

    const [sameAddress, setSameAddress] = useState(() => {
        try {
            const saved = localStorage.getItem("sameAddress");
            if (saved === null || saved == "undefined") return false;
            return JSON.parse(saved);
        } catch {
            return false;
        }
    }
    );

    const [coAppliAddress, setCoAppliAddress] = useState(() => {
        try {
            const saved = localStorage.getItem("coAppliAddress");
            if (saved === null || saved == "undefined") return false;
            return JSON.parse(saved);
        } catch {
            return false;
        }
    }
    );
    const [originalMobile, setOriginalMobile] = useState("");
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const [coapplicantAdd, setCoApplicantAdd] = useState(false);

    const { formData, setFormData } = useFormData();
    useEffect(() => {
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
    }, [formData]);

    //---------------------- Dropdowns -----------------------
    const fetchCast = async () => {
        try {
            const response = await fetchPostData("Cast/GetDataDropDown_Cast", {
                CompanyId: Number(localStorage.getItem('companyID')) || 1,
                // CompanyID: 1,
            });

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
                CompanyId: localStorage.getItem('companyID') || 1,
                // CompanyID: 1,
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
                CompanyID: localStorage.getItem('companyID') || 1,
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
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            "FullName", "Gender", "Dob", "Email", "NameSelect", "Fhname", "Idproof", "IdproofNo",
            "AadharNumber", "Caste", "MobileNumber", "ZipCode", "State", "City", "Paraddress", "Posaddress"
        ];

        const coapplicantRequiredFields = [
            "CoapplicantName", "CoGender", "CoDob", "CoEmail", "CoNameSelect", "CoFhname", "CoIdproof", "CoIdproofNo",
            "CoAadharNumber", "CoCaste", "CoMobileNumber", "CoZipCode", "CoState", "CoCity", "CoParaddress", "CoPosaddress"
        ];

        const isAnyFieldMissing = requiredFields.some(
            (field) => !formData[field] || formData[field].toString().trim() === ""
        );

        if (isAnyFieldMissing) {
            showError("Please fill all mandatory fields");
            return;
        }

        const coAppliData = JSON.parse(localStorage.getItem("coApplicantData") || "false");
        if (coAppliData) {
            const isFieldMissing = coapplicantRequiredFields.some(
                (field) => !formData[field] || formData[field].toString().trim() === ""
            );

            if (isFieldMissing) {
                showError("Please fill all mandatory fields");
                return;
            }
        }

        if (formData.Email && formData.Email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
            showError('Please enter a valid Email Address');
            return;
        }

        if (!formData.MobileNumber || formData.MobileNumber.length !== 10) {
            showError("Please enter a valid 10-digit Mobile Number");
            return;
        }

        // if (formData.AadharNumber && !/^[0-9]{12}$/.test(formData.AadharNumber)) {
        //     showError('Please enter a valid 12-digit Aadhaar number');
        //     return;
        // }

        if (isMobileVerified && formData.MobileNumber === originalMobile) {
            //   setActiveTab("bank");
            Navigate('/bank-details');
            return;
        }

        //New user (Insert)
        if (!isExistingUser) {
            try {
                setIsSubmitting(true);
                const otpSent = await sendOtpToMobile(formData.MobileNumber);
                if (otpSent) setShowOtp(true);
            } catch {
                showError("Failed to send OTP. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        //Existing user (Update)
        if (formData.MobileNumber !== originalMobile) {
            try {
                setIsSubmitting(true);
                const otpSent = await sendOtpToMobile(formData.MobileNumber);
                if (otpSent) setShowOtp(true);
            } catch {
                showError("Failed to send OTP. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // No change → skip OTP → go to next tab
            // setActiveTab("bank");
            Navigate('/bank-details');
        }
    };

    const handleOtpVerify = async (otp) => {
        try {
            setIsSubmitting(true);

            const isValid = await verifyMobileOtp(formData.MobileNumber, otp);
            if (isValid) {
                // setActiveTab('bank');
                Navigate('/bank-details')
                setShowOtp(false);
                setIsMobileVerified(true);
                setOriginalMobile(formData.MobileNumber);
                localStorage.setItem("verifiedMobile", formData.MobileNumber);
                showSuccess('Mobile number verified successfully');
            } else {
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            throw new Error('Invalid OTP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const userID = localStorage.getItem("UserID");
        // alert("Hello" + userID);
        if (userID) {
            fetchSingleData();
        }
    }, []);

    // getSingleData_API
    // const fetchSingleData = async () => {
    //     try {
    //         const userID = localStorage.getItem("UserID");
    //         const response = await fetchPostData('User/GetSingleData_User', { UserID: userID });
    //         // console.log("response", response);
    //         if (response) {
    //             // console.log(defaultFormStructure);
    //             const normalizedData = { ...defaultFormStructure, ...response[0] };
    //             // console.log(normalizedData.PaymentAttachement);
    //             setFormData(normalizedData);
    //             localStorage.setItem("applicationFormData", JSON.stringify(normalizedData));
    //             setOriginalMobile(response[0].MobileNumber || "");
    //             setIsExistingUser(true);
    //         } else {
    //             setIsExistingUser(false);
    //         }

    //     } catch (error) {
    //         showError("Failed to fetch user data.");
    //     }
    // }
    // getSingleData_API
    const fetchSingleData = async () => {
        try {
            const userID = localStorage.getItem("UserID");
            const response = await fetchPostData('User/GetSingleData_User', { UserID: userID });

            if (response) {
                const data = { ...defaultFormStructure, ...response[0] };
                setFormData(data);
                localStorage.setItem("applicationFormData", JSON.stringify(data));

                setOriginalMobile(response[0].MobileNumber || "");
                setIsExistingUser(true);

                if (response[0].CoapplicantName && response[0].CoapplicantName.trim() !== "") {
                    setCoApplicantAdd(true);
                    localStorage.setItem("coApplicantData", JSON.stringify(true));
                } else {
                    setCoApplicantAdd(false);
                }
            } else {
                setIsExistingUser(false);
            }
        } catch (error) {
            showError("Failed to fetch user data.");
        }
    };

    //Update-address when typing
    useEffect(() => {
        if (sameAddress) {
            setFormData((prev) => ({
                ...prev,
                Posaddress: prev.Paraddress
            }))
        }
    }, [formData.Paraddress, sameAddress])

    useEffect(() => {
        localStorage.setItem("sameAddress", JSON.stringify(sameAddress))
    }, [sameAddress])

    //Update co-applicant address when typing
    useEffect(() => {
        if (coAppliAddress) {
            setFormData((prev) => ({
                ...prev,
                CoPosaddress: prev.CoParaddress
            }))
        }
    }, [formData.CoParaddress, coAppliAddress])

    useEffect(() => {
        localStorage.setItem("coAppliAddress", JSON.stringify(coAppliAddress))
    }, [coAppliAddress])


    useEffect(() => {
        if (formData.State) {
            fetchCity(formData.State)
        }
    }, [formData.State]);

    useEffect(() => {
        const verifiedMobile = localStorage.getItem("verifiedMobile");
        if (verifiedMobile) {
            setIsMobileVerified(true);
            setOriginalMobile(verifiedMobile);
        }
    }, []);

    const onChangeDOBDate = (e) => {
        const { name, value } = e.target;
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date("1930-01-01");

        // Validation
        let errorMessage = "";
        if (selectedDate < minDate) {
            errorMessage = "Date of Birth cannot be earlier than 01/01/1930.";
        } else if (selectedDate > today) {
            errorMessage = "Date of Birth cannot be in the future.";
        }

        // Update form data and errors
        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: errorMessage,
        });
    };

    return (
        <div className="container mb-4 px-0">

            {/* Form Area */}
            <div className="form-container border bg-white shadow-sm  " style={{ borderTop: "none", borderRadius: "0 0 10px 10px" }}>
                <div className="text-center text-white fw-semibold py-2 mb-2" style={{ backgroundColor: "#6c757d" }}>
                    Fill Personal Details
                </div>
                {/* {!showOtp ? ( */}
                {activeTab === "personal" && (
                    <form>
                        <div className="row g-2 p-3 pb-0 align-items-center ">
                            {/* Applicant-Name */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">Applicant Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.FullName ? 'is-invalid' : ''}`}
                                    name="FullName"
                                    autoComplete="off"
                                    placeholder="Enter Full Name"
                                    value={formData.FullName}
                                    maxLength="30"
                                    onChange={(e) => setFormData({ ...formData, FullName: handleOnlyAlphabet(e.target.value) })}
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
                                    onChange={onChangeDOBDate}
                                    min="1930-01-01"
                                    max={new Date().toISOString().split('T')[0]}
                                />

                                {/* <input
                                    type="date"
                                    className={`form-control ${errors.Dob ? 'is-invalid' : ''}`}
                                    name="Dob"
                                    autoComplete="off"
                                    value={formData.Dob}
                                    onChange={onChangeDOBDate}
                                    max={new Date().toISOString().split('T')[0]}
                                /> */}
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
                                    placeholder="Enter Email address"
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
                                <input type="text" autoComplete="off" className="form-control" placeholder="Enter Name" maxLength="30" value={formData.Fhname} onChange={(e) => setFormData({ ...formData, Fhname: handleOnlyAlphabet(e.target.value) })} />
                            </div>

                            {/* Select-Cast */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">Select Cast <span className="text-danger">*</span></label>
                                <Select
                                    className={`${errors.Caste ? 'is-invalid' : ''}`}
                                    name="Caste"
                                    value={selectValue(casts, 'CastID', formData.Caste, 'Description')}
                                    onChange={(event) => onChangeDropdown(event, setFormData, formData, 'Caste')}
                                    options={ChangeArrayFormat(casts, 'CastID', 'Description')}
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
                                    type="number"
                                    className={`form-control ${errors.MobileNumber ? 'is-invalid' : ''}`}
                                    name="MobileNumber"
                                    placeholder="Enter Mobile No"
                                    value={formData.MobileNumber}
                                    onChange={(e) => {
                                        const formattedMobile = mobileNoValidation(e.target.value);
                                        setFormData({ ...formData, MobileNumber: formattedMobile })
                                    }}
                                    maxLength="10"
                                />
                                {errors.MobileNumber && <div className="invalid-feedback">{errors.MobileNumber}</div>}
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
                                        <label className="form-check-label">Driving Licence</label>
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
                                        <label className="form-check-label">Ration card</label>
                                    </div>

                                </div>
                            </div>

                            {/* ID-No */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">ID No <span className="text-danger">*</span></label>
                                <input type="text" autoComplete="off" placeholder="Enter ID No" className="form-control" value={formData.IdproofNo} onChange={(e) => setFormData({ ...formData, IdproofNo: e.target.value })} />
                            </div>

                            {/* Aadhaar-No */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">Aadhaar Number <span className="text-danger">*</span></label>
                                <input type="text" autoComplete="off" placeholder="Enter Aadhaar No" className="form-control" value={formData.AadharNumber}
                                    onChange={(e) => {
                                        const formatted = formatTextwithSpace(e.target.value);
                                        setFormData({ ...formData, AadharNumber: formatted })
                                    }} maxLength="14" />
                            </div>

                            {/* ZIP-Code */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">ZIP Code <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Enter ZIP Code"
                                    className="form-control"
                                    maxLength="6"
                                    value={formData.ZipCode}
                                    onChange={(e) => setFormData({ ...formData, ZipCode: onlyDigitsWithLimit(e.target.value, 6) })}
                                />
                            </div>

                            {/* State */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">State <span className="text-danger">*</span></label>
                                <Select
                                    value={selectValue(states, 'StateID', formData.State, 'Description')}
                                    className="w-full"
                                    placeholder="Select State"
                                    options={ChangeArrayFormat(states, 'StateID', 'Description')}
                                    default={formData.State}
                                    onChange={(event) => {
                                        onChangeDropdown(event, setFormData, formData, 'State');
                                        if (event.value) fetchCity(event.value);
                                        setFormData((prev) => ({
                                            ...prev,
                                            City: ''
                                        }))
                                    }}
                                    isClearable
                                    isSearchable
                                />
                            </div>

                            {/* City */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">City <span className="text-danger">*</span></label>
                                <Select
                                    className="w-full"
                                    placeholder="Select City"
                                    value={selectValue(cityies, 'CityID', formData.City, 'Description')}
                                    options={ChangeArrayFormat(cityies, 'CityID', 'Description')}
                                    onChange={(selectedOption) => {
                                        onChangeDropdown(selectedOption, setFormData, formData, 'City');
                                    }}
                                    isClearable
                                    isSearchable
                                />
                            </div>

                            {/* Country */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">
                                    Country <span className="text-danger">*</span>
                                </label>
                                <input type="text" value="INDIA" autoComplete="off" className="form-control" readOnly disabled={true} />
                            </div>

                            {/* Permanent-Address */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold mb-1">Permanent Address <span className="text-danger">*</span></label>
                                <textarea autoComplete="off" className="form-control" placeholder="Enter Permanent Address" rows="1" value={formData.Paraddress} onChange={(e) => setFormData({ ...formData, Paraddress: e.target.value })}></textarea>
                            </div>

                            {/* Same-Address */}
                            <div className="col-md-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="sameAddress"
                                        checked={sameAddress}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setSameAddress(checked);
                                            if (checked) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    Posaddress: prev.Paraddress
                                                }))
                                            } else {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    Posaddress: ""
                                                }))
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="sameAddress">
                                        Same as above address
                                    </label>
                                </div>
                            </div>

                            {/* Postal-Address */}
                            <div className="col-md-12">
                                <label className="form-label fw-semibold mb-1">Postal Address <span className="text-danger">*</span></label>
                                <textarea autoComplete="off" className="form-control" placeholder="Enter Postal Address" rows="1" value={formData.Posaddress} onChange={(e) => setFormData({ ...formData, Posaddress: e.target.value })}></textarea>
                            </div>

                            {/* Co-Applicant-Check_Box */}
                            <div className="col-md-12 mt-4 pt-2" style={{ borderTop: "1px solid #ccc" }}>
                                <label className="form-label fw-semibold mb-2 mr-2">Co-Applicant Name</label><b />
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="sameAddress"
                                    checked={coapplicantAdd}
                                    onChange={(e) => {
                                        setCoApplicantAdd(e.target.checked)
                                        localStorage.setItem("coApplicantData", JSON.stringify(e.target.checked));
                                    }}
                                />
                            </div>
                        </div>






                        {formData.MobileNumber && showOtp && (
                            <div className="text-center">
                                <p className="mb-3">We've sent a 4-digit OTP to {formData.MobileNumber}</p>
                                <OtpVerify onBack={() => setShowOtp(false)} onVerify={handleOtpVerify} MobileNumber={formData.MobileNumber} isSubmitting={isSubmitting} onResendOtp={() => sendOtpToMobile(formData.MobileNumber)} />
                            </div>
                        )}
                    </form>
                )}


                {coapplicantAdd && (
                    <div className="row g-2 p-3">
                        {/* Co-Applicant Name */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Applicant Name *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.CoapplicantName}
                                placeholder="Enter Co-Applicant Name"
                                maxLength="30"
                                onChange={(e) =>
                                    setFormData({ ...formData, CoapplicantName: handleOnlyAlphabet(e.target.value) })
                                }
                            />
                        </div>

                        {/* Co-Gender */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Gender *</label>
                            <div className="d-flex">
                                <div className="form-check me-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="CoGender"
                                        value="male"
                                        checked={formData.CoGender === 'male'}
                                        onChange={(e) => setFormData({ ...formData, CoGender: e.target.value })}
                                    />
                                    <label className="form-check-label">Male</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="CoGender"
                                        value="female"
                                        checked={formData.CoGender === 'female'}
                                        onChange={(e) => setFormData({ ...formData, CoGender: e.target.value })}
                                    />
                                    <label className="form-check-label">Female</label>
                                </div>
                            </div>
                        </div>

                        {/* Co-DOB */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Date of Birth *</label>
                            <input
                                type="date"
                                className="form-control"
                                value={formData.CoDob}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setFormData({ ...formData, CoDob: e.target.value })}
                            />
                        </div>

                        {/* Co-Email */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Email *</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Co-Applicant Email"
                                value={formData.CoEmail}
                                onChange={(e) => setFormData({ ...formData, CoEmail: e.target.value })}
                            />
                        </div>

                        {/* Co-Father / Husband */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Select One *</label>
                            <div className="d-flex">
                                <div className="form-check me-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="CoNameSelect"
                                        value="father"
                                        checked={formData.CoNameSelect === 'father'}
                                        onChange={(e) => setFormData({ ...formData, CoNameSelect: e.target.value })}
                                    />
                                    <label className="form-check-label">Father</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="CoNameSelect"
                                        value="husband"
                                        checked={formData.CoNameSelect === 'husband'}
                                        onChange={(e) => setFormData({ ...formData, CoNameSelect: e.target.value })}
                                    />
                                    <label className="form-check-label">Husband</label>
                                </div>
                            </div>
                        </div>

                        {/* Co-Father / Husband Name */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Father/Husband Name *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.CoFhname}
                                maxLength="30"
                                placeholder="Enter Co-Father/Husband Name"
                                onChange={(e) =>
                                    setFormData({ ...formData, CoFhname: handleOnlyAlphabet(e.target.value) })
                                }
                            />
                        </div>

                        {/* Co-Caste */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Caste *</label>
                            <Select
                                value={selectValue(casts, 'CastID', formData.CoCaste, 'Description')}
                                onChange={(e) => onChangeDropdown(e, setFormData, formData, 'CoCaste')}
                                options={ChangeArrayFormat(casts, 'CastID', 'Description')}
                                isClearable
                            />
                        </div>
                        {/* Co-Mobile */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Mobile *</label>
                            <input
                                type="text"
                                maxLength="10"
                                className="form-control"
                                value={formData.CoMobileNumber}
                                placeholder="Enter Co-Mobile Number"
                                onChange={(e) =>
                                    setFormData({ ...formData, CoMobileNumber: mobileNoValidation(e.target.value) })
                                }
                            />
                        </div>

                        {/* Co-ID Proof */}
                        <div className="col-md-6">
                            <label className="form-label fw-semibold d-block">ID Proof *</label>
                            {['PAN', 'Driving License', 'Voter ID', 'Rashan Card'].map((id) => (
                                <div className="form-check form-check-inline" key={id}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="CoIdproof"
                                        value={id}
                                        checked={formData.CoIdproof === id}
                                        onChange={(e) => setFormData({ ...formData, CoIdproof: e.target.value })}
                                    />
                                    <label className="form-check-label">{id}</label>
                                </div>
                            ))}
                        </div>

                        {/* Co-ID No */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">ID No *</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.CoIdproofNo}
                                placeholder="Enter Co-ID No"
                                onChange={(e) => setFormData({ ...formData, CoIdproofNo: e.target.value })}
                            />
                        </div>

                        {/* Co-Aadhaar */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Aadhaar *</label>
                            <input
                                type="text"
                                maxLength="14"
                                className="form-control"
                                value={formData.CoAadharNumber}
                                placeholder="Enter Co-Aadhaar"
                                onChange={(e) =>
                                    setFormData({ ...formData, CoAadharNumber: formatTextwithSpace(e.target.value) })
                                }
                            />
                        </div>



                        {/* Co-ZIP */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">ZIP *</label>
                            <input
                                type="text"
                                maxLength="6"
                                className="form-control"
                                value={formData.CoZipCode}
                                placeholder="Enter Co-ZIP"
                                onChange={(e) =>
                                    setFormData({ ...formData, CoZipCode: onlyDigitsWithLimit(e.target.value, 6) })
                                }
                            />
                        </div>

                        {/* Co-State */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">State *</label>
                            <Select
                                value={selectValue(states, 'StateID', formData.CoState, 'Description')}
                                options={ChangeArrayFormat(states, 'StateID', 'Description')}
                                onChange={(e) => {
                                    onChangeDropdown(e, setFormData, formData, 'CoState');
                                    fetchCity(e.value);
                                    setFormData(prev => ({ ...prev, CoCity: null }));
                                }}
                                isClearable
                            />
                        </div>

                        {/* Co-City */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">City *</label>
                            <Select
                                value={selectValue(cityies, 'CityID', formData.CoCity, 'Description')}
                                options={ChangeArrayFormat(cityies, 'CityID', 'Description')}
                                onChange={(e) => onChangeDropdown(e, setFormData, formData, 'CoCity')}
                                isClearable
                            />
                        </div>

                        {/* Co-Country */}
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Country</label>
                            <input className="form-control" value="INDIA" disabled />
                        </div>

                        {/* Co-Address */}
                        <div className="col-md-12">
                            <label className="form-label fw-semibold">Permanent Address *</label>
                            <textarea
                                className="form-control"
                                value={formData.CoParaddress}
                                rows="1"
                                placeholder="Enter Co-Permanent Address"
                                onChange={(e) => setFormData({ ...formData, CoParaddress: e.target.value })}
                            />
                        </div>

                        <div className="col-md-12">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={coAppliAddress}
                                    onChange={(e) => {
                                        setCoAppliAddress(e.target.checked);
                                        setFormData(prev => ({
                                            ...prev,
                                            CoPosaddress: e.target.checked ? prev.CoParaddress : ''
                                        }));
                                    }}
                                />
                                <label className="form-check-label">Same as above</label>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label fw-semibold">Postal Address *</label>
                            <textarea
                                className="form-control"
                                value={formData.CoPosaddress}
                                placeholder="Enter Co-Postal Address"
                                rows="1"
                                onChange={(e) => setFormData({ ...formData, CoPosaddress: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                <div className="text-center mt-3 mb-4">
                    <button
                        type="submit"
                        onClick={handleSubmit}
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


            </div>


            {
                activeTab === "bank" && (
                    <BankDetailsForm onBack={() => setActiveTab("personal")} />
                )
            }
        </div >
    );
};

export default PersonalDetailsForm;

//In this tell me so that our top condition will work