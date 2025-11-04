import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import { fetchPostData } from "../components/hooks/Api";
import { useFormData } from "../context/FormDataContext";
import { defaultFormStructure } from "../context/FormDataContext"; 


const LoginPage = () => {
    const [mobile, setMobile] = useState("");
    const [applicant, setApplicant] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const { formData, setFormData } = useFormData();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mobile.trim() || !applicant.trim()) {
            showError("Please fill in all required fields.");
            return;
        }

        try {
            const payload = {
                MobileNumber: mobile,
                ApplicantNumber: applicant
            };

            const response = await fetchPostData('User/Login', payload);
            if(response){
                const userID = response[0].UserID;
                localStorage.setItem("UserId", userID);
                showSuccess("Login successful!");

                navigate("/apply");
            }else{
                showError("Invalid credentials. Please try again.");
            }
        } catch (error) {
            showError("Login failed. Please try again.");
        };
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-white text-center py-3">
                            <h4 className="mb-0 fw-bold" style={{ color: "#333" }}>EWS-LIG</h4>
                        </div>
                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3 mb-4">
                                    {/* Mobile-No */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Mobile Number <span className="text-danger">*</span>
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter Mobile Number" value={mobile}
                                            autoComplete="off"
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>

                                    {/* Applicant-No */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Applicant Number <span className="text-danger">*</span>
                                        </label>
                                        <input type="text" className="form-control" placeholder="Enter Applicant Number" value={applicant}
                                            autoComplete="off" onChange={(e) => setApplicant(e.target.value)} />
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <button type="submit" className="btn text-white fw-semibold py-2 px-4" style={{ backgroundColor: "#A992F7", fontSize: "16px", width: "auto", minWidth: "100px" }}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
