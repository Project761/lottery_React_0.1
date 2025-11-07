import React from "react";
import { FaPrint } from "react-icons/fa";


const AcknowledgementReceipt = () => {
  const data = {
    applicationRef: "2502600190",
    status: "Acknowledged",
    incomeGroup: "300001/- To 600000/ Per Year",
    category: "Un-Reserved",
    applicantName: "PATASI",
    fatherName: "MOOL CHAND",
    dob: "01 JAN 1959",
    mobile: "9549868573",
    address: "JEEVA KA BASS, KHARKHARI, JHUNJHUNU, Rajasthan, Pin Code 333011",
    email: "jangid770@gmail.com",
    schemeName: "ATAL VIHAR",
    plotCategory: "LIG",
    amount: "20000.00",
    paymentStatus: "Payment Acknowledged",
    paymentMode: "Online",
    paymentControlNo: "64250260190",
    instrumentNo: "ICINXBK776",
    date: "26 Jan 2025",
    region: "JHUNJHUNU",
    institute: "JDA",
  };

  return (
    <div className="receipt-container container mt-4 mb-5 position-relative">
      {/* Header */}
      <div className="text-center">
        <h5 className="fw-bold text-danger mb-1">JAIPUR DEVELOPMENT AUTHORITY</h5>
        <p className="fw-semibold mb-0 hindi-text">
          जयपुर की आवासीय योजना अंतर विहार में भूखण्डों के आवंटन हेतु ऑनलाइन आवेदन
        </p>
        <p className="fw-semibold hindi-text mb-3">
          जयपुर की आवासीय योजना अंतर विहार में भूखण्डों के आवंटन हेतु ऑनलाइन आवेदन
        </p>
      </div>

      <div className="d-flex justify-content-end mb-3 no-print" style={{position:"absolute", right:"0px", top:"45px"}}>
        <button 
          onClick={() => window.print()}
          className="btn  d-flex align-items-center gap-2"
          style={{ backgroundColor: "#a992f7", color: "white" }}
        >
          <FaPrint /> Print 
        </button>
      </div>

      {/* Application Info */}
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Application Reference Number</th>
            <td>{data.applicationRef}</td>
          </tr>
          <tr>
            <th>Application Status</th>
            <td>{data.status}</td>
          </tr>
          <tr>
            <th>Income Group and Category</th>
            <td>{data.incomeGroup}</td>
          </tr>
          <tr>
            <th>Reservation of Plot Category</th>
            <td>{data.category}</td>
          </tr>
        </tbody>
      </table>

      {/* Applicant Details */}
      <h6 className="section-heading">Applicant Detail ➤</h6>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Applicant's Full Name</th>
            <td>{data.applicantName}</td>
          </tr>
          <tr>
            <th>Father’s/Husband’s Full Name</th>
            <td>{data.fatherName}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>{data.dob}</td>
          </tr>
          <tr>
            <th>Mobile No</th>
            <td>{data.mobile}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{data.address}</td>
          </tr>
          <tr>
            <th>eMail ID</th>
            <td>{data.email}</td>
          </tr>
        </tbody>
      </table>

      {/* Application Summary */}
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Priority</th>
            <th>Application No.</th>
            <th>Scheme Name</th>
            <th>Plot Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{data.applicationRef}</td>
            <td>{data.schemeName}</td>
            <td>{data.plotCategory}</td>
            <td>{data.amount}</td>
          </tr>
        </tbody>
      </table>

      {/* Payment Details */}
      <h6 className="section-heading">Payment Details ➤</h6>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Status</th>
            <td>{data.paymentStatus}</td>
          </tr>
          <tr>
            <th>Payment Mode</th>
            <td>{data.paymentMode}</td>
          </tr>
          <tr>
            <th>Payment Control No.</th>
            <td>{data.paymentControlNo}</td>
          </tr>
          <tr>
            <th>Instrument No.</th>
            <td>{data.instrumentNo}</td>
          </tr>
          <tr>
            <th>Instrument Date</th>
            <td>{data.date}</td>
          </tr>
          <tr>
            <th>Region</th>
            <td>{data.region}</td>
          </tr>
          <tr>
            <th>Institution</th>
            <td>{data.institute}</td>
          </tr>
          <tr>
            <th>Instrument Amount</th>
            <td>{data.amount}</td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <p className="note-text">
        <strong>Note:</strong> If payment is made through Credit/Debit Card, in
        case of refund by JDA, the amount will only be credited to the Bank
        Account provided by applicant while filling form. JDA will not entertain
        any Chargeback claims, if any.
      </p>
    </div>
  );
};

export default AcknowledgementReceipt;
