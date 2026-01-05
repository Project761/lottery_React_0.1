import React, { createContext, useState, useEffect, useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FormDataContext = createContext();

export const defaultFormStructure = {
  // Personal Details
  FullName: '',
  Gender: '',
  Dob: '',
  Email: '',
  NameSelect: '',
  Fhname: '',
  Idproof: '',
  IdproofNo: '',
  AadharNumber: '',
  Caste: null,
  MobileNumber: '',
  ZipCode: '',
  State: null,
  City: null,
  Country: 'INDIA',
  Paraddress: '',
  Posaddress: '',

  // Co-applicant
  CoapplicantName: '',
  CoGender: '',
  CoDob: '',
  CoEmail: '',
  CoNameSelect: '',
  CoFhname: '',
  CoIdproof: '',
  CoIdproofNo: '',
  CoAadharNumber: '',
  CoCaste: null,
  CoMobileNumber: '',
  CoZipCode: '',
  CoState: null,
  CoCity: null,
  CoCountry: 'INDIA',
  CoParaddress: '',
  CoPosaddress: '',

  // Bank Details
  BankUserName: '',
  AccountNumber: '',
  BankName: null,
  IfscCode: '',
  BranchAddress: '',

  // Application Processing Fees
  ApplicationFeePaymentRefNum: '',
  ApplicationFeePaymentDate: '',
  ApplicationFeeAttachment: '',

  // Payment Details
  PaymentTrasnum: '',
  PaymentDate: '',
  PaymentBank: '',
  BankAmount: '',
  PaymentAttachement: '',

  // Income Details
  Category: '',
  AnnualIncome: '',
  ProjectName: 'Infiniti Homes',
  PolicyName: '',
  IncomeDetailsAttachment : '',

  Status: 'Active',
  // CreatedByUser: 'Admin',
  ApplicantNumber: '',
  CompanyID: localStorage.getItem('companyID') || 1,
};

// export const 

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("applicationFormData");
      if (saved) {
        return { ...defaultFormStructure, ...JSON.parse(saved) };
      }
    } catch (err) {
      // console.error("Error parsing saved form data:", err);
    }
    return defaultFormStructure;
  });

  useEffect(() => {
    try {
      const normalized = { ...defaultFormStructure, ...formData };
      localStorage.setItem("applicationFormData", JSON.stringify(normalized));
    } catch (err) {
      // console.error("Error saving formData to localStorage:", err);
    }
  }, [formData]);

  const resetFormData = () => {
    setFormData(defaultFormStructure);
    localStorage.removeItem("applicationFormData");
    localStorage.removeItem("UserID");
    localStorage.removeItem("isMobileVerified");
    localStorage.removeItem("sameAddress");
    localStorage.removeItem("ApplicantNumber");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_expiry");
    localStorage.removeItem("coApplicantData");
    localStorage.removeItem("coAppliAddress");
    localStorage.removeItem("verifiedMobile");
  }

  return (
    <FormDataContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormData = () => useContext(FormDataContext);

//But now still there is problem that when we are changing value of ApplicationFeeAttachment , IncomeDetailsAttachment	then on our User/Update_PaymentAttachement only Files data is going not the other two. Why 
//Give me only solution