import React, { useState, useRef, useEffect } from "react";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import AcknowledgementReceipt from "./AcknowledgementReceipt";
import { useNavigate } from "react-router-dom";
import { fetchPostData } from "../../components/hooks/Api";
 
const PersonalDetailsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic");
    const receiptRef = useRef();
    const [bank, setBank] = useState("");
 
    const handlePrint = () => {
        const receiptContent = document.getElementById("receipt-content").innerHTML;
 
        // 🪟 Open a clean, blank popup window
        const printWindow = window.open("", "_blank", "width=900,height=650");
 
        printWindow.document.open();
        printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title></title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
 
      <style>
        @page {
          margin: 0;
          size: A4 portrait;
        }
        body {
          margin: 1.5cm;
          font-family: Arial, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .receipt-container { width: 100%; }
        .table th, .table td { border: 1px solid #dee2e6; padding: 6px; }
 
        /* 🧩 Trick: hide URL, title, and date/time overlays */
        @media print {
          html::before, html::after,
          body::before, body::after {
            color: transparent !important;
            content: "" !important;
            display: none !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt-container">
        ${receiptContent}
      </div>
 
      <script>
        document.title = ""; // remove title
        setTimeout(() => {
          window.print();
          setTimeout(() => window.close(), 300);
        }, 300);
      </script>
    </body>
    </html>
  `);
 
        printWindow.document.close();
    };
   
    const userData = JSON.parse(localStorage.getItem('applicationFormData'));
 
    const fetchBank = async () => {
        const response = await fetchPostData('Bank/GetDataDropDown_Bank',
            {
                CompanyID: 1
            }
        );
        // console.log(response);
 
        if(response && Array.isArray(response)){
            const data = response.find((arr) => String(arr.BankID) === String(userData.BankName))?.Description
            setBank(data);
        }else{
            setBank("");
        }
    }
 
    useEffect(() => {
        fetchBank();
    }, []);
 
    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-sm border-0">
                {/* Header Tabs */}
                <div className="card-header bg-dark text-white d-flex justify-content-between px-4">
                    <div className="fw-bold text-danger border-bottom border-danger pb-1">
                        Personal Details
                    </div>
 
                    <button
                        onClick={handlePrint}
                        className="btn d-flex align-items-center gap-2 no-print"
                        style={{ backgroundColor: "#a992f7", color: "white" }}
                    >
                        <FaPrint /> Print Receipt
                    </button>
                </div>
 
                {/* Applicant Details */}
                <div className="card-body text-center border-bottom">
                    <h4 className="fw-bold">{userData.FullName}</h4>
                    <p className="mb-1">
                        <strong>Applicant Number:</strong> {userData.ApplicantNumber}
                    </p>
                    <p className="mb-1">
                        <strong>Email:</strong> {userData.Email}
                    </p>
                    <p className="mb-3">
                        <strong>Date:</strong> {userData.Dob}
                    </p>
                </div>
 
                {/* Tabs */}
                <div className="d-flex border-bottom mt-3">
                    {["basic", "account"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-fill py-2 fw-semibold border-0 ${activeTab === tab ? "active-tab" : "inactive-tab"
                                }`}
                            onMouseEnter={(e) => {
                                if (activeTab !== tab)
                                    e.currentTarget.style.backgroundColor = "#E9E3FF";
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== tab)
                                    e.currentTarget.style.backgroundColor = "transparent";
                            }}
                        >
                            {tab === "basic" ? "Basic Info" : "Account Details"}
                        </button>
                    ))}
                </div>
 
                {/* Tab content (same as before) */}
                <div className="p-4 border border-top-0 rounded-bottom bg-white">
                    {activeTab === "basic" ? (
                        <table className="table table-bordered align-middle">
                            <tbody>
                                <tr>
                                    <th width="30%">Fullname</th>
                                    <td>{userData.FullName}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{userData.Dob}</td>
                                </tr>
                                <tr>
                                    <th>Father/Husband Name</th>
                                    <td>{userData.Fhname}</td>
                                </tr>
                                <tr>
                                    <th>Mobile Number</th>
                                    <td>{userData.MobileNumber}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{userData.Paraddress}</td>
                                </tr>
                                <tr>
                                    <th>Zip Code</th>
                                    <td>{userData.ZipCode}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-bordered align-middle">
                            <tbody>
                                <tr>
                                    <th width="30%">Account Holder Name</th>
                                    <td>{userData.BankUserName}</td>
                                </tr>
                                <tr>
                                    <th>Account Number</th>
                                    <td>{userData.AccountNumber}</td>
                                </tr>
                                <tr>
                                    <th>Bank Name</th>
                                    <td>{bank}</td>
                                </tr>
                                <tr>
                                    <th>Branch Address</th>
                                    <td>{userData.BranchAddress}</td>
                                </tr>
                                <tr>
                                    <th>IFSC Code</th>
                                    <td>{userData.IfscCode}</td>
                                </tr>
                                {/* <tr>
                                    <th>Account Type</th>
                                    <td>{userData.accountType}</td>
                                </tr> */}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
 
            {/* Hidden Receipt for Printing */}
            <div id="receipt-content" style={{ display: "none" }}>
                <AcknowledgementReceipt />
            </div>
        </div>
    );
};
 
export default PersonalDetailsPage;