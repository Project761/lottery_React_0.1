import React, { createContext, useState, useEffect, useContext } from "react";

export const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {
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
      Posaddress: false,
      postalAddress: '',

      // Bank Details
      BankUserName: '',
      AccountNumber: '',
      BankName: null,
      IfscCode: '',
      BranchAddress: '',

      // Payment Details
      PaymentTrasnum: '',
      PaymentDate: '',
      PaymentBank: '',
      BankAmount: '',
      PaymentAttachement: '',

      // Income Details
      AnnualIncome: '',
      ProjectName: '',
      Category: '',

      Status: 'Active',
      CreatedByUser: 'Admin',
      PolicyName: '',
      ApplicantNumber: '',
      CompanyID: 1
    };
  });

  useEffect(() => {
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
export const useFormData = () => useContext(FormDataContext);