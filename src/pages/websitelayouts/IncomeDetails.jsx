import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../../components/website/TermsModal.jsx";
import Select from "../../../node_modules/react-select/dist/react-select.esm.js";
import { fetchPostData } from "../../components/hooks/Api.js";
import { showError, showSuccess } from "../../utils/toast.js";
import { useFormData } from "../../context/FormDataContext.jsx";
import { ChangeArrayFormat, onChangeDropdown, selectValue } from "../../utils/Comman.js";


const IncomeDetails = () => {
  const navigate = useNavigate();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [category, setcategory] = useState([]);
  const [income, setIncome] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const { formData, setFormData } = useFormData();
  useEffect(() => {
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [formData]);
  // setFormData({...formData, Country: 'INDIA', CompanyID: 1});

  //---------------------- Dropdowns -----------------------
  const fetchCategory = async () => {
    try {
      const response = await fetchPostData(
        "Category/GetDataDropDown_Category",
        {
          // CompanyId: Number(localStorage.getItem('companyID')),
          CompanyID: 1,
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
          CompanyID: 1,
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

  useEffect(() => {
    fetchCategory();
    fetchAnnualIncome();
  }, []);

  const userID = localStorage.getItem("UserID");
  const insertFormData = async () => {
    try {
      const response = await fetchPostData("User/Insert_User", formData);
      // console.log(response[0].ApplicantNumber);
      localStorage.setItem("ApplicantNumber", response[0].ApplicantNumber);

      if (response) {
        showSuccess("Application submitted successfully!");

        localStorage.removeItem("applicationFormData");
        setFormData({});

        setTimeout(() => navigate("/thank-you"), 1000);
      } else {
        showError(
          response?.Message || "Something went wrong while submitting!"
        );
      }
    } catch (error) {
      showError("Error submitting form. Please try again!");
      // console.error("Submit Error:", error);
    }
  };

  const updateFormData = async () => {
    try {
      const response = await fetchPostData("User/Update_User", formData);
      // console.log(response[0].ApplicantNumber);
      // localStorage.setItem('ApplicantNumber', response[0].ApplicantNumber);

      if (response) {
        showSuccess("Application Updated successfully!");

        localStorage.removeItem("applicationFormData");
        localStorage.removeItem("UserId");
        localStorage.removeItem("sameAddress");
        setFormData({});

        setTimeout(() => navigate("/"), 1000);
      } else {
        showError(
          response?.Message || "Something went wrong while submitting!"
        );
      }
    } catch (error) {
      showError("Error submitting form. Please try again!");
      // console.error("Submit Error:", error);
    }
  };

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
            <label className="form-label fw-semibold mb-1"> Select Category <span className="text-danger">*</span></label>
            <Select name="Category"
              value={selectValue(category, 'CategoryID', formData.Category, 'Description')}
              onChange={(event) => onChangeDropdown(event, setFormData, formData, "Category")}
              options={ChangeArrayFormat(category, 'CategoryID', 'Description')}
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
            <Select className="basic-single" classNamePrefix="select" placeholder="Select Annual Income" name="income"
              // value={ income.find((i) => String(i.AnnualIncomeID) === String(formData.AnnualIncome)) ? 
              //   {
              //     value: String(formData.AnnualIncome),
              //     label: income.find((i) => String(i.AnnualIncomeID) === String(formData.AnnualIncome))?.Description 
              //   } : null
              // }
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
            />
          </div>
        </div>

        {/* Project Name */}
        <div className="row my-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold mb-1">
              Project Name <span className="text-danger">*</span>
            </label>
            <div className="form-check">
              <input className="form-check-input" type="radio" id="project1" name="project" value="SERENITY RESIDENCY"
                checked={formData.ProjectName === "SERENITY RESIDENCY"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ProjectName: e.target.value,
                  })
                }
                defaultChecked
              />
              <label className="form-check-label" htmlFor="project1">
                SERENITY RESIDENCY
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
      </form>
    </div>
  );
};

{/* <Select className="basic-single" classNamePrefix="select" placeholder="Select Annual Income" name="income"
              value={ income.find((i) => String(i.AnnualIncomeID) === String(formData.AnnualIncome)) ? 
                {
                  value: String(formData.AnnualIncome),
                  label: income.find((i) => String(i.AnnualIncomeID) === String(formData.AnnualIncome))?.Description 
                } : null
              }
              onChange={(event) => onChangeDropdown(event, setFormData, formData, "AnnualIncome")}
              options={income.map((i) => ({
                value: i.AnnualIncomeID,
                label: i.Description
              }))}
              isSearchable={false}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "38px",
                  height: "38px",
                }),
              }}
/> */}

export default IncomeDetails;
