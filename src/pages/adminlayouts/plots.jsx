import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { showError } from "../../utils/toast";
import { fetchPostData } from "../../components/hooks/Api";
import Select from "react-select";

const Plots = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [projectName, setProjectName] = useState(null);
    const [projectType, setProjectType] = useState(null);

    const CompanyID = Number(localStorage.getItem("companyID") || 1);

    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await fetchPostData("User/GetData_User", {
                CompanyID,
                IsActive: true,
            });

            console.log("response:", response);

            const list =
                Array.isArray(response) ? response :
                    Array.isArray(response?.data) ? response.data :
                        Array.isArray(response?.data?.data) ? response.data.data :
                            Array.isArray(response?.data?.Data) ? response.data.Data :
                                [];

            setApplications(list);
        } catch (error) {
            showError("Failed to fetch applications");
            console.error("Error fetching applications:", error);
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const columns = [
        {
            name: "S.No",
            cell: (_, index) => index + 1,
            width: "80px",
            center: true,
        },
        {
            name: "Project Name",
            selector: (row) => row?.ProjectName ?? "",
            sortable: true,
            wrap: true,
        },
        {
            name: "Project Type",
            selector: (row) => row?.ProjectType ?? "",
            sortable: true,
        },
        {
            name: "Plot SR.No",
            selector: (row) => row?.PlotSRNo || row?.PlotSR?.No || row?.PlotSerialNumber || "",
            sortable: true,
        },
        {
            name: "Plot Size",
            selector: (row) => row?.PlotSize ?? "",
            sortable: true,
        },
        {
            name: "Plot Area",
            selector: (row) => row?.PlotArea ?? "",
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "170px",
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                background: '#0d6efd',
                color: '#fff',
                fontWeight: '600',
                fontSize: '14px',
                position: "sticky",
                top: 0,
                zIndex: 2,
            },
        },
        cells: {
            style: {
                fontSize: "14px",
            },
        },
    };






    const options = [
        { value: "", label: "--SELECT PROJECT NAME--" },
        { value: "1", label: "Project 1" },
        { value: "2", label: "Project 2" },
    ];

    const options2 = [
        { value: "Residential", label: "Residential" },
        { value: "Commercial", label: "Commercial" },
    ];

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: 32,
            height: 32,
            borderRadius: 6,
            borderColor: state.isFocused ? "#86b7fe" : "#dee2e6",
            boxShadow: state.isFocused ? "0 0 0 0.15rem rgba(13,110,253,.25)" : "none",
            fontSize: 13,
        }),
        valueContainer: (base) => ({
            ...base,
            height: 32,
            padding: "0 10px",
        }),
        indicatorsContainer: (base) => ({
            ...base,
            height: 32,
        }),
        placeholder: (base) => ({
            ...base,
            fontSize: 13,
            color: "#6c757d",
        }),
        singleValue: (base) => ({
            ...base,
            fontSize: 13,
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            fontSize: 13,
        }),
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="row g-3 mt-2 align-items-center px-3 mb-2">
                    {/* Project Name */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Project Name</label>
                        <Select
                            value={projectName}
                            onChange={setProjectName}
                            options={options.slice(1)}
                            placeholder="--SELECT PROJECT NAME--"
                            isClearable
                            styles={selectStyles}
                        />
                    </div>

                    {/* Project Type */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Project Type</label>
                        <Select
                            value={projectType}
                            onChange={setProjectType}
                            options={options2}
                            placeholder="--SELECT PROJECT TYPE--"
                            isClearable
                            styles={selectStyles}
                        />
                    </div>

                    {/* Plot Number */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Plot Number</label>
                        <input
                            className="form-control form-control-sm"
                            placeholder="Enter Plot Number"
                        />
                    </div>

                    {/* Plot Size */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Plot Size</label>
                        <input
                            className="form-control form-control-sm"
                            placeholder="Enter Plot Size"
                        />
                    </div>

                    {/* Plot Area (radio) */}
                    <div className="col-12 col-lg-6">
                        <div className="d-flex align-items-center gap-4 plot-area-ui">
                            <span className="plot-label">Plot Area</span>

                            <label className="radio-wrap">
                                <input type="radio" name="plotAreaUnit" defaultChecked />
                                <span className="custom-radio"></span>
                                <span className="radio-text">Yard</span>
                            </label>

                            <label className="radio-wrap">
                                <input type="radio" name="plotAreaUnit" />
                                <span className="custom-radio"></span>
                                <span className="radio-text">Meter</span>
                            </label>
                        </div>
                    </div>


                    {/* Add Plot Button (right side like screenshot) */}
                    <div className="col-12 col-md-6 d-flex justify-content-end">
                        <button className="btn btn-primary btn-sm px-3">
                            ADD PLOT
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="card-body p-0">
                    <DataTable
                        columns={columns}
                        data={applications}
                        progressPending={loading}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        customStyles={customStyles}
                        highlightOnHover
                        fixedHeader
                        fixedHeaderScrollHeight="250px"
                        pointerOnHover
                        responsive
                        noDataComponent={
                            <div className="p-4 text-center">
                                {loading ? "Loading..." : "No applications found"}
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Plots;
