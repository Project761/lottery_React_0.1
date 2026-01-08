import React, { useState, useEffect } from "react";
import Select from '../../../node_modules/react-select/dist/react-select.esm.js';
import { ChangeArrayFormat, onChangeDropdown, selectValue, formattedDate } from "../../utils/Comman.js";
import { fetchPostData } from "../../components/hooks/Api.js";
import { showError } from "../../utils/toast.js";
import { useFormData } from "../../context/FormDataContext.jsx";
import { useNavigate } from "react-router-dom";

const DemandDraftDetails = () => {
    const CompanyID = localStorage.getItem('companyID') ?? 1
    const navigate = useNavigate();
    const [selectedBank, setSelectedBank] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);
    const { formData, setFormData } = useFormData();
    const [bankDetails, setBankDetails] = useState([]);
    const [fileObject, setFileObject] = useState(null);
    const [amount, setAmount] = useState([]);
    const [isPaymentAttachmentChanged, setIsPaymentAttachmentChanged] = useState(false);
    const [demandDraft, setDemandDraft] = useState([]);
    const [registerDate, setRegisterDate] = useState("");
    const [images, setImages] = useState([]);

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

    const fetchAmount = async () => {
        try {
            const response = await fetchPostData('Amount/GetDataDropDown_Amount', {
                // CompanyId: Number(localStorage.getItem('companyID')),
                CompanyID: localStorage.getItem('companyID') || 1,
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

    // Demand Draft / Online Payment Date-Valiadation
    const getRegistrationDate = async () => {
        try {
            const resp = await fetchPostData("Button/GETALL_BUTTON", {
                "CompanyID": localStorage.getItem("companyID") || 1
            });
            if (resp?.length) {
                const regData = resp[0]?.FromStartDtTm;
                const formateddate = formattedDate(regData);
                setRegisterDate(formateddate);
                // setButtonId(resp[0]?.ButtonID);
            }
        } catch (error) {
            console.log(error);
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
        getRegistrationDate();
        // console.log(formattedDate(formData.PaymentDate));
        // console.log(registerDate);
    }, []);

    const handleNext = (e) => {
        e.preventDefault();

        const requiredFields = [
            "PaymentTrasnum",
            "PaymentDate",
            "PaymentBank",
            "BankAmount",
            // "PaymentAttachement"
        ];

        const emptyFields = requiredFields.filter(field => !formData[field] || formData[field] === "");

        if (emptyFields.length > 0) {
            showError("Please fill all mandatory Fields");
            return;
        }

        navigate("/income-details");
    };

    const onBack = () => {
        // navigate("/bank-details");
        navigate("/application-processing-fees");
    }


    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("ButtonDetails/GETALL_ButtonDetails", {
            "IsActive": true,
            "ButtonType": "PAYMENTQRCODE IMAGE",
            "CompanyID": localStorage.getItem('companyID') || 1,
        });
        setImages(response)
        // console.log("🚀 ~ getPaperImage ~ response:", response)
    }

    return (
        <div className="container px-0 ">
            {/* Section Header */}
            <div className="text-center text-white fw-semibold py-1" style={{ backgroundColor: "#6c757d" }}>
                Fill Demand Draft Details
            </div>

            {/* Bank Info Bar */}
            {/* <div className="text-center text-white py-1" style={{ backgroundColor: "#6c757d", fontSize: "14px" }}>
                <div className="row g-3 align-items-center">
                    <div className="col-md-12">
                        <span className="me-2">Bank Name: <b>HDFC Bank</b></span>
                        <span className="me-3">A/C Name: <b>New Path Developers LLP</b></span>
                        <span className="me-3">A/C Number: <b>50200110010818</b></span>
                        <span>IFSC Code: <b>HDFC0000054</b></span>
                    </div>
                </div>
            </div> */}

            {/* Form */}
            <div className="border p-4 bg-white shadow-sm">
                <form>
                    <div className="row g-3">
                        {/* Demand Draft / Payment Transfer Number */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold mb-1">
                                Demand Draft Number <span className="text-danger">*</span>
                            </label>
                            <input type="text" autoComplete="off" placeholder="Enter No" className="form-control" value={formData.PaymentTrasnum} maxLength="15" onChange={(e) => setFormData({ ...formData, PaymentTrasnum: e.target.value })} />
                        </div>

                        {/* Demand Draft / Online Payment Date */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold mb-1">
                                Demand Draft Date <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                autoComplete="off"
                                className="form-control"
                                value={formData.PaymentDate ? formattedDate(formData.PaymentDate) : ''}
                                onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
                                min={registerDate}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        {/* Select Bank */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              Bank Name <span className="text-danger">*</span>
                            </label>

                            {/* <Select
                                value={selectValue(bankDetails, 'BankID', formData.PaymentBank, 'Description')}
                                className="w-full"
                                placeholder="Select Bank"
                                options={ChangeArrayFormat(bankDetails, 'BankID', 'Description')}
                                onChange={(event) => { onChangeDropdown(event, setFormData, formData, 'PaymentBank'); }}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: '38px',
                                        height: '38px',
                                    })
                                }}
                            /> */}

                            <input type="text" className="form-control" autoComplete="off" placeholder="Enter Bank Name " value={formData.PaymentBank} onChange={(e) => setFormData({ ...formData, PaymentBank: e.target.value })} />
                        </div>

                        {/* Select Amount */}
                        <div className="col-md-4">
                            <label className="form-label fw-semibold">
                                Select Amount <span className="text-danger">*</span>
                            </label>
                            <Select
                                value={selectValue(amount, 'AmountID', formData.BankAmount, 'Description')}
                                className="w-full"
                                placeholder="Select Amount"
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
                                <label className="form-label fw-semibold">Attachment (Scan Copy Of DD)</label>
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

                    {/* <div className="d-flex gap-2 flex-wrap justify-content-center mt-3">
                        {images?.map((item, index) => (
                            <img key={index} src={item?.FilePath} alt="QR Code"
                                style={{
                                    width: "300px", height: "300px", objectFit: "contain", border: "1px solid #ddd", borderRadius: "8px",
                                }}
                            />
                        ))}
                    </div> */}


                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button type="button" className="btn btn-secondary px-4" onClick={onBack}>
                            Back
                        </button>
                        <button type="submit" className="btn text-white px-4" style={{ backgroundColor: "#A992F7" }} onClick={handleNext}>
                            Next
                        </button>
                    </div>

                    <div class="note-texts mt-3">
                        <strong>Note :- </strong>
                        असल डिमाण्ड ड्राफ्ट को आवेदन के साथ संलग्न कर विकासकर्ता के कार्यालय पर सबमिट किया जाना अनिवार्य है।
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DemandDraftDetails;