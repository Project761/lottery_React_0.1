import React, { useState, useEffect } from "react";
import Select from '../../../node_modules/react-select/dist/react-select.esm.js';
import { ChangeArrayFormat, onChangeDropdown, selectValue } from "../../utils/Comman.js";
import { fetchPostData } from "../../components/hooks/Api.js";
import { showError } from "../../utils/toast.js";
import { useFormData } from "../../context/FormDataContext.jsx";
import { useNavigate } from "react-router-dom";

const DemandDraftDetails = () => {

    const navigate = useNavigate();
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const { formData, setFormData } = useFormData();
    const [bankDetails, setBankDetails] = useState([]);
    const [fileObject, setFileObject] = useState(null);
    const [amount, setAmount] = useState([]);
    const [isPaymentAttachmentChanged, setIsPaymentAttachmentChanged] = useState(false);
    const [demandDraft, setDemandDraft] = useState([]);

    // useEffect(() => {
    //     localStorage.setItem("applicationFormData", JSON.stringify(formData));
    // }, [formData]);

    useEffect(() => {
        const copy = { ...formData };
        delete copy.PaymentAttachement;
        localStorage.setItem("applicationFormData", JSON.stringify(copy));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem("IsPaymentAttachmentChanged", isPaymentAttachmentChanged.toString());
    }, [isPaymentAttachmentChanged]);


    //---------------------- Dropdowns -----------------------
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

    const fetchAmount = async () => {
        try {
            const response = await fetchPostData('Amount/GetDataDropDown_Amount', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: 1,
            });
            // console.log(response);

            if (response && Array.isArray(response)) {
                setAmount(response);
            } else {
                setAmount([]);
            }
        } catch {
            showError('Error fetching Amount Details');
        }
    }

    //-----------Demand-Draft-Attachement----------
    const checkDemandDraftAttach = async () => {
        try {
            const response = await fetchPostData("Button/GETALL_BUTTON", {
                "CompanyID": localStorage.getItem('companyID') || 1,
                "ButtonType": 'Demand Draft Attachment'
            });
            console.log(response);
            if (response?.length) {
                setDemandDraft(response[0]?.AppRegPermission);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchBankDetails();
        fetchAmount();
        checkDemandDraftAttach();
    }, []);

    const handleNext = (e) => {
        e.preventDefault();

        const requiredFields = [
            "PaymentTrasnum",
            "PaymentDate",
            "PaymentBank",
            "BankAmount",
            "PaymentAttachement"
        ];

        const emptyFields = requiredFields.filter(field => !formData[field] || formData[field] === "");

        if (emptyFields.length > 0) {
            showError("Please fill all mandatory Fields");
            return;
        }

        navigate("/income-details");
    };

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

    const onBack = () => {
        navigate("/bank-details");
    }

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
                            <label className="form-label fw-semibold mb-1">
                                Demand Draft / Payment Transfer Number <span className="text-danger">*</span>
                            </label>
                            <input type="number" autoComplete="off" placeholder="Enter No" className="form-control" value={formData.PaymentTrasnum} onChange={(e) => setFormData({ ...formData, PaymentTrasnum: e.target.value })} />
                        </div>

                        {/* Demand Draft / Online Payment Date */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold mb-1">
                                Demand Draft / Online Payment Date <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                autoComplete="off"
                                className="form-control"
                                value={formData.PaymentDate ? new Date(formData.PaymentDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        {/* Select Bank */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Select Bank <span className="text-danger">*</span>
                            </label>

                            <Select
                                // value={bankDetails.find((b) => String(b.BankID) === String(formData.PaymentBank)) ?
                                //     {
                                //         value: formData.PaymentBank,
                                //         label: bankDetails.find((b) => String(b.BankID) === String(formData.PaymentBank))?.Description || ''
                                //     } : null
                                // }
                                value={selectValue(bankDetails, 'BankID', formData.PaymentBank, 'Description')}
                                className="w-full"
                                placeholder="Select Bank"
                                // options={bankDetails.map((b) => ({
                                //     value: b.BankID,
                                //     label: b.Description
                                // }))}
                                options={ChangeArrayFormat(bankDetails, 'BankID', 'Description')}
                                onChange={(event) => { onChangeDropdown(event, setFormData, formData, 'PaymentBank'); }}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: '38px',
                                        height: '38px',
                                    })
                                }}
                            />
                        </div>

                        {/* Select Amount */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Select Amount <span className="text-danger">*</span>
                            </label>
                            <Select
                                //   value = {amount.find((a) => String(a.AmountID) === String(formData.BankAmount)) ?
                                //     {
                                //         value: String(formData.BankAmount),
                                //         label: amount.find((a) => String(a.AmountID) === String(formData.BankAmount))?.Description || ''
                                //     } : null
                                //   }
                                value={selectValue(amount, 'AmountID', formData.BankAmount, 'Description')}
                                className="w-full"
                                placeholder="Select Amount"
                                //   options={amount.map((a) => ({
                                //     value: a.AmountID,
                                //     label: a.Description
                                //   }))}
                                options={ChangeArrayFormat(amount, 'AmountID', 'Description')}
                                onChange={(event) => {
                                    onChangeDropdown(event, setFormData, formData, 'BankAmount');
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

                        {/* Attachment */}
                        {/* <div className="col-md-4">
                            <label className="form-label fw-semibold">Attachment</label>
                            <input type="file" autoComplete="off" className="form-control" accept=".jpg, .jpeg, .png, .pdf"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    // console.log(file);
                                    // alert("Hello");
                                    if (file) {
                                        setFormData({ ...formData, PaymentAttachement: file })
                                        setFileObject(file);
                                        setIsPaymentAttachmentChanged(true);
                                    }
                                }} />
                            {
                                formData.PaymentAttachement && (
                                    <span>
                                        Uploaded file: <span>{formData.PaymentAttachement?.name || formData.PaymentAttachement}</span>
                                    </span>
                                )
                            }
                        </div> */}
                        {demandDraft ? (
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Attachment</label>
                                <input type="file" autoComplete="off" className="form-control" accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        // console.log(file);
                                        if (file) {
                                            setFormData({ ...formData, PaymentAttachement: file })
                                            setFileObject(file);
                                            setIsPaymentAttachmentChanged(true);
                                        }
                                    }} />
                                {
                                    formData.PaymentAttachement && (
                                        <span>
                                            Uploaded file: <span>{formData.PaymentAttachement?.name || formData.PaymentAttachement}</span>
                                        </span>
                                    )
                                }
                            </div>) : ""
                        }
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button type="button" className="btn btn-secondary px-4" onClick={onBack}>
                            Back
                        </button>
                        <button type="submit" className="btn text-white px-4" style={{ backgroundColor: "#A992F7" }} onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DemandDraftDetails;