import { useState } from "react";
import Select from "react-select";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import { AddDeleteUpdateData } from "../../components/hooks/Api";


export default function TruncateTable() {

    // Button/TruncateTable
    // CompanyID
    // TableName
    const CompanyID = localStorage.getItem('companyID') ?? 1
    const [selectedTable, setSelectedTable] = useState(null);

    const handleCheckBox = async () => {
        const val = {
            'CompanyID': CompanyID,
            'TableName': selectedTable?.value,
        }
        console.log("🚀 ~ handleCheckBox ~ val:", val)
        await AddDeleteUpdateData('Button/TruncateTable', val).then((response) => {
            console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
        });
        setSelectedTable('')
    }

    const tableOptions = [
        { value: "User", label: "User" },
        { value: "AppRegPermission", label: "AppRegPermission" },
        { value: "Button", label: "Button" },
        { value: "Project", label: "Project" },
        { value: "Plot", label: "Plot" },
        { value: "Bank", label: "Bank" },
    ];

    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Truncate Table
                </div>

                <hr className="my-2" />

                {/* Controls */}
                <div className="d-flex align-items-center gap-2">
                    <Select
                        options={tableOptions}
                        value={selectedTable}
                        onChange={setSelectedTable}
                        placeholder="-- SELECT TABLE --"
                        isClearable
                        classNamePrefix="react-select"
                        styles={{
                            container: (base) => ({ ...base, maxWidth: 220, fontSize: "13px", }),
                            control: (base) => ({ ...base, minHeight: "30px", height: "30px", }),
                            valueContainer: (base) => ({ ...base, padding: "0 8px", }),
                            indicatorsContainer: (base) => ({ ...base, height: "30px", }),
                        }}
                    />

                    <button onClick={handleCheckBox} className="btn btn-success btn-sm">
                        TRUNCATE
                    </button>
                </div>

            </div>
        </div>
    );
}
