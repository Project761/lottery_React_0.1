import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


export default function IsOtpVerified() {

    // api/Button/Update_Button
    // AppRegPermission
    // ButtonID

    // api/Button/GETALL_BUTTON
    // CompanyID

    const CompanyID = localStorage.getItem('companyID') ?? 1
    const [isAllowRegister, setIsAllowRegister] = useState(false);
    const [buttonId, setButtonId] = useState('')

    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("Button/GETALL_BUTTON", {
            "CompanyID": localStorage.getItem('companyID') || 1,
            "ButtonType": 'Is Otp Verified'
        });
        if (response?.length) {
            setIsAllowRegister(response[0]?.AppRegPermission);
            setButtonId(response[0]?.ButtonID);
        }
        // console.log("🚀 ~ getPaperImage ~ response:", response);
    }

    const handleCheckBox = async (e) => {
        // e.preventDefault();
        try {
            setIsAllowRegister(e.target.checked);
            const val = {
                'AppRegPermission': e.target.checked,
                'ButtonID': buttonId,
                "ButtonType": 'Is Otp Verified'
            }
            const response = await AddDeleteUpdateData('Button/Update_Button', val);
            if (response?.success) {
                showSuccess("Update Successfully");
                getPaperImage();
            }
        } catch (error) {
            // Handle 401 specifically
            if (error.response?.status === 401) {
                showError("Session expired. Please login again.");
                // Redirect to login gracefully
                // setTimeout(() => window.location.href = "/admin/login", 1000);
            }
            // Revert state on error
            // setIsAllowRegister(!e.target.checked);
        }
    }



    return (
        <div className="card border">
            <div
                className="card-body d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}   // slim height
            >
                {/* Title */}
                <span className="fw-normal text-dark">
                    Is Otp Verified  :-
                </span>

                {/* Checkbox */}
                <input
                    type="checkbox"
                    className="form-check-input m-0"
                    style={{ cursor: "pointer" }}
                    name='IsOtpVerified'
                    value={isAllowRegister}
                    checked={isAllowRegister}
                    onChange={(e) => handleCheckBox(e)}
                    id="flexCheckDefault1"
                />
            </div>
        </div>
    );
}
