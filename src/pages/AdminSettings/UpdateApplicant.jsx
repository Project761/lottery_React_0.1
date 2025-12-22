import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


export default function UpdateApplicant() {

    // api/Button/Update_RegColumn
    // CompanyID
    // ApplicantNumber
    // ColumnName
    // ColumnValue

    // Dropdown api cloumn name
    // api/Button/RegColumn
    // CompanyID


    const CompanyID = localStorage.getItem('companyID') ?? 1

    const [columnName, setColumnName] = useState([])
    const [value, setValue] = useState({
        'CompanyID': localStorage.getItem('companyID') ?? 1,
        'ApplicantNumber': '',
        'ColumnName': '',
        'ColumnValue': '',
    });

    useEffect(() => {
        getColumnNameDrp();
    }, [CompanyID]);

    const getColumnNameDrp = async () => {
        const response = await fetchPostData("Button/RegColumn", {
            "CompanyID": localStorage.getItem('companyID') ?? 1
        });
        setColumnName(response)
        console.log("🚀 ~ getPaperImage ~ response:", response);
    }

    const handleSave = async () => {
        console.log(value);

        let error = false;

        if (!value?.ApplicantNumber) {
            toast.error(`ButtonDetail is required`);
            error = true;
        }

        if (!value?.ColumnName) {
            toast.error(`TextColor is required`);
            error = true;
        }

        if (!value?.ColumnValue) {
            toast.error(`TextColor is required`);
            error = true;
        }

        if (error) {
            return;
        }

        const { ApplicantNumber, ColumnName, ColumnValue } = value

        const val = {
            'CompanyID': localStorage.getItem('companyID') ?? 1,
            'ApplicantNumber': ApplicantNumber,
            'ColumnName': ColumnName,
            'ColumnValue': ColumnValue,
        }
        console.log("🚀 ~ handleSave ~ val:", val)
        AddDeleteUpdateData('AppUser/Update_AppUser', val).then((response) => {
            console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
        })
    };

    const handleChangeColumnName = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        setValue({ ...value, 'ButtonDetail': e.target.value, })
    }

    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Truncate Table
                </div>

                <hr className="my-2" />

                {/* Form Row */}
                <div className="d-flex align-items-center gap-2 flex-wrap">

                    {/* Applicant Number */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="-- APPLICANT NUMBER --"
                        style={{ maxWidth: 250 }}
                        name="ApplicantNumber"
                        value={value?.ApplicantNumber}
                        onChange={(e) => { setValue({ ...value, 'ApplicantNumber': e.target.value }) }}
                    />

                    {/* Select Column */}
                    <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: 300 }}
                        name="columnName"
                        onChange={handleChangeColumnName}
                    >
                        {
                            columnName?.map((item) => {
                                return <>
                                    <option value={item?.ColumnName}>{item?.ColumnName}</option>
                                </>
                            })
                        }
                        {/* <option>-- SELECT COLUMN --</option>
                        <option value="reg_id">reg_id</option>
                        <option value="profile_photo">profile_photo</option>
                        <option value="full_name">full_name</option> */}
                    </select>

                    {/* What you update */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="-- WHAT YOU UPDATE --"
                        style={{ maxWidth: 250 }}
                        name="ColumnValue"
                        value={value?.ColumnValue}
                        onChange={(e) => { setValue({ ...value, 'ColumnValue': e.target.value }) }}
                    />

                    {/* Button */}
                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                        UPDATE
                    </button>

                </div>
            </div>
        </div>
    );
}
