import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import { fetchDirectData } from "../components/hooks/Api";

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [applicant, setApplicant] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile.trim() || !applicant.trim()) {
      showError("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        MobileNumber: mobile,
        ApplicantNumber: applicant,
        grant_type: "password",
      };

      const response = await fetchDirectData("User/Login", payload);
      localStorage.setItem("UserID", response.UserID);
      // console.log(response);

      if ( response.error_description === "User Not Found") {
        showError("User not found. Please check your details.");
        return;
      }

      if (response) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);
        localStorage.setItem("token_expiry", response.expires);

        showSuccess("Login Successful!");

        // Schedule auto token refresh 1 minute before expiry
        const expiryTime = new Date(response.expires).getTime();
        const now = new Date().getTime();
        const timeUntilExpiry = expiryTime - now - 60 * 1000; 

        if (timeUntilExpiry > 0) {
          setTimeout(async () => {
            const { refreshAccessToken } = await import("../utils/auth");
            await refreshAccessToken();
          }, timeUntilExpiry);
        }

        navigate("/apply");
      } else {
        showError("Login failed. Please try again.");
      }
    } catch (err) {
      showError("Network error, please try again later.");
      // console.error("Login error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-white text-center py-3">
              <h4 className="mb-0 fw-bold" style={{ color: "#333" }}>EWS-LIG</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                  {/* Mobile-No */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="Enter Mobile Number" value={mobile} autoComplete="off" onChange={(e) => setMobile(e.target.value)} />
                  </div>

                  {/* Applicant-No */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Applicant Number <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" placeholder="Enter Applicant Number" value={applicant} autoComplete="off" onChange={(e) => setApplicant(e.target.value)} />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button
                    type="submit"
                    className="btn text-white fw-semibold py-2 px-4"
                    style={{
                      backgroundColor: "#A992F7",
                      fontSize: "16px",
                      width: "auto",
                      minWidth: "100px",
                    }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
