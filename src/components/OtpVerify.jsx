import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { showError, showSuccess } from "../utils/toast";
import { fetchPostData } from "../components/hooks/Api";

const OtpVerify = ({ onVerify, MobileNumber, isSubmitting }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Send OTP API
  const handleResendOtp = async () => {
    try {
      setIsSendingOtp(true);
      const response = await fetchPostData("SMS/SendMessage", { MobileNo: MobileNumber });
      if (response) {
        showSuccess(`OTP resent successfully to ${MobileNumber}`);
        setTimer(60); // 30 seconds countdown
        setIsTimerRunning(true);
      } else {
        showError("Failed to resend OTP. Please try again.");
      }
    } catch {
      showError("Error while resending OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  //OTP Verify
  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      showError("Please enter a valid 6-digit OTP");
      return;
    }
    await onVerify(otp);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="p-4 rounded shadow-sm bg-white w-100" style={{ maxWidth: "500px" }}>
        <h5 className="fw-bold mb-1">Verify Your OTP</h5>
        <p className="text-muted small mb-4">
          Enter the OTP sent to your mobile number ({MobileNumber})
        </p>

        <form>
          <input
            type="text"
            className="form-control mb-3 text-center"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            maxLength={6}
            required
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-100"
            onClick={handleVerify}
            style={{
              backgroundColor: "#A992F7",
              color: "white",
              fontWeight: "500",
              padding: "10px 0",
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="text-center mt-3">
          {isTimerRunning ? (
            <p className="text-muted mb-0">You can resend OTP in <b>{timer}</b> seconds</p>
          ) : (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <p style={{margin: "0 5px 0 0"}}>Didn't receive the OTP? </p>
            <button
              className="btn btn-link p-0"
              onClick={handleResendOtp}
              disabled={isSendingOtp}
            >
              {isSendingOtp ? "Sending..." : "Resend OTP"}
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
