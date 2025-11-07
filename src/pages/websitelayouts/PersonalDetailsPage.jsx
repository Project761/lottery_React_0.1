import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const PersonalDetailsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic");
    const applicantData = {
        name: "HAHSH",
        applicantNumber: "1251",
        email: "hah@gmail.com",
        date: "02-10-2025 11:15:02 PM",
        basicInfo: {
            fullname: "Hahsh",
            dob: "2025-10-02",
            fatherName: "Hd",
            mobile: "8385075298",
            address: "Hdhdj",
            zip: "302005",
        },
    };

    const accountInfo = {
        accountHolderName: "Hahsh",
        accountNumber: "1251",
        bankName: "State Bank of India",
        branchName: "Jaipur Main",
        ifscCode: "SBIN0001234",
        accountType: "Savings",
    };

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-sm border-0">
                {/* Header Tabs */}
                <div className="card-header bg-dark text-white d-flex justify-content-between px-4">
                    <div className="fw-bold text-danger border-bottom border-danger pb-1">
                        Personal Details
                    </div>
                    <div>Receipt</div>
                </div>

                {/* Applicant Details */}
                <div className="card-body text-center border-bottom">
                    <h4 className="fw-bold">{applicantData.name}</h4>
                    <p className="mb-1">
                        <strong>Applicant Number:</strong> {applicantData.applicantNumber}
                    </p>
                    <p className="mb-1">
                        <strong>Email:</strong> {applicantData.email}
                    </p>
                    <p className="mb-3">
                        <strong>Date:</strong> {applicantData.date}
                    </p>
                    <Link
                        to="/acknowledgement-receipt"
                        className="btn px-4"
                        style={{
                            backgroundColor: "#A992F7",
                            color: "white",
                            padding: "10px 20px",
                            fontWeight: "500",
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        Download Receipt
                    </Link>
                </div>

                {/* ✅ Custom Tab Header */}
                <div className="d-flex border-bottom mt-3">
                    {["basic", "account"].map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`flex-fill py-2 fw-semibold border-0 ${activeTab === tab ? "active-tab" : "inactive-tab"}`}
                            onMouseEnter={(e) => { if (activeTab !== tab) e.currentTarget.style.backgroundColor = "#E9E3FF"; }}
                            onMouseLeave={(e) => { if (activeTab !== tab) e.currentTarget.style.backgroundColor = "transparent"; }}
                        >
                            {tab === "basic" ? "Basic Info" : "Account Details"}
                        </button>
                    ))}

                </div>

                {/* ✅ Tab Content */}
                <div className="p-4 border border-top-0 rounded-bottom bg-white">
                    {activeTab === "basic" ? (
                        <table className="table table-bordered align-middle">
                            <tbody>
                                <tr>
                                    <th width="30%">Fullname</th>
                                    <td>{applicantData.basicInfo.fullname}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{applicantData.basicInfo.dob}</td>
                                </tr>
                                <tr>
                                    <th>Father/Husband Name</th>
                                    <td>{applicantData.basicInfo.fatherName}</td>
                                </tr>
                                <tr>
                                    <th>Mobile Number</th>
                                    <td>{applicantData.basicInfo.mobile}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{applicantData.basicInfo.address}</td>
                                </tr>
                                <tr>
                                    <th>Zip Code</th>
                                    <td>{applicantData.basicInfo.zip}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-bordered align-middle">
                            <div className="tab-content p-4">
                                {/* Basic Info */}
                                <div className={`tab-pane fade ${activeTab === "basic" ? "show active" : ""}`} id="basicInfo">
                                    {/* your basic info table */}
                                </div>

                                {/* Account Details */}
                                <div className={`tab-pane fade ${activeTab === "account" ? "show active" : ""}`} id="accountDetails">
                                    <table className="table table-bordered align-middle">
                                        <tbody>
                                            <tr>
                                                <th width="30%">Account Holder Name</th>
                                                <td>{accountInfo.accountHolderName}</td>
                                            </tr>
                                            <tr>
                                                <th>Account Number</th>
                                                <td>{accountInfo.accountNumber}</td>
                                            </tr>
                                            <tr>
                                                <th>Bank Name</th>
                                                <td>{accountInfo.bankName}</td>
                                            </tr>
                                            <tr>
                                                <th>Branch Name</th>
                                                <td>{accountInfo.branchName}</td>
                                            </tr>
                                            <tr>
                                                <th>IFSC Code</th>
                                                <td>{accountInfo.ifscCode}</td>
                                            </tr>
                                            <tr>
                                                <th>Account Type</th>
                                                <td>{accountInfo.accountType}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </table>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PersonalDetailsPage;
