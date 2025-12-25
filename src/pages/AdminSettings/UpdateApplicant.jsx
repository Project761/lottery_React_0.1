import { useEffect, useState } from "react";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import Select from "react-select";


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
    const [selectedColumn, setSelectedColumn] = useState("");
    const [columnName, setColumnName] = useState([]);

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

        setColumnName(convertToValueLabel(response));
        console.log("🚀 ~ getColumnNameDrp ~ convertToValueLabel(response):", convertToValueLabel(response))
    }

    const handleSave = async () => {
        // console.log(value);

        let error = false;

        if (!value?.ApplicantNumber) {
            toast.error(`ApplicantNumber is required`);
            error = true;
        }

        if (!value?.ColumnName) {
            toast.error(`ColumnName is required`);
            error = true;
        }

        if (!value?.ColumnValue) {
            toast.error(`ColumnValue is required`);
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

        AddDeleteUpdateData('Button/Update_RegColumn', val).then((response) => {
            // console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully");
                Reset()
            }
        })
    };

    const handleChangeColumnName = (e) => {
        if (e) {
            setValue({ ...value, ['ColumnName']: e?.value, })

        } else {
            setValue({ ...value, ['ColumnName']: null, })

        }
    }

    const Reset = (e) => {
        setValue({
            ...value,
            'ApplicantNumber': '',
            'ColumnName': '',
            'ColumnValue': '',
        })
    }

    function convertToValueLabel(arr) {
        return arr?.map(item => ({
            value: item.ColumnName,
            label: item.ColumnName
        }));
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
                    <Select
                        options={columnName}
                        name="columnName"
                        value={columnName?.filter((obj) => obj?.value === value?.ColumnName) || null}
                        onChange={handleChangeColumnName}
                        placeholder="Select Column"
                        classNamePrefix="react-select"
                        menuPlacement="auto"
                        menuPosition="fixed"
                        isClearable
                        styles={{
                            container: (base) => ({ ...base, maxWidth: 300, width: 300 }),

                            control: (base) => ({
                                ...base,
                                minHeight: "32px",
                                height: "32px",
                                fontSize: "13px",
                            }),

                            valueContainer: (base) => ({ ...base, padding: "0 8px" }),
                            indicatorsContainer: (base) => ({ ...base, height: "32px" }),

                            menu: (base) => ({ ...base, zIndex: 9999 }),
                            menuList: (base) => ({ ...base, maxHeight: "180px", overflowY: "auto" }),

                            // ✅ ADD THESE (text visible)
                            option: (base, state) => ({
                                ...base,
                                color: "#000",
                                backgroundColor: state.isFocused ? "#e9f2ff" : "#fff",
                            }),
                            singleValue: (base) => ({ ...base, color: "#000" }),
                            placeholder: (base) => ({ ...base, color: "#6c757d" }),
                        }}
                    />

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
