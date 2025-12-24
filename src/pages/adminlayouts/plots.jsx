import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import Select from "react-select";
import { ChangeArrayFormat } from "../../utils/Comman";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';


function useTableHeight() {
    const getHeight = () => {
        const w = window.innerWidth;
        if (w >= 1400) return "500px"; // xxl
        if (w >= 1200) return "400px"; // xl
        if (w >= 992) return "250px"; // lg
        return "200px";               // md & below
    };

    const [height, setHeight] = useState(getHeight());

    useEffect(() => {
        const onResize = () => setHeight(getHeight());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return height;
}

const Plots = () => {

    const projectTypeOptions = useMemo(
        () => [
            { value: 1, label: "Residential" },
            { value: 2, label: "Commercial" },
        ],
        []
    );

    const CompanyID = Number(localStorage.getItem("companyID") || 1);
    const [applications, setApplications] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [projectNameDrpData, setProjectNameDrpData] = useState([])
    const [loading, setLoading] = useState(true);
    const [plotAreaUnit, setPlotAreaUnit] = useState("Yard");

    const [value, setValue] = useState({
        'CompanyID': localStorage.getItem('companyID') ?? 1,
        'PlotID': '',

        'ProjectID': '',
        'ProjectName': '',
        'ProjectType': '',

        'PlotSize': '',
        'PlotAreaUnit': '',

        'PlotSrNo': '',
        'CreatedByUser': '',
        'ModifiedByUser': '',

    });

    useEffect(() => {
        fetchApplications(CompanyID);
        getProjectNameDrpData(CompanyID);
    }, [CompanyID]);

    const fetchApplications = async (CompanyID) => {
        try {
            setLoading(true);
            const response = await fetchPostData("PlotDetails/GetData_PlotDetails", { IsActive: true, CompanyID: CompanyID });
            // console.log("🚀 ~ fetchApplications ~ response:", response)
            if (response?.length > 0) {
                setApplications(response)
            } else {
                setApplications([])

            }
            // Reset Fields

        } catch (error) {
            showError("Failed to fetch applications");
            setLoading(false);
            console.error("Error fetching applications:", error);

        } finally {
            setLoading(false);

        }
    };

    const getProjectNameDrpData = async (CompanyID) => {
        try {

            const response = await fetchPostData("Project/GetDataDropDown_Project", { CompanyID: CompanyID });
            console.log("🚀 ~ fetchApplications ~ response:", response)
            setProjectNameDrpData(ChangeArrayFormat(response, 'ProjectID', 'Description'))
            // Reset Fields

        } catch (error) {
            console.log("🚀 ~ getProjectName ~ error:", error)

        } finally {

        }
    }

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
                    <button onClick={() => { edit_Plot_Data(row) }} className="btn btn-sm btn-outline-primary">Edit</button>
                    <button onClick={() => { handleDelete(row?.PlotID) }} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "170px",
        },
    ];

    const edit_Plot_Data = (row) => {
        console.log("🚀 ~ edit_Plot_Data ~ row:", row);
        setEditMode(true);
        setValue({
            ...value,
            'PlotID': row?.PlotID,
            'ProjectID': row?.ProjectID ? parseInt(row?.ProjectID) : null,
            'ProjectName': row?.ProjectName,
            'ProjectType': row?.ProjectType,
            'PlotSize': row?.PlotSize,
            'PlotAreaUnit': row?.PlotAreaUnit,
            'PlotSrNo': row?.PlotSrNo,
        });
        setPlotAreaUnit(row?.PlotAreaUnit);
    }

    const OnChangeDropDown = (e, name) => {
        // console.log(e);
        // console.log(name);
        // console.log(e.target.value);
        if (e) {
            if (name === 'ProjectID') {
                setValue({
                    ...value,
                    [name]: e.value,
                    ['ProjectName']: e.label,
                })

            } else {
                setValue({ ...value, [name]: e.value, })

            }

        } else {
            setValue({ ...value, [name]: null, })
        }
    }

    const handleChange = (e) => {
        setPlotAreaUnit(e.target.value);
        setValue({ ...value, ['PlotAreaUnit']: e.target.value, })
    };

    const resetForm = () => {
        setValue({
            ...value,
            'ApplicantNumber': '',
            'ColumnName': '',
            'ColumnValue': '',
        });
        setPlotAreaUnit("Yard")
    }

    const handleSave = async () => {
        console.log(value);

        let error = false;

        if (!value?.ProjectID) {
            toast.error(`ProjectID is required`);
            error = true;
        }
        if (!value?.PlotSize) {
            toast.error(`PlotSize is required`);
            error = true;
        }
        if (!value?.PlotSrNo) {
            toast.error(`PlotSrNo is required`);
            error = true;
        }
        // if (!value?.ProjectType) {
        //     toast.error(`ProjectType is required`);
        //     error = true;
        // }

        if (error) {
            return;
        }

        const { ProjectID, CompanyID, PlotID, PlotAreaUnit, PlotSize, PlotSrNo, ProjectType, ProjectName, CreatedByUser, } = value

        const val = {
            "CompanyID": localStorage.getItem('companyID') || 1,
            'ProjectID': ProjectID,
            'PlotAreaUnit': PlotAreaUnit,
            'PlotSize': PlotSize,
            'PlotSrNo': PlotSrNo,
            'ProjectType': ProjectType,
            'ProjectName': ProjectName,
            'PlotID': '',
            'ModifiedByUser': '',
        }
        console.log("🚀 ~ handleSave ~ val:", val)
        AddDeleteUpdateData('PlotDetails/Insert_PlotDetails', val).then((response) => {
            console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully");
                insert_NewPlot();
                fetchApplications(CompanyID);
            }
        })
    };

    const handleUpdate = async () => {
        console.log(value);

        let error = false;

        if (!value?.ProjectID) {
            toast.error(`ProjectID is required`);
            error = true;
        }
        if (!value?.PlotSize) {
            toast.error(`PlotSize is required`);
            error = true;
        }
        if (!value?.PlotSrNo) {
            toast.error(`PlotSrNo is required`);
            error = true;
        }
        // if (!value?.ProjectType) {
        //     toast.error(`ProjectType is required`);
        //     error = true;
        // }

        if (error) {
            return;
        }

        const { ProjectID, CompanyID, PlotID, PlotAreaUnit, PlotSize, PlotSrNo, ProjectType, ProjectName, CreatedByUser, } = value

        const val = {
            "CompanyID": localStorage.getItem('companyID') || 1,
            'ProjectID': ProjectID,
            'PlotAreaUnit': PlotAreaUnit,
            'PlotSize': PlotSize,
            'PlotSrNo': PlotSrNo,
            'ProjectType': ProjectType,
            'ProjectName': ProjectName,
            'PlotID': PlotID,
            'ModifiedByUser': '',
        }
        console.log("🚀 ~ handleSave ~ val:", val)
        AddDeleteUpdateData('PlotDetails/Update_PlotDetails', val).then((response) => {
            console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully");
                insert_NewPlot();
                fetchApplications(CompanyID);
            }
        })
    };

    const handleDelete = async (id) => {
        showWarning("Deleting item... please wait");

        try {
            await AddDeleteUpdateData('PlotDetails/Delete_PlotDetails ', {
                'PlotID': id,
                'DeleteByUser': '',
                'IsActive': '',
            });
            fetchApplications(CompanyID);
            showSuccess("Item deleted successfully!");

        } catch (error) {
            console.error("Error deleting item:", error);
            showError("Failed to delete item. Please try again.");

        } finally {

        }
    };

    const insert_NewPlot = () => {
        setEditMode(false);
        setValue({
            ...value,
            'PlotID': '',
            'ProjectID': '',
            'ProjectName': '',
            'ProjectType': '',
            'PlotSize': '',
            'PlotSrNo': '',
            'PlotAreaUnit': 'Yard',
        });
        setPlotAreaUnit('Yard')
    }

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

    const tableHeight = useTableHeight();


    return (
        <div className="container-fluid">
            <div className="card">
                <div className="row g-3 mt-2 align-items-center px-3 mb-2">
                    {/* Project Name */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Project Name</label>
                        <Select
                            name="ProjectID"
                            value={projectNameDrpData?.filter((obj) => obj.value === value?.ProjectID)}
                            onChange={(e) => { OnChangeDropDown(e, 'ProjectID') }}
                            options={projectNameDrpData}
                            placeholder="--SELECT PROJECT NAME--"
                            isClearable
                            styles={selectStyles}
                        />
                    </div>

                    {/* Project Type */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Project Type</label>
                        <Select
                            name="ProjectType"
                            value={projectTypeOptions?.filter((obj) => obj.value === value?.ProjectType)}
                            onChange={(e) => { OnChangeDropDown(e, 'ProjectType') }}
                            options={projectTypeOptions}
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

                            name="PlotSrNo"
                            type="number"
                            value={value?.PlotSrNo}
                            onChange={(e) => { setValue({ ...value, 'PlotSrNo': e.target.value }) }}
                        />
                    </div>

                    {/* Plot Size */}
                    <div className="col-12 col-md-3">
                        <label className="form-label small text-muted mb-1">Plot Size</label>
                        <input
                            className="form-control form-control-sm"
                            placeholder="Enter Plot Size"

                            name="PlotSize"
                            value={value?.PlotSize}
                            onChange={(e) => { setValue({ ...value, 'PlotSize': e.target.value }) }}
                        />
                    </div>

                    {/* Plot Area (radio) */}
                    <div className="col-12 col-lg-6">
                        <div className="d-flex align-items-center gap-4 plot-area-ui">
                            <span className="plot-label">Plot Area</span>

                            <label className="radio-wrap">

                                <input
                                    type="radio"
                                    name="PlotAreaUnit"
                                    value="Yard"
                                    checked={plotAreaUnit === "Yard"}
                                    onChange={handleChange}
                                    defaultChecked
                                />

                                <span className="custom-radio"></span>
                                <span className="radio-text">Yard</span>
                            </label>

                            <label className="radio-wrap">

                                <input
                                    type="radio"
                                    name="PlotAreaUnit"
                                    value="Meter"
                                    checked={plotAreaUnit === "Meter"}
                                    onChange={handleChange}
                                />

                                <span className="custom-radio"></span>
                                <span className="radio-text">Meter</span>
                            </label>
                        </div>
                    </div>

                    {/* Add Plot Button (right side like screenshot) */}
                    <div className="col-12 col-md-6 d-flex justify-content-end">
                        <button onClick={insert_NewPlot} className="btn btn-primary btn-sm px-3 ml-2">
                            New
                        </button>
                        {
                            editMode ?
                                <button onClick={handleUpdate} className="btn btn-primary btn-sm px-3">
                                    Update PLOT
                                </button>
                                :
                                <button onClick={handleSave} className="btn btn-primary btn-sm px-3">
                                    ADD PLOT
                                </button>
                        }
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
                        fixedHeaderScrollHeight={tableHeight}
                        pointerOnHover
                        responsive
                        noDataComponent={
                            <div className="p-4 text-center">
                                {loading ? "Loading..." : "No applications found"}
                            </div>
                        }

                        persistTableHead={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Plots;
