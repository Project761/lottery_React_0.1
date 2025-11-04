import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TermsModal from "../components/TermsModal";
import Select from "../../node_modules/react-select/dist/react-select.esm.js";
import { fetchPostData } from "../components/hooks/Api.js";
import { showError, showSuccess } from "../utils/toast.js";
import { useFormData } from "../context/FormDataContext.jsx";
import { onChangeDropdown } from "../utils/Comman.js";

const IncomeDetails = ({ onBack }) => {
  const navigate = useNavigate();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsModalData, setTermsModalData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [casts, setCasts] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const {formData, setFormData} = useFormData();
  useEffect(() => {
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [formData]);
    // setFormData({...formData, Country: 'INDIA', CompanyID: 1});

  //---------------------- Dropdowns -----------------------
  const fetchCast = async () => {
    try {
      const response = await fetchPostData("Cast/GetDataDropDown_Cast", {
        // CompanyId: Number(localStorage.getItem('companyID')),
        CompanyID: 1,
      });
      // console.log(response);

      if (response && Array.isArray(response)) {
        setCasts(response);
      } else {
        setCasts([]);
      }
    } catch {
      showError("Error fetching States");
    }
  };

  useEffect(() => {
    fetchCast();
  }, []);

  const userID = localStorage.getItem("UserId");
 const insertFormData = async () => {
  try {
    const response = await fetchPostData('User/Insert_User', formData);
    // console.log(response[0].ApplicantNumber);
    localStorage.setItem('ApplicantNumber', response[0].ApplicantNumber);

    if (response) {
      showSuccess("Application submitted successfully!");
      
      localStorage.removeItem("applicationFormData");
      setFormData({}); 
      
      setTimeout(() => navigate("/thank-you"), 1000);
    } else {
      showError(response?.Message || "Something went wrong while submitting!");
    }
  } catch (error) {
    showError("Error submitting form. Please try again!");
    console.error("Submit Error:", error);
  }
 };

const updateFormData = async (key, value) => {
    try {
    const response = await fetchPostData('User/Update_User', formData);
    // console.log(response[0].ApplicantNumber);
    // localStorage.setItem('ApplicantNumber', response[0].ApplicantNumber);

    if (response) {
      showSuccess("Application Updated successfully!");
      
      localStorage.removeItem("applicationFormData");
      localStorage.removeItem("UserId");
      setFormData({}); 
      
      setTimeout(() => navigate("/"), 1000);
    } else {
      showError(response?.Message || "Something went wrong while submitting!");
    }
  } catch (error) {
    showError("Error submitting form. Please try again!");
    console.error("Submit Error:", error);
  }
}

  const incomeOptions = [
    { value: "below3", label: "Below ₹3 Lakh" },
    { value: "3to6", label: "₹3–₹6 Lakh" },
    { value: "6to10", label: "₹6–₹10 Lakh" },
    { value: "above10", label: "Above ₹10 Lakh" },
  ];

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
            <label className="form-label fw-semibold mb-1">Select Category <span className="text-danger">*</span></label>
            <Select name="Category"
                value={ formData.Category ?
                    {
                        Value: formData.Category,
                        label: casts.find((c) => c.CastID === formData.Category)?.Description || '',
                    } : null
                }
                onChange={(event) => onChangeDropdown(event, setFormData, formData, 'Category')}
                options={casts.map((c) => ({
                  value: c.CastID,
                  label: c.Description,
                }))}
                placeholder="Select Category"
                isClearable
                classNamePrefix="select"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '38px',
                    height: '38px',
                  })
                }}
            />
          </div>

          {/* Annual Income */}
          <div className="col-md-6">
            <label className="form-label">Annual Income<span className="text-danger">*</span></label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select Annual Income"
              name="income"
              options={incomeOptions}
              value={incomeOptions.find(opt => opt.value === formData.AnnualIncome) || null}
              onChange={(selected) => {
                setFormData({...formData, AnnualIncome: selected ? selected.value : ''})
              }}
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

        {/* Terms Checkbox */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                checked={isTermsAgreed}
                onChange={(e) => {
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

        {/* Project Name */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">
              PROJECT NAME <span className="text-danger">*</span>
            </label>
            <div className="form-check">
              <input className="form-check-input" type="radio" id="project1" name="project" value="SERENITY RESIDENCY"   checked={formData.ProjectName === "SERENITY RESIDENCY"}
                onChange={(e) => setFormData({
                  ...formData,
                  ProjectName: e.target.value
                })} defaultChecked/>
              <label className="form-check-label" htmlFor="project1">
                SERENITY RESIDENCY
              </label>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center">
            <div className="form-check">
              <input type="checkbox" id="agree" className="form-check-input me-2" checked={formData.PolicyName === "Yes"}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData({ ...formData, PolicyName: isChecked ? "Yes" : ""})
                  setIsTermsAgreed(isChecked);
                  if (isChecked) {
                    setShowTermsModal(true);
                  }
                }}
              />
              <label htmlFor="agree" className="form-check-label text-muted small">
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
          <button type="button" className="btn btn-secondary px-4" onClick={onBack}> Back </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeDetails;
