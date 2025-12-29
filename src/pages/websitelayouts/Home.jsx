import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/FormDataContext.jsx";
import HomeSvg from "../../components/website/HomeSvg.jsx";
import { fetchPostData } from "../../components/hooks/Api.js";
import FileSaver from "file-saver";
// var FileSaver = require('file-saver');

const Home = () => {

  const companyId = localStorage.getItem("companyID") || 1;
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { resetFormData } = useFormData();
  const [allowRegister, setAllowRegister] = useState(false);
  const [buttonId, setButtonId] = useState(0);
  const [images, setImages] = useState([]);
  const [buttonArray, setButtonArray] = useState([]);


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
    setButtonArray(response);
    console.log("🚀 ~ getPaperImage ~ response:", response)
  }

  // Get Insert-button
  const getInsertButton = async () => {
    try {
      const resp = await fetchPostData("Button/GETALL_BUTTON", {
        "CompanyID": localStorage.getItem("companyID") || 1
      });
      // console.log("🚀"+ resp[0].FromStartDtTm);
      // console.log("Hello");
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

  // download file
  const handleDownload_File = async (fileUrl, FileName) => {
    console.log("🚀 ~ handleDownload_File ~ fileUrl:", fileUrl)
    console.log("🚀 ~ handleDownload_File ~ fileUrl:", FileName)
    try {

      const originalUrl = fileUrl;
      const lastSlashIndex = fileUrl?.lastIndexOf('/');
      // const updatedUrl = replaceDomain(originalUrl);

      FileSaver.saveAs(fileUrl, FileName);

    } catch (error) {
      console.log("🚀 ~ downloadFile ~ error:", error);
    }
  };



  // const handleDownload_File = (url) => {
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = url.split('/').pop();
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };


  // const handleDownload_File = async (url) => {
  //   try {
  //     // Fetch the file as a blob (works even with external URLs if CORS allows)
  //     const response = await fetch(url, { mode: 'cors' });
  //     if (!response.ok) throw new Error('File download failed');

  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);

  //     // Create an anchor element for download
  //     const link = document.createElement('a');
  //     link.href = blobUrl;
  //     link.download = url.split('/').pop() || 'downloaded_file';
  //     document.body.appendChild(link);
  //     link.click();

  //     // Clean up resources
  //     window.URL.revokeObjectURL(blobUrl);
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading file:', error);
  //     alert('Failed to download the file. Please try again.');

  //   }
  // };

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
            <button className="btn" onClick={() => handleDownload_File(item?.FilePath, item?.ButtonDetails)} style={{ backgroundColor: "#A992F7", color: "white", padding: "10px 20px", fontWeight: "500", display: "block", margin: "0 auto" }}>
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
              {/* I HAVE ACKNOWLEDGED AND AGREE THAT I HAVE READ AND UNDERSTOOD THE TERM
              AND CONDITION. */}
              I acknowledge and agree that I have read and understood the terms and conditions.
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


