import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataContext.jsx";
import { showError, showSuccess } from "../../utils/toast.js";
import { fetchPostData } from "../../components/hooks/Api.js";

const ApplicationProcessingFees = () => {
    const CompanyID = localStorage.getItem('companyID') ?? 1
    const navigate = useNavigate();
    const { formData, setFormData } = useFormData();
    const [isAppliFeeAttach, setIsAppliFeeAttach] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const copy = { ...formData };
        delete copy.PaymentAttachement;
        localStorage.setItem("applicationFormData", JSON.stringify(copy));
    }, [formData]);

    useEffect(() => {
        localStorage.setItem("IsAppliFeeAttach", isAppliFeeAttach.toString());
    }, [isAppliFeeAttach]);

    const handleNext = () => {
        const requiredFields = [
            "ApplicationFeePaymentRefNum",
            "ApplicationFeePaymentDate"
        ];

        const isAnyFieldMissing = requiredFields.some(
            (field) =>
                !formData[field] || formData[field].toString().trim() === ""
        );

        if (isAnyFieldMissing) {
            showError("Please fill all mandatory Fields");
            return;
        }

        navigate("/dd-details");
    };

    const onBack = () => {
        navigate("/bank-details");
    }



    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("ButtonDetails/GETALL_ButtonDetails", {
            "IsActive": true,
            "ButtonType": "APPLICATION PROCESSING FEES",
            "CompanyID": localStorage.getItem('companyID') || 1,
        });
        setImages(response)
        // console.log("🚀 ~ getPaperImage ~ response:", response)
    }





    return (
        <div className="container px-0">
            <div className="card shadow-sm">
                <div className="text-center text-white fw-semibold py-1 mb-2" style={{ backgroundColor: "#6c757d" }}>
                    Application Processing Fee
                </div>


                <div className="text-center text-dark fw-semibold py-1 mb-2" style={{ backgroundColor: "#ffc107", color: "#000" }}>
                    Application Fee: ₹500
                </div>

                <div className="card-body">
                    <form>
                        <div className="row g-3">

                            {/* Payment-Reference Number */}
                            <div className="col-md-6">
                                <label className="form-label"> Payment Reference Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="applicationId"
                                    value={formData.ApplicationFeePaymentRefNum}
                                    onChange={(e) => setFormData({ ...formData, ApplicationFeePaymentRefNum: e.target.value })}
                                    required
                                    placeholder="Enter transfer number"
                                />
                            </div>

                            {/* Payment Date */}
                            <div className="col-md-6">
                                <label className="form-label"> Online Payment Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="paymentDate"
                                    value={formData.ApplicationFeePaymentDate}
                                    onChange={(e) => setFormData({ ...formData, ApplicationFeePaymentDate: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Payment Attachment */}
                            <div className="col-md-4">
                                <label className="form-label fw-semibold">Payment Proof</label>
                                <input type="file" autoComplete="off" className="form-control" accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        // console.log(file);
                                        if (file) {
                                            setFormData({ ...formData, ApplicationFeeAttachment: file })
                                            setFileObject(file);
                                            setIsAppliFeeAttach(true);
                                        }
                                    }} />
                                {
                                    formData.ApplicationFeeAttachment && (
                                        <span>
                                            Uploaded file: <span>{formData.ApplicationFeeAttachment?.name || formData.ApplicationFeeAttachment}</span>
                                        </span>
                                    )
                                }
                            </div>

                            <div className="d-flex gap-2 flex-wrap justify-content-center mt-3">
                                {images?.map((item, index) => (
                                    <img key={index} src={item?.FilePath} alt="Application Processing Fees"
                                        style={{
                                            width: "300px", height: "300px", objectFit: "contain", border: "1px solid #ddd", borderRadius: "8px",
                                        }}
                                    />
                                ))}
                            </div>  

                        </div>

                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button type="button" className="btn btn-secondary px-4" onClick={onBack}> Back </button>
                            <button type="button" className="btn text-white px-4" style={{ backgroundColor: "#A992F7" }} onClick={handleNext}> Next </button>
                        </div>

                        <div class="note-texts mt-3">
                            <strong>Notes : -</strong> आवेदनकर्ता प्रक्रिया शुल्क राशि 500/- ऊपर दर्शाए गए QR Code पर ऑनलाइन अदा किए जाने है तथा भुगतान की रसीद को Payment Proof Attachment पर अपलोड किया जाना अनिवार्य है।
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplicationProcessingFees;