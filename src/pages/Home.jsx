import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeSvg from "../components/HomeSvg";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container my-5 text-center">
      {/* Images Section */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <HomeSvg />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
        <button className="btn" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500",}}>
          Scheme Term & Conditions Booklet
        </button>
        <button className="btn" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500" }}>
          Payment Scanner
        </button>
      </div>

      {/* Checkbox Section */}
      <div className="text-center mt-4">
        <div className="d-flex justify-content-center align-items-center">
          <input type="checkbox" id="agree" className="me-2" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
          <label htmlFor="agree" className="text-muted small">
            I HAVE ACKNOWLEDGED AND AGREE THAT I HAVE READ AND UNDERSTOOD THE TERM
            AND CONDITION.
          </label>
        </div>

        {isChecked && (
          <button className="btn mt-3" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500",}} onClick={() => navigate('/apply')}>
            Click Here To Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;


