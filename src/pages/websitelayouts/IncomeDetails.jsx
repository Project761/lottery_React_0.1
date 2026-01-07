import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../../components/website/TermsModal.jsx";
import Select from "../../../node_modules/react-select/dist/react-select.esm.js";
import { fetchPostData, fetchPostFormData } from "../../components/hooks/Api.js";
import { showError, showSuccess } from "../../utils/toast.js";
import { useFormData } from "../../context/FormDataContext.jsx";
import { ChangeArrayFormat, onChangeDropdown, selectValue } from "../../utils/Comman.js";
import { buildFormData } from "../../utils/formDataHelper.js";

const IncomeDetails = () => {

  const navigate = useNavigate();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [category, setcategory] = useState([]);
  const [income, setIncome] = useState([]);
  const [projName, setProjName] = useState("");
  const [isIncomeDetAttac, setIsIncomeDetAttac] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const { formData, setFormData } = useFormData();

  useEffect(() => {
    const copy = { ...formData };
    delete copy.IncomeDetailsAttachment;
    localStorage.setItem("applicationFormData", JSON.stringify(copy));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("IsIncomeDetAttac", isIncomeDetAttac.toString());
  }, [isIncomeDetAttac]);

  //---------------------- Dropdowns -----------------------
  const fetchCategory = async () => {
    try {
      const response = await fetchPostData(
        "Category/GetDataDropDown_Category",
        {
          // CompanyId: Number(localStorage.getItem('companyID')),
          CompanyID: localStorage.getItem('companyID') || 1,
        }
      );
      // console.log(response);

      if (response && Array.isArray(response)) {
        setcategory(response);
      } else {
        setcategory([]);
      }
    } catch {
      showError("Error fetching States");
    }
  };

  const fetchAnnualIncome = async () => {
    try {
      const response = await fetchPostData(
        "AnnualIncome/GetDataDropDown_AnnualIncome",
        {
          CompanyID: localStorage.getItem('companyID') || 1,
        }
      );
      // console.log(response);
      if (response && Array.isArray(response)) {
        setIncome(response);
      } else {
        setIncome([]);
      }
    } catch {
      showError("Error fetching Annual Income");
    }
  };

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
    getProjectName();
  }, []);

  const userID = localStorage.getItem("UserID");
  const insertFormData = async () => {
    try {
      const payload = buildFormData(formData);

      const response = await fetchPostFormData("User/Insert_User", payload);

      localStorage.setItem("ApplicantNumber", response[0].ApplicantNumber);
      showSuccess("Application submitted successfully!");

      // localStorage.removeItem("applicationFormData");
      // setFormData({});
      setTimeout(() => navigate("/thank-you"), 1000);

    } catch (error) {
      showError("Error submitting form. Please try again!");
    }
  };

  const updateFormData = async () => {
    try {
      const userID = localStorage.getItem("UserID");
      const isPaymentAttachmentChanged = localStorage.getItem("IsPaymentAttachmentChanged") === "true";
      const IsIncomeDetAttac = localStorage.getItem("IsIncomeDetAttac") === "true";
      const IsAppliFeeAttach = localStorage.getItem("IsAppliFeeAttach") === "true";

      if (isPaymentAttachmentChanged) {
        localStorage.removeItem(formData.PaymentAttachement);
      }
      if (IsAppliFeeAttach) {
        localStorage.removeItem(formData.ApplicationFeeAttachment);
      }
      if (IsIncomeDetAttac) {
        localStorage.removeItem(formData.IncomeDetailsAttachment);
      }

      if (isPaymentAttachmentChanged && formData.PaymentAttachement instanceof File || IsAppliFeeAttach && formData.ApplicationFeeAttachment instanceof File || IsIncomeDetAttac && formData.IncomeDetailsAttachment instanceof File) {
        const fd = new FormData();
        const data = { UserID: userID };
        fd.append("Data", JSON.stringify(data));
        fd.append("Files", formData.PaymentAttachement);
        fd.append("ApplicationFeeAttachment", formData.ApplicationFeeAttachment);
        fd.append("IncomeDetailsAttachment", formData.IncomeDetailsAttachment);

        await fetchPostFormData("User/Update_PaymentAttachement", fd);
        setFormData((prev) => ({
          ...prev,
          PaymentAttachement: "",
        }));
      }
      // console.log(formData);
      const payload = { ...formData };
      // delete payload.PaymentAttachement;
      payload.PaymentAttachement = formData.PaymentAttachement?.name || formData.PaymentAttachement || "";

      const response = await fetchPostData("User/Update_User", payload);

      if (response) {
        showSuccess("Application Updated successfully!");

        localStorage.removeItem("applicationFormData");
        localStorage.removeItem("UserID");
        localStorage.removeItem("sameAddress");
        setFormData({});

        setTimeout(() => navigate("/"), 1000);
      } else {
        showError(response?.Message || "Something went wrong!");

      }
    } catch (error) {
      showError("Error submitting form. Please try again!");

    }
  };

  // const updateFormData = async () => {
  //   try {
  //     const userID = localStorage.getItem("UserID");

  //     const isPaymentAttachmentChanged = localStorage.getItem("IsPaymentAttachmentChanged") === "true";
  //     const IsAppliFeeAttach = localStorage.getItem("IsAppliFeeAttach") === "true";
  //     const IsIncomeDetAttac = localStorage.getItem("IsIncomeDetAttac") === "true";

  //     const shouldUpdateAttachment = isPaymentAttachmentChanged || IsAppliFeeAttach || IsIncomeDetAttac;

  //     if (shouldUpdateAttachment) {
  //       const fd = new FormData();
  //       fd.append("Data", JSON.stringify({ UserID: userID }));

  //       if (isPaymentAttachmentChanged && formData.PaymentAttachement instanceof File) {
  //         fd.append("Files", formData.PaymentAttachement);
  //       }

  //       if (IsAppliFeeAttach && formData.ApplicationFeeAttachment instanceof File) {
  //         fd.append("Files", formData.ApplicationFeeAttachment);
  //       }

  //       if (IsIncomeDetAttac && formData.IncomeDetailsAttachment instanceof File) {
  //         fd.append("Files", formData.IncomeDetailsAttachment);
  //       }

  //       await fetchPostFormData("User/Update_PaymentAttachement", fd);

  //       localStorage.setItem("IsPaymentAttachmentChanged", "false");
  //       localStorage.setItem("IsAppliFeeAttach", "false");
  //       localStorage.setItem("IsIncomeDetAttac", "false");
  //     }


  //     const payload = { ...formData };

  //     payload.PaymentAttachement = formData.PaymentAttachement?.name || formData.PaymentAttachement || "";
  //     payload.ApplicationFeeAttachment = formData.ApplicationFeeAttachment?.name || formData.ApplicationFeeAttachment || "";
  //     payload.IncomeDetailsAttachment = formData.IncomeDetailsAttachment?.name || formData.IncomeDetailsAttachment || "";

  //     const response = await fetchPostData("User/Update_User", payload);

  //     if (!response) {
  //       showError("Something went wrong!");
  //       return;
  //     }

  //     showSuccess("Application Updated successfully!");

  //     localStorage.removeItem("applicationFormData");
  //     localStorage.removeItem("UserID");
  //     localStorage.removeItem("sameAddress");
  //     setFormData({});

  //     setTimeout(() => navigate("/"), 1000);
  //   } catch (error) {
  //     showError("Error submitting form. Please try again!");
  //   }
  // };

  // const updateFormData = async () => {
  //   try {
  //     const userID = localStorage.getItem("UserID");

  //     const isPaymentAttachmentChanged =
  //       localStorage.getItem("IsPaymentAttachmentChanged") === "true";
  //     const IsAppliFeeAttach =
  //       localStorage.getItem("IsAppliFeeAttach") === "true";
  //     const IsIncomeDetAttac =
  //       localStorage.getItem("IsIncomeDetAttac") === "true";

  //     // 🔹 PAYMENT ATTACHMENT
  //     if (isPaymentAttachmentChanged && formData.PaymentAttachement instanceof File) {
  //       const fd = new FormData();
  //       fd.append("Data", JSON.stringify({ UserID: userID }));
  //       fd.append("Files", formData.PaymentAttachement);

  //       await fetchPostFormData("User/Update_PaymentAttachement", fd);
  //       localStorage.setItem("IsPaymentAttachmentChanged", "false");
  //     }

  //     // 🔹 APPLICATION FEE ATTACHMENT
  //     if (IsAppliFeeAttach && formData.ApplicationFeeAttachment instanceof File) {
  //       const fd = new FormData();
  //       fd.append("Data", JSON.stringify({ UserID: userID }));
  //       fd.append("ApplicationFeeAttachment", formData.ApplicationFeeAttachment);

  //       await fetchPostFormData("User/Update_PaymentAttachement", fd);
  //       localStorage.setItem("IsAppliFeeAttach", "false");
  //     }

  //     // 🔹 INCOME DETAILS ATTACHMENT
  //     if (IsIncomeDetAttac && formData.IncomeDetailsAttachment instanceof File) {
  //       const fd = new FormData();
  //       fd.append("Data", JSON.stringify({ UserID: userID }));
  //       fd.append("IncomeDetailsAttachment", formData.IncomeDetailsAttachment);

  //       await fetchPostFormData("User/Update_PaymentAttachement", fd);
  //       localStorage.setItem("IsIncomeDetAttac", "false");
  //     }

  //     // 🔹 Update normal form data
  //     const payload = {
  //       ...formData,
  //       PaymentAttachement:
  //         formData.PaymentAttachement?.name || formData.PaymentAttachement || "",
  //       ApplicationFeeAttachment:
  //         formData.ApplicationFeeAttachment?.name ||
  //         formData.ApplicationFeeAttachment ||
  //         "",
  //       IncomeDetailsAttachment:
  //         formData.IncomeDetailsAttachment?.name ||
  //         formData.IncomeDetailsAttachment ||
  //         "",
  //     };

  //     const response = await fetchPostData("User/Update_User", payload);
  //     if (!response) {
  //       showError("Something went wrong!");
  //       return;
  //     }

  //     showSuccess("Application Updated successfully!");
  //     setTimeout(() => navigate("/"), 1000);
  //   } catch {
  //     showError("Error submitting form. Please try again!");
  //   }
  // };

  const onBack = () => {
    navigate("/dd-details");
  }

  return (
    <div className="container px-0 ">
      {/* Header */}
      <div className="bg-secondary text-white text-center py-2 fw-semibold">
        Fill Income Details
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="border p-4 bg-white shadow-sm">
        <div className="row mb-2">

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label fw-semibold mb-1"> "Category Applied for <span className="text-danger">*</span></label>
            <Select name="Category"
              value={selectValue(category, 'CategoryID', formData.Category, 'plot_range')}
              onChange={(event) => onChangeDropdown(event, setFormData, formData, "Category")}
              options={ChangeArrayFormat(category, 'CategoryID', 'plot_range')}
              placeholder="Select Category"
              isClearable
              classNamePrefix="select"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "38px",
                  height: "38px",
                }),
              }} />
          </div>

          {/* Annual Income */}
          <div className="col-md-6">
            <label className="form-label fw-semibold mb-1">Annual Income<span className="text-danger">*</span></label>
            {/* <Select className="basic-single" classNamePrefix="select" placeholder="Select Annual Income" name="income"
              value={selectValue(income, 'AnnualIncomeID', formData.AnnualIncome, 'Description')}
              onChange={(event) => onChangeDropdown(event, setFormData, formData, "AnnualIncome")}
              options={ChangeArrayFormat(income, 'AnnualIncomeID', 'Description')}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "38px",
                  height: "38px",
                }),
              }}
            /> */}

            <input type="number" className="form-control" autoComplete="off" placeholder="Enter Annual Income " value={formData.AnnualIncome} onChange={(e) => setFormData({ ...formData, AnnualIncome: e.target.value })} />
          </div>
        </div>

        {/* IncomeDetailsAttachment */}
        <div className="col-md-4">
          <label className="form-label fw-semibold">Payment Attachment</label>
          <input type="file" autoComplete="off" className="form-control" accept=".jpg, .jpeg, .png, .pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              // console.log(file);
              if (file) {
                setFormData({ ...formData, IncomeDetailsAttachment: file })
                setFileObject(file);
                setIsIncomeDetAttac(true);
              }
            }} />
          {
            formData.IncomeDetailsAttachment && (
              <span>
                Uploaded file: <span>{formData.IncomeDetailsAttachment?.name || formData.IncomeDetailsAttachment}</span>
              </span>
            )
          }
        </div>

        {/* Project Name */}
        <div className="row my-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold mb-1">
              Project Name <span className="text-danger">*</span>
            </label>
            <div className="form-check">
              <input className="form-check-input" type="radio" id="project1" name="project" value="Infiniti Homes"
                checked={formData.ProjectName === "Infiniti Homes"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ProjectName: e.target.value,
                  })
                }
                defaultChecked
              />
              <label className="form-check-label" htmlFor="project1">
                {projName}
              </label>
            </div>
          </div>

        </div>

        {/* Terms Checkbox */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="termsCheck" checked={isTermsAgreed}
                onChange={(e) => {
                  const requiredFields = ["Category", "AnnualIncome", "ProjectName"];
                  const isAnyFieldMissing = requiredFields.some(
                    (field) =>
                      !formData[field] ||
                      formData[field].toString().trim() === ""
                  );
                  if (isAnyFieldMissing) {
                    showError("Please fill all mandatory Fields");
                    return;
                  }
                  const isChecked = e.target.checked;
                  setIsTermsAgreed(isChecked);
                  if (isChecked) {
                    setShowTermsModal(true);
                  }
                }}
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I HAVE ACKNOWLEDGED AND AGREE THAT I HAVE READ AND UNDERSTOOD
                THE TERM AND CONDITION.
              </label>
            </div>
          </div>
        </div>

        {/* Terms-Modal */}
        <TermsModal show={showTermsModal} onClose={() => setShowTermsModal(false)} onAgree={userID ? updateFormData : insertFormData} />

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button type="button" className="btn btn-secondary px-4" onClick={onBack}>
            {" "} Back{" "}
          </button>
        </div>

        <div className="note-texts mt-3">
          <strong>Note : -</strong>
          <ol className="mt-2">
            <li>
              मेरे द्वारा आवेदन की समस्त शर्तों को पढ़, सुन, सोच समझ लिया है एवं इससे मैं इससे सहमत हूँ।
            </li>
            <li>
              इस लॉटरी प्रक्रिया के सम्बन्ध में समस्त अधिकार विकासकर्ता के पास सुरक्षित है एवं आवेदक का आवेदन नियम व शर्तों के अधीन है।
            </li>
            <li>
              लॉटरी के सम्बन्ध में किसी भी प्रकार की विसंगति के सम्बन्ध में विकासकर्ता/स्थानीय निकाय का निर्णय अन्तिम होगा।
            </li>
            <li>
              आवेदक द्वारा आवेदन सफल होने से उक्त योजना की आवंटन/लॉटरी के सफल और असफल होने से किसी भी प्रकार के अधिकार सृजित नहीं होंगे जो नियमों से अन्यथा हो।
            </li>
            <li>
              किसी भी अवांछनीय स्थिति में लॉटरी की तिथि में परिवर्तन होने की सूचना वेबसाइट के माध्यम से प्रकाशित की जायेगी।
            </li>
          </ol>
        </div>


      </form>
    </div>
  );
};

export default IncomeDetails;