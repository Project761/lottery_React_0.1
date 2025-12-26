import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import { showSuccess, showError } from "../../utils/toast";

export default function Logo() {

    const CompanyID = localStorage.getItem("companyID") || 1;
    const [logo, setLogo] = useState("");

    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        try {
            const response = await fetchPostData("Company/GetSingleData_Company", { CompanyID });
            // console.log("🚀 ~ getPaperImage ~ response:", response);

            if (response?.length > 0) {
                setLogo(response[0]?.Logo || "");
            } else {
                setLogo("");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const UpdateContactInfo = () => {
        if (!logo.trim()) {
            showError("Address is required");
            return;
        }
        const payload = {
            'Logo': logo,
            'CompanyID': localStorage.getItem('companyID') || 1,
        };
        AddDeleteUpdateData("Company/Update_Company", payload).then((response) => {
            if (response?.success) {
                showSuccess("Update Successfully");
                getPaperImage();
            }
        });

    };

    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Change Logo
                </div>

                <hr className="my-2" />

                {/* Input + Button */}
                <div className="d-flex align-items-center gap-2">

                    <input
                        type="text"
                        value={logo}
                        className="form-control form-control-sm"
                        style={{ maxWidth: 300 }}
                        onChange={(e) => setLogo(e.target.value)}
                        placeholder="Enter logo address"
                    />

                    <button
                        className="btn btn-success btn-sm"
                        onClick={UpdateContactInfo}
                    >
                        UPDATE
                    </button>

                </div>
            </div>
        </div>
    );
}
