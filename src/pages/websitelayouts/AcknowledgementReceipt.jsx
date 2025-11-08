import React, { forwardRef } from "react";

const AcknowledgementReceipt = forwardRef((props, ref) => {
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
    lotteryNumber: "LOT-2025-00123",
    lotteryDate: "15 Dec 2025",
  };

  return (
    <div ref={ref} className="receipt-container container mt-4 mb-5 position-relative">
      {/* Header */}
      <div className="text-center">
        <h5 className="fw-bold text-danger mb-1">JAIPUR DEVELOPMENT AUTHORITY</h5>
        <p className="fw-semibold mb-0 hindi-text">
          जयपुर की आवासीय योजना अंतर विहार में भूखण्डों के आवंटन हेतु ऑनलाइन आवेदन
        </p>
      </div>

      {/* Application Info */}
      <table className="table table-bordered mt-3">
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
      <h6 className="mt-4">Applicant Detail ➤</h6>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Applicant's Full Name</th>
            <td>{userData.FullName}</td>
          </tr>
          <tr>
            <th>Father’s/Husband’s Full Name</th>
            <td>{userData.Fhname}</td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>{userData.Dob}</td>
          </tr>
          <tr>
            <th>Mobile No</th>
            <td>{userData.MobileNumber}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{userData.Paraddress}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{data.email}</td>
          </tr>
        </tbody>
      </table>

      {/* Lottery Details */}
      <h6 className="mt-4">Lottery Details ➤</h6>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Lottery Number</th>
            <td className="fw-bold text-primary">{data.lotteryNumber}</td>
          </tr>
          <tr>
            <th>Lottery Date</th>
            <td>{data.lotteryDate}</td>
          </tr>
        </tbody>
      </table>

      {/* Payment Details */}
      <h6 className="mt-4">Payment Details ➤</h6>
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
    </div>
  );
});

export default AcknowledgementReceipt;
