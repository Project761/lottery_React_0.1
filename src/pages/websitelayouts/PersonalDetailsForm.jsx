import React, { useState, useEffect } from "react";
import { showSuccess, showError } from "../../utils/toast";
import Select from "../../../node_modules/react-select/dist/react-select.esm.js";
import { fetchPostData } from "../../components/hooks/Api";
import { onChangeDropdown, formatTextwithSpace, mobileNoValidation, ChangeArrayFormat, selectValue, handleOnlyAlphabet } from "../../utils/Comman.js";
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
    const [originalMobile, setOriginalMobile] = useState("");
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [isMobileVerified, setIsMobileVerified] = useState(false);

    const { formData, setFormData } = useFormData();
    useEffect(() => {
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
    }, [formData]);

    //---------------------- Dropdowns -----------------------
    const fetchCast = async () => {
        try {
            const response = await fetchPostData("Cast/GetDataDropDown_Cast", {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
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

        const isAnyFieldMissing = requiredFields.some(
            (field) => !formData[field] || formData[field].toString().trim() === ""
        );

        if (isAnyFieldMissing) {
            showError("Please fill all mandatory fields");
            return;
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
    const fetchSingleData = async () => {
        try {
            const userID = localStorage.getItem("UserID");
            const response = await fetchPostData('User/GetSingleData_User', { UserID: userID });
            // console.log("response", response);
            if (response) {
                // console.log(defaultFormStructure);
                const normalizedData = { ...defaultFormStructure, ...response[0] };
                // console.log(normalizedData.PaymentAttachement);
                setFormData(normalizedData);
                localStorage.setItem("applicationFormData", JSON.stringify(normalizedData));
                setOriginalMobile(response[0].MobileNumber || "");
                setIsExistingUser(true);
            } else {
                setIsExistingUser(false);
            }

        } catch (error) {
            showError("Failed to fetch user data.");
        }
    }

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


    const HandleZipCode = (e) => {
        if (e.target.value.length <= 6) {
            setFormData({ ...formData, ZipCode: e.target.value })
        }
    }

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


    // const onChangeDOBDate = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: type === "checkbox" ? checked : value,
    //     });

    //     // Clear error when user starts typing
    //     if (errors[name]) {
    //         setErrors({
    //             ...errors,
    //             [name]: "",
    //         });
    //     }
    // };

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
                        <div className="row g-2 p-3 ">
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

                            {/* Select-Cast */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">Select Cast <span className="text-danger">*</span></label>
                                <Select
                                    className={`${errors.Caste ? 'is-invalid' : ''}`}
                                    name="Caste"
                                    // value={
                                    //     casts.find((c) => String(c.CastID) === String(formData.Caste)) ? {
                                    //         value: String(formData.Caste),
                                    //         label: casts.find((c) => String(c.CastID) === String(formData.Caste))?.Description,
                                    //     } : null
                                    // }
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

                            {/* ZIP-Code */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">ZIP Code <span className="text-danger">*</span></label>
                                <input type="number" autoComplete="off" placeholder="Enter ZIP Code" className="form-control" value={formData.ZipCode} onChange={HandleZipCode} />
                            </div>

                            {/* State */}
                            <div className="col-md-3">
                                <label className="form-label fw-semibold mb-1">State <span className="text-danger">*</span></label>
                                <Select
                                    // value={states.find((s) => String(s.StateID) === String(formData.State)) ?
                                    //     {
                                    //         value: String(formData.State),
                                    //         label: states.find((st) => String(st.StateID) === String(formData.State))?.Description || '',
                                    //     } : null
                                    // }
                                    value={selectValue(states, 'StateID', formData.State, 'Description')}
                                    className="w-full"
                                    placeholder="Select State"
                                    // options={states.map((st) => ({
                                    //     value: st.StateID,
                                    //     label: st.Description,
                                    // }))}
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
                                    // value={cityies.find((c) => String(c.CityID) === String(formData.City))
                                    //     ? {
                                    //         value: String(formData.City),
                                    //         label: cityies.find((d) => String(d.CityID) === String(formData.City))?.Description || '',
                                    //     } : null
                                    // }
                                    value={selectValue(cityies, 'CityID', formData.City, 'Description')}
                                    // options={cityies.map((d) => ({
                                    //     value: d.CityID,
                                    //     label: d.Description,
                                    // }))}
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
                        </div>

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

                        {formData.MobileNumber && showOtp && (
                            <div className="text-center">
                                <p className="mb-3">We've sent a 4-digit OTP to {formData.MobileNumber}</p>
                                <OtpVerify onBack={() => setShowOtp(false)} onVerify={handleOtpVerify} MobileNumber={formData.MobileNumber} isSubmitting={isSubmitting} onResendOtp={() => sendOtpToMobile(formData.MobileNumber)} />
                            </div>
                        )}
                    </form>
                )}
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