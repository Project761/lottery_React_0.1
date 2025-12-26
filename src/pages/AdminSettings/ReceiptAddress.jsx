import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


export default function ReceiptAddress() {

    // Company/Update_Company
    // CompanyID
    // Address

    const CompanyID = localStorage.getItem('companyID') ?? 1
    const [Address, setAddress] = useState("");

    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("Company/GetSingleData_Company", {
            "CompanyID": localStorage.getItem('companyID') || 1,
        });
        // console.log("🚀 ~ getPaperImage ~ response:", response);
        if (response?.length > 0) {
            setAddress(response[0]?.Address);

        } else {
            setAddress('');
        }
    }

    const UpdateContactInfo = (e) => {
        let error = false;  

        if (!Address) {
            toast.error(`Address is required`);
            error = true;
        }

        if (error) {
            return;
        }
        const val = {
            'Address': Address,
            'CompanyID': localStorage.getItem('companyID') || 1,
        }
        AddDeleteUpdateData('Company/Update_Company', val).then((response) => {
            // console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
        })
    }



    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Update Receipt Address
                </div>

                <hr className="my-2" />

                {/* Textarea */}
                <textarea
                    className="form-control mb-2"
                    placeholder=""
                    rows={3}
                    name="ButtonDetail"
                    value={Address}
                    onChange={(e) => { setAddress(e.target.value) }}
                />

                {/* Button */}
                <button className="btn btn-success btn-sm" onClick={UpdateContactInfo}>
                    UPDATE
                </button>

            </div>
        </div>
    );
}
