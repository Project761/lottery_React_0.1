import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


export default function AdminInfo() {

    const CompanyID = localStorage.getItem('companyID') ?? 1

    const [value, setValue] = useState({
        "UserID": localStorage.getItem('AdminUserID') || 1,
        'UserName': '',
        'EmailID': '',
        'Password': '',

        // not in use
        'MobileNo': '',
        'IsSuperAdmin': '',
        'ModifiedByUser': '',
        'UserID': '',
    });


    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("AppUser/GetSingleData_AppUser", {
            "UserID": localStorage.getItem('AdminUserID') || 1,
            // "CompanyID": localStorage.getItem('companyID') || 1,
        });
        if (response?.length > 0) {
            setValue({
                ...value,
                'UserName': response[0]?.UserName,
                'EmailID': response[0]?.EmailID,
                'Password': response[0]?.Password,

                'MobileNo': '',
                'IsSuperAdmin': '',
                'ModifiedByUser': '',
                'UserID': response[0]?.UserID,
            })
        } else {

        }
        // console.log("🚀 ~ getPaperImage ~ response:", response);
    }


    const handleSave = async () => {
        // console.log(value);

        let error = false;

        if (!value?.UserName) {
            toast.error(`ButtonDetail is required`);
            error = true;
        }

        if (!value?.EmailID) {
            toast.error(`TextColor is required`);
            error = true;
        }

        if (!value?.Password) {
            toast.error(`TextColor is required`);
            error = true;
        }

        if (error) {
            return;
        }

        const { UserName, EmailID, Password } = value

        const val = {
            // "CompanyID": localStorage.getItem('companyID') || 1,
            "UserID": localStorage.getItem('AdminUserID') || 1,
            'UserName': UserName,
            'EmailID': EmailID,
            'Password': Password,

            'MobileNo': '',
            'IsSuperAdmin': '',
            'ModifiedByUser': '',

        }
        // console.log("🚀 ~ handleSave ~ val:", val)
        AddDeleteUpdateData('AppUser/Update_AppUser', val).then((response) => {
            // console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
        })
    };

    const resetObject = () => {
        setValue({
            ...value,
            'ButtonDetail': '',
        })
    }


    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Change Admin Information
                </div>

                <hr className="my-2" />

                {/* Form Row */}
                <div className="row g-2 align-items-end">

                    {/* Username */}
                    <div className="col-md-4">
                        <label className="small text-muted mb-1">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Enter the Username"
                            name="UserName"
                            value={value?.UserName}
                            onChange={(e) => { setValue({ ...value, 'UserName': e.target.value }) }}

                        />
                    </div>

                    {/* Email */}
                    <div className="col-md-4">
                        <label className="small text-muted mb-1">Email</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Enter the Email"
                            name="EmailID"
                            value={value?.EmailID}
                            onChange={(e) => { setValue({ ...value, 'EmailID': e.target.value }) }}
                        />
                    </div>

                    {/* Password */}
                    <div className="col-md-4">
                        <label className="small text-muted mb-1">Password</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Enter the Password"
                            name="Password"
                            value={value?.Password}
                            onChange={(e) => { setValue({ ...value, 'Password': e.target.value }) }}
                        />
                    </div>

                </div>

                {/* Button */}
                <div className="mt-2">
                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                        UPDATE
                    </button>
                </div>

            </div>
        </div>
    );
}
