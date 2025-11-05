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

  // Bank Details
  BankUserName: '',
  AccountNumber: '',
  BankName: null,
  IfscCode: '',
  BranchAddress: '',

  // Payment Details
  PaymentTrasnum: '',
  PaymentDate: '',
  PaymentBank: '', //No
  BankAmount: '',
  PaymentAttachement: '',

  // Income Details
  Category: '',
  AnnualIncome: '',
  ProjectName: '',
  PolicyName: '',

  Status: 'Active',
  CreatedByUser: 'Admin',
  ApplicantNumber: '',
  CompanyID: 1
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
      console.error("Error parsing saved form data:", err);
    }
    return defaultFormStructure;
  });

  useEffect(() => {
    try {
      const normalized = { ...defaultFormStructure, ...formData };
      localStorage.setItem("applicationFormData", JSON.stringify(normalized));
    } catch (err) {
      console.error("Error saving formData to localStorage:", err);
    }
  }, [formData]);

  const resetFormData = () => {
    setFormData(defaultFormStructure);
    localStorage.removeItem("applicationFormData");
    localStorage.removeItem("UserID");
  }

  return (
    <FormDataContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormData = () => useContext(FormDataContext);