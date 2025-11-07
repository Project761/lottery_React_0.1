// src/config/adminPages.jsx

export const adminPagesConfig = {
  /* ---------------------------------------------------------------------- */
  /* 🏦 BANK PAGE */
  /* ---------------------------------------------------------------------- */
  bank: {
    endpoint: "/api/banks",
    title: "Bank",
    columns: [
      { label: "S.No", key: "id" },
      { label: "Bank Name", key: "name" },
    ],
    formFields: [
      { name: "name", label: "Bank Name", type: "text", required: true },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 🧬 CASTE PAGE */
  /* ---------------------------------------------------------------------- */
  caste: {
    endpoint: "/api/castes",
    title: "Caste",
    columns: [
      { label: "S.No", key: "id" },
      { label: "Caste Name", key: "name" },
    ],
    formFields: [
      { name: "name", label: "Caste Name", type: "text", required: true },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 🏗 PROJECT PAGE */
  /* ---------------------------------------------------------------------- */
  project: {
    endpoint: "/api/projects",
    title: "Project",
    columns: [
      { label: "Project Name", key: "name" },
      { label: "Location", key: "location" },
      { label: "Status", key: "status" },
    ],
    formFields: [
      { name: "name", label: "Project Name", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 📏 PLOT PAGE */
  /* ---------------------------------------------------------------------- */
  plot: {
    endpoint: "/api/plots",
    title: "Plot",
    columns: [
      { label: "Project Name", key: "projectName" },
      { label: "Project Type", key: "projectType" },
      { label: "Plot Number", key: "plotNumber" },
      { label: "Plot Size", key: "plotSize" },
      { label: "Plot Area", key: "plotArea" },
    ],
    formFields: [
      { name: "projectName", label: "Project Name", type: "text" },
      {
        name: "projectType",
        label: "Project Type",
        type: "select",
        options: [
          { label: "Residential", value: "Residential" },
          { label: "Commercial", value: "Commercial" },
        ],
      },
      { name: "plotNumber", label: "Plot Number", type: "text" },
      { name: "plotSize", label: "Plot Size", type: "text" },
      {
        name: "plotArea",
        label: "Plot Area Unit",
        type: "select",
        options: [
          { label: "Yard", value: "Yard" },
          { label: "Meter", value: "Meter" },
          { label: "Sq.ft", value: "Sq.ft" },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 📄 APPLICATION PAGE */
  /* ---------------------------------------------------------------------- */
  application: {
    endpoint: "/api/applications",
    title: "Application",
    columns: [
      { label: "Applicant Number", key: "applicationNo" },
      { label: "Full Name", key: "fullName" },
      { label: "Mobile Number", key: "mobile" },
      { label: "Aadhar Number", key: "aadhar" },
      { label: "Email ID", key: "email" },
      { label: "Address", key: "address" },
      { label: "Attachment", key: "attachment", type: "link" },
    ],
    formFields: [
      { name: "applicationNo", label: "Applicant Number", type: "text" },
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "mobile", label: "Mobile Number", type: "text" },
      { name: "aadhar", label: "Aadhar Number", type: "text" },
      { name: "email", label: "Email ID", type: "email" },
      { name: "address", label: "Address", type: "text" },
      { name: "attachment", label: "Attachment", type: "file" },
    ],
  },

  /* ---------------------------------------------------------------------- */
  /* 🏧 BANK DETAILS PAGE */
  /* ---------------------------------------------------------------------- */
  bankDetails: {
    endpoint: "/api/bank-details",
    title: "Bank Details",
    columns: [
      { label: "Bank Name", key: "bankName" },
      { label: "Account Number", key: "accountNumber" },
      { label: "Account Holder", key: "accountHolder" },
      { label: "IFSC Code", key: "ifsc" },
      { label: "Branch", key: "branch" },
      { label: "Status", key: "status" },
    ],
    formFields: [
      { name: "bankName", label: "Bank Name", type: "text", required: true },
      { name: "accountNumber", label: "Account Number", type: "text" },
      { name: "accountHolder", label: "Account Holder", type: "text" },
      { name: "ifsc", label: "IFSC Code", type: "text" },
      { name: "branch", label: "Branch", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ],
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* 🧩 Helper: Get config by page name */
/* -------------------------------------------------------------------------- */
export const getPageConfig = (page) => {
  return adminPagesConfig[page] || null;
};
