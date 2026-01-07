import React, { createContext, useState, useEffect, useContext, } from "react";
import { fetchPostData } from "../components/hooks/Api";

export const FormDataContext = createContext();

/* ---------------- DEFAULT FORM STRUCTURE ---------------- */
export const defaultFormStructure = {
  // Personal Details
  FullName: "",
  Gender: "",
  Dob: "",
  Email: "",
  NameSelect: "",
  Fhname: "",
  Idproof: "",
  IdproofNo: "",
  AadharNumber: "",
  Caste: null,
  MobileNumber: "",
  ZipCode: "",
  State: null,
  City: null,
  Country: "INDIA",
  Paraddress: "",
  Posaddress: "",

  // Co-applicant
  CoapplicantName: "",
  CoGender: "",
  CoDob: "",
  CoEmail: "",
  CoNameSelect: "",
  CoFhname: "",
  CoIdproof: "",
  CoIdproofNo: "",
  CoAadharNumber: "",
  CoCaste: null,
  CoMobileNumber: "",
  CoZipCode: "",
  CoState: null,
  CoCity: null,
  CoCountry: "INDIA",
  CoParaddress: "",
  CoPosaddress: "",

  // Bank Details
  BankUserName: "",
  AccountNumber: "",
  BankName: null,
  IfscCode: "",
  BranchAddress: "",

  // Application Processing Fees
  ApplicationFeePaymentRefNum: "",
  ApplicationFeePaymentDate: "",
  ApplicationFeeAttachment: "",

  // Payment Details
  PaymentTrasnum: "",
  PaymentDate: "",
  PaymentBank: "",
  BankAmount: "",
  PaymentAttachement: "",

  // Income Details
  Category: "",
  AnnualIncome: "",
  ProjectName: "",
  PolicyName: "",
  IncomeDetailsAttachment: "",

  Status: "Active",
  ApplicantNumber: "",
  CompanyID: localStorage.getItem("companyID") || 1,
};

/* ---------------- PROVIDER ---------------- */
export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("applicationFormData");
      if (saved) {
        return {
          ...defaultFormStructure,
          ...JSON.parse(saved),
        };
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
    return defaultFormStructure;
  });

  /* ---------------- FETCH COMPANY DATA ---------------- */
  const getSingleData = async () => {
    try {
      const resp = await fetchPostData("Company/GetSingleData_Company", {
        CompanyID: localStorage.getItem("companyID") || 1,
      }, []);

      if (resp?.success && resp?.data) {
        const parsedData = JSON.parse(resp.data);
        const companyData = parsedData?.Table?.[0];

        if (companyData?.ProjectName) {
          setFormData((prev) => ({
            ...prev,
            ProjectName: companyData.ProjectName,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  /* ---------------- LOAD COMPANY DATA ONCE ---------------- */
  useEffect(() => {
    getSingleData();
  }, []);

  /* ---------------- SAVE TO LOCAL STORAGE ---------------- */
  useEffect(() => {
    try {
      const normalized = { ...defaultFormStructure, ...formData, };
      localStorage.setItem("applicationFormData", JSON.stringify(normalized));
    } catch (error) {
      console.error("Error saving formData:", error);
    }
  }, [formData]);

  /* ---------------- RESET FORM ---------------- */
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
  };

  return (
    <FormDataContext.Provider value={{ formData, setFormData, resetFormData }} >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
