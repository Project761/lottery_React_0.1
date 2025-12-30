import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplicationProcessingFees = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        applicationId: "",
        applicantName: "",
        feeAmount: "1000",
        paymentMode: "",
        paymentDate: "",
        attachment: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "attachment" && files.length > 0) {
            setForm((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleNext = () => {
        navigate("/dd-details");
    };

    const onBack = () => {
        navigate("/bank-details");
    }





    return (
        <div className="container px-0">
            <div className="card shadow-sm">
                <div className="text-center text-white py-1" style={{ backgroundColor: "#6c757d", fontSize: "14px" }}>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            <div className="text-center text-white fw-semibold py-1 mb-2">Application Processing Fee 1000</div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label"> Payment Reference Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="applicationId"
                                    value={form.applicationId}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter transfer number"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label"> Online Payment Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="paymentDate"
                                    value={form.paymentDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Payment Attachment</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="attachment"
                                    onChange={handleChange}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required
                                />
                            </div>

                        </div>

                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button type="button" className="btn btn-secondary px-4" onClick={onBack}> Back </button>
                            <button type="button" className="btn text-white px-4" style={{ backgroundColor: "#A992F7" }} onClick={handleNext}> Next </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplicationProcessingFees;
