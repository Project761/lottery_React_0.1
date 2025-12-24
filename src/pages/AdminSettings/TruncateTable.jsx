import { useState } from "react";
import Select from "react-select";

export default function TruncateTable() {
    const [selectedTable, setSelectedTable] = useState(null);

    const tableOptions = [
        { value: "users", label: "Users" },
        { value: "roles", label: "Roles" },
        { value: "projects", label: "Projects" },
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

                    <button className="btn btn-success btn-sm">
                        TRUNCATE
                    </button>
                </div>

            </div>
        </div>
    );
}
