import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


export default function ApplicantPermission() {

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
        });
        if (response?.length) {
            setIsAllowRegister(response[0]?.AppRegPermission);
            setButtonId(response[0]?.ButtonID)
        }
        console.log("🚀 ~ getPaperImage ~ response:", response);
    }

    const handleCheckBox = (e) => {
        // console.log(e.target.checked);
        e.preventDefault();
        setIsAllowRegister(e.target.checked);
        const val = {
            'AppRegPermission': e.target.checked,
            'ButtonID': buttonId,
        }
        AddDeleteUpdateData('Button/Update_Button', val).then((response) => {
            console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
            // const parseData = JSON.parse(response?.data);
            // console.log("🚀 ~ handleCheckBox ~ parseData:", parseData?.Table[0]?.Message);

        })
    }

 

    return (
        <div className="card border">
            <div
                className="card-body d-flex align-items-center"
                style={{ padding: "8px 12px", gap: "8px" }}   // slim height
            >
                {/* Title */}
                <span className="fw-normal text-dark">
                    Applicant Register Permission :-
                </span>

                {/* Checkbox */}
                <input
                    type="checkbox"
                    className="form-check-input m-0"
                    style={{ cursor: "pointer" }}
                    name='AppRegPermission'
                    value={isAllowRegister}
                    checked={isAllowRegister}
                    onChange={handleCheckBox}
                    id="flexCheckDefault1"
                />
            </div>
        </div>
    );
}
//In this on first time when I click on checkbox so our page reloaded & our session got out Applicant Register Permission :-