import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


export default function WebsiteContact() {

    // api/Company/GetSingleData_Company
    // CompanyID

    // api/Company/Update_CompanyContact
    // ContactNo
    // EmailID
    // CompanyID

    const CompanyID = localStorage.getItem('companyID') ?? 1

    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("Company/GetSingleData_Company", {
            "CompanyID": localStorage.getItem('companyID') || 1,
        });
        console.log("🚀 ~ getPaperImage ~ response:", response);
        if (response?.length > 0) {
            setContact(response[0]?.ContactNo)
            setEmail(response[0]?.EmailID)
        }
    }

    const UpdateContactInfo = (e) => {
        let error = false;

        if (!email) {
            toast.error(`email is required`);
            error = true;
        }

        if (!contact) {
            toast.error(`contact is required`);
            error = true;
        }

        if (error) {
            return;
        }
        const val = {
            'ContactNo': contact,
            'EmailID': email,
            'CompanyID': localStorage.getItem('companyID') || 1,
        }
        AddDeleteUpdateData('Company/Update_CompanyContact', val).then((response) => {
            console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
            // const parseData = JSON.parse(response?.data)
            // console.log("🚀 ~ handleCheckBox ~ parseData:", parseData?.Table[0]?.Message)

        })
    }


    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Update Contact Information
                </div>
                <hr className="my-2" />

                {/* Email Input */}
                <div className="mb-2">
                    <label className="small fw-semibold text-dark mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control form-control-sm"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Contact Input */}
                <div className="mb-3">
                    <label className="small fw-semibold text-dark mb-1">
                        Contact number
                    </label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Enter contact number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button className="btn btn-success btn-sm" onClick={UpdateContactInfo}>
                    UPDATE CONTACT INFO
                </button>

            </div>
        </div>
    );
}
