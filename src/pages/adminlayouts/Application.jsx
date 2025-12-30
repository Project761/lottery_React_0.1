import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import VerifyStatusModal from "../../components/admin/VerifyStatusModal";


function useTableHeight() {
    const getHeight = () => {
        const w = window.innerWidth;
        if (w >= 1400) return "660px"; // xxl
        if (w >= 1200) return "385px"; // xl
        if (w >= 992) return "220px"; // lg
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

const Application = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkedRows, setCheckedRows] = useState({});
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


    const CompanyID = localStorage.getItem("companyID") ?? 1;
    const UserID = localStorage.getItem('AdminUserID') || 1

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await fetchPostData("User/GetData_User", {
                CompanyID,
                IsActive: true,
            });

            // console.log("response:", response);
            const list =
                Array.isArray(response) ? response :
                    Array.isArray(response?.data) ? response.data :
                        Array.isArray(response?.data?.data) ? response.data.data :
                            Array.isArray(response?.data?.Data) ? response.data.Data :
                                [];

            setApplications(list);
        } catch (error) {
            showError("Failed to fetch applications");
            // console.error("Error fetching applications:", error);
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            name: "Verify / Unverify",
            cell: (row) => (
                <button
                    type="button"
                    className={`btn my-1 btn-sm text-white ${String(row?.Status || "").toLowerCase() === "verify"
                        ? "btn-success"
                        : "btn-danger"
                        }`}
                    onClick={() => openVerifyModal(row)}
                    style={{ width: "clamp(70px, 8vw, 85px)" }}
                >
                    {String(row?.Status || "").toLowerCase() === "verify"
                        ? "Verified"
                        : "Unverified"}
                </button>
            ),
            width: "150px",
            grow: 0,
            wrap: false,
        },


        {
            name: "S.No",
            cell: (row, index) => index + 1,
            width: "70px",
            grow: 0,
            wrap: false,
        },

        {
            name: "Attachment",
            cell: (row) =>
                row?.PaymentAttachement ? (
                    <a
                        href={row.PaymentAttachement}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary"
                    >
                        Attachment
                    </a>
                ) : (
                    "-"
                ),
            width: "120px",
            grow: 0,
            wrap: false,
        },

        {
            name: "Applicant Number",
            selector: (row) => row?.ApplicantNumber ?? "",
            sortable: true,
            width: "170px",
            grow: 0,
            wrap: false,
        },

        {
            name: "Full Name",
            selector: (row) => row?.FullName ?? "",
            sortable: true,
            width: "170px",
            grow: 0,
            wrap: false,
        },

        {
            name: "Mobile Number",
            selector: (row) => row?.MobileNumber ?? "",
            sortable: true,
            width: "150px",
            grow: 0,
            wrap: false,
        },

        {
            name: "Aadhar Number",
            selector: (row) => row?.AadharNumber ?? "",
            sortable: true,
            width: "170px",
            grow: 0,
            wrap: false,
        },

        {
            name: "Email",
            selector: (row) => row?.Email ?? "",
            sortable: true,
            width: "220px",
            grow: 0,
            wrap: false,
        },
        {
            name: "Address",
            cell: (row) => {
                const addr = row?.Paraddress ?? row?.Posaddress ?? "";
                return (
                    <div
                        title={addr}
                        style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "280px",
                        }}
                    >
                        {addr}
                    </div>
                );
            },
            width: "300px",
            grow: 0,
            wrap: false,
        },

    ];

    const handleCheckBox = async (e, row) => {
        console.log("🚀 ~ handleCheckBox ~ row:", row)

        const val = {
            'Status': row?.Status === "Verify" || row?.Status === "verify" ? "Unverified" : "Verify",
            'UserID': row?.UserID,
            'ModifiedByUser': localStorage.getItem('AdminUserID') || 1,
        }

        await AddDeleteUpdateData('User/Update_UserStatus', val).then((response) => {
            // console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully");
                fetchApplications();
            }
        })
    };

    // const handleCheckBox = async (e, row) => {
    //     console.log("🚀 ~ handleCheckBox ~ row:", row)
    //     // setCheckedRows((prev) => ({ ...prev, [row.Id]: checked, }));
    //     const { checked } = e.target;
    //     console.log("Row:", row, "Checked:", checked);

    //     const val = {
    //         'Status': checked ? 'Verify' : 'Unverified',
    //         'UserID': row?.UserID,
    //         'ModifiedByUser': localStorage.getItem('AdminUserID') || 1,
    //     }

    //     await AddDeleteUpdateData('User/Update_UserStatus', val).then((response) => {
    //         // console.log("🚀 ~ handleCheckBox ~ response:", response);
    //         if (response?.success) {
    //             showSuccess("Update Successfully");
    //             fetchApplications();
    //         }
    //     })
    // };

    const updateApplicationStatus = () => {
        AddDeleteUpdateData('User/Update_UserStatus', val).then((response) => {
            // console.log("🚀 ~ handleCheckBox ~ response:", response);
            if (response?.success) {
                showSuccess("Update Successfully")
            }
        })
    }

    const customStyles = {
        headCells: {
            style: {
                background: '#0d6efd',
                color: '#fff',
                fontWeight: '600',
                minHeight: 40,
                height: 40,
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

    const tableHeight = useTableHeight();


    const openVerifyModal = (row) => {
        setSelectedRow(row);
        setShowVerifyModal(true);
    };


    return (
        <div className="container-fluid py-3">
            <div className="card">
                {/* <div className="card-header bg-white py-3">
                    <h5 className="mb-0">Applications</h5>
                </div> */}
                <div className="card-body p-0">
                    <DataTable
                        columns={columns}
                        data={applications}
                        progressPending={loading}
                        pagination
                        paginationPerPage={30}
                        paginationRowsPerPageOptions={[35, 50, 100]}
                        customStyles={customStyles}
                        highlightOnHover
                        fixedHeader
                        showHeader={true}
                        persistTableHead={true}
                        dense
                        fixedHeaderScrollHeight={tableHeight}
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

            <VerifyStatusModal
                show={showVerifyModal}
                row={selectedRow}
                onClose={() => setShowVerifyModal(false)}
                // onConfirm={handleVerifyConfirm}
            />

        </div>

    );
};

export default Application;
