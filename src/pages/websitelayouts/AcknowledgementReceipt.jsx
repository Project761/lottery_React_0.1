import React, { useState, useEffect, forwardRef } from "react";
import { showError } from "../../utils/toast";
import { fetchPostData } from "../../components/hooks/Api";

const AcknowledgementReceipt = forwardRef((props, ref) => {
  const [category, setcategory] = useState("");
  const [income, setIncome] = useState("");
  const [bank, setBank] = useState("");
  const [projName, setProjName] = useState("");
  const [plotCategory, setPlotCategory] = useState("");

  const userData = JSON.parse(localStorage.getItem('applicationFormData'));
  const applicantNumber = localStorage.getItem('ApplicantNumber');

  //---------------------- Dropdowns -----------------------
  const fetchCategory = async () => {
    try {
      const response = await fetchPostData(
        "Category/GetDataDropDown_Category",
        {
          CompanyId: localStorage.getItem('companyID') || 1,
          // CompanyID: 1,
        }
      );
      // console.log(response);

      if (response && Array.isArray(response)) {
        const data = response.find((arr) => String(arr.CategoryID) === String(userData.Category));
        setPlotCategory(data?.plot_range);
        setcategory(data?.Description);
        // console.log(data);
      } else {
        setcategory("");
      }
    } catch {
      showError("Error fetching States");
    }
  };

  const fetchAnnualIncome = async () => {
    try {
      const response = await fetchPostData("AnnualIncome/GetDataDropDown_AnnualIncome",
        {
          CompanyID: localStorage.getItem('companyID') || 1,
        }
      );
      // console.log(response);
      if (response && Array.isArray(response)) {
        const data = response.find((arr) => String(arr.AnnualIncomeID) === String(userData.AnnualIncome))?.Description
        setIncome(data);
      } else {
        setIncome("");
      }
    } catch {
      showError("Error fetching Annual Income");
    }
  };

  const fetchBank = async () => {
    const response = await fetchPostData('Bank/GetDataDropDown_Bank',
      {
        CompanyID: localStorage.getItem('companyID') || 1
      }
    );
    // console.log(response);

    if (response && Array.isArray(response)) {
      const data = response.find((arr) => String(arr.BankID) === String(userData.BankName))?.Description;
      setBank(data);
    } else {
      setBank("");
    }
  }

  const getProjectName = async () => {
    const response = await fetchPostData("Company/GetSingleData_Company", {
      "CompanyID": localStorage.getItem('companyID') || 1,
    });

    if (response?.length > 0) {
      setProjName(response[0].ProjectName);
    }
  }

  useEffect(() => {
    fetchCategory();
    fetchAnnualIncome();
    fetchBank();
    getProjectName();
  }, []);

  return (
    <div ref={ref} className="receipt-container container mt-4 mb-5 position-relative">
      {/* Header */}
      <div className="text-center">
        <h5 className="fw-bold text-danger mb-1">JAIPUR DEVELOPMENT AUTHORITY</h5>
        <p className="fw-semibold mb-0 hindi-text">
          जयपुर की आवासीय योजना {projName} में भूखण्डों के आवंटन हेतु ऑनलाइन आवेदन
        </p>
      </div>

      {/* Application Info */}
      <table className="table table-bordered mt-3">
        <tbody>
          <tr>
            <th>Application Reference Number</th>
            <td>{userData.ApplicantNumber || applicantNumber}</td>
          </tr>
          <tr>
            <th>Application Status</th>
            <td>Acknowledged</td>
          </tr>
          <tr>
            <th>Income Group and Category</th>
            <td>{category}</td>
          </tr>
          <tr>
            <th>Reservation of Plot Category</th>
            <td>{plotCategory}</td>
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
            <td>{userData.Email}</td>
          </tr>
        </tbody>
      </table>

      {/* Lottery Details */}
      {/* <h6 className="mt-4">Lottery Details ➤</h6>
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
      </table> */}

      {/* Payment Details */}
      <h6 className="mt-4">Payment Details ➤</h6>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Status</th>
            <td>Payment Acknowledged</td>
          </tr>
          <tr>
            <th>Payment Mode</th>
            <td>Online</td>
          </tr>
          <tr>
            <th>Account Holder Name</th>
            <td>{userData.BankUserName}</td>
          </tr>
          <tr>
            <th>Account Number</th>
            <td>{userData.AccountNumber}</td>
          </tr>
          <tr>
            <th>IFSC Code</th>
            <td>{userData.IfscCode}</td>
          </tr>
          <tr>
            <th>Bank Name</th>
            <td>{userData.BankName}</td>
          </tr>
          <tr>
            <th>Branch Address</th>
            <td>{userData.BranchAddress}</td>
          </tr>
          {/* <tr>
            <th>Instrument Amount</th>
            <td>{data.amount}</td>
          </tr> */}
        </tbody>
      </table>
      <div className="note-texts mt-3 text-justify">
        <strong>Note : -</strong> आवेदक द्वारा इस आवेदन की एक प्रति मय वांछित दस्तावेजात जैसे कि पहचान पत्र, आरक्षण सम्बन्धी दस्तावेज, आय प्रमाण पत्र/इनकम टैक्स सर्टिफिकेट, निवास प्रमाण पत्र, 4 फोटो, असल डीडी, प्रक्रिया शुल्क भुगतान रसीद व अन्य सभी दस्तावेज जिनका विवरण शर्तों में दिया गया है, को विकासकर्ता के कार्यालय में दिनांक 01.02.2026 तक जमा कराया जाना अनिवार्य है। दिनांक 01.02.2026 के पश्चात प्राप्त होने वाले आवेदन स्वीकार्य नहीं होंगे।
      </div>
    </div>
  );
});

export default AcknowledgementReceipt;

