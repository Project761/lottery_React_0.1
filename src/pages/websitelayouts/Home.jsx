import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataContext.jsx";
import HomeSvg from "../../components/website/HomeSvg.jsx";
import { fetchPostData } from "../../components/hooks/Api.js";

const Home = () => {

  const companyId = localStorage.getItem("companyID") || 1;
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { resetFormData } = useFormData();
  const [allowRegister, setAllowRegister] = useState(false);
  const [buttonId, setButtonId] = useState(0);
  const [images, setImages] = useState([]);
  const [buttonArray, setButtonArray] = useState([])


  useEffect(() => {
    resetFormData();
  }, []);

  useEffect(() => {
    getInsertButton();
    getHomeImage();
    getPaperImage();
  }, [companyId]);

  const getPaperImage = async () => {
    const response = await fetchPostData("ButtonDetails/GETALL_ButtonDetails", {
      "IsActive": true,
      "ButtonType": "BUTTON CHANGE",
      "CompanyID": localStorage.getItem('companyID') || 1,
    });
    setButtonArray(response)
    // console.log("🚀 ~ getPaperImage ~ response:", response)
  }

  // Get Insert-button
  const getInsertButton = async () => {
    try {
      const resp = await fetchPostData("Button/GETALL_BUTTON", {
        "CompanyID": localStorage.getItem("companyID") || 1
      });

      if (resp?.length) {
        setAllowRegister(resp[0]?.AppRegPermission);
        setButtonId(resp[0]?.ButtonID);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getHomeImage = async () => {
    try {
      const response = await fetchPostData("ButtonDetails/GETALL_ButtonDetails", {
        "IsActive": true,
        "ButtonType": "PAPER CUT IMAGE",
        "CompanyID": localStorage.getItem('companyID') || 1,
      });
      setImages(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container text-center">
      {/* Images Section */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* <HomeSvg images={images.slice(0, 2)} /> */}
          <HomeSvg images={images} />
        </div>
      </div>

      {/* Buttons Section */}
      <div className="row justify-content-center flex-column" style={{ gap: "8px" }}>
        {buttonArray?.map((item) => (
          <div className="col-md-auto">
            <button className="btn" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500", display: "block", margin: "0 auto" }}>
              {item?.ButtonDetails}
            </button>
          </div>
        ))}
        {/* <button className="btn" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500", }}>
          Scheme Term & Conditions Booklet
        </button>
        <button className="btn" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500" }}>
          Payment Scanner
        </button> */}
      </div>

      {/* Checkbox Section */}

      {allowRegister ? (
        <div className="text-center mt-4">
          <div className="d-flex justify-content-center align-items-center">
            <input type="checkbox" id="agree" className="me-2" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <label htmlFor="agree" className="text-muted small">
              I HAVE ACKNOWLEDGED AND AGREE THAT I HAVE READ AND UNDERSTOOD THE TERM
              AND CONDITION.
            </label>
          </div>

          {isChecked && (
            <button className="btn mt-3" style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500", }} onClick={() => navigate('/apply')}>
              Click Here To Apply
            </button>
          )}
        </div>
      ) : (
        <div className="text-center mt-4">
          <h6 className="text-danger">Applicant Registration Closed !!</h6>
        </div>
      )}
    </div>
  );
};

export default Home;


