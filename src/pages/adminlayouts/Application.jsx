import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { showError } from "../../utils/toast";
import { fetchPostData } from "../../components/hooks/Api";

const Application = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const CompanyID = localStorage.getItem("companyID") ?? 1;

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
            cell: (row, index) => index + 1,
            width: "80px",
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
        },
        {
            name: "Applicant Number",
            selector: (row) => row?.ApplicantNumber ?? "",
            sortable: true,
        },
        {
            name: "Full Name",
            selector: (row) => row?.FullName ?? "",
            sortable: true,
        },
        {
            name: "Mobile Number",
            selector: (row) => row?.MobileNumber ?? "",
            sortable: true,
        },
        {
            name: "Aadhar Number",
            selector: (row) => row?.AadharNumber ?? "",
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row?.Email ?? "",
            sortable: true,
        },
        {
            name: "Address",
            sortable: true,
            cell: (row) => (
                <div
                    title={(row?.Paraddress ?? row?.Posaddress ?? "")}
                    style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {row?.Paraddress ?? row?.Posaddress ?? ""}
                </div>
            ),
        }

    ];

    const customStyles = {
        headCells: {
            style: {
                backgroundColor: "#f8f9fa",
                fontWeight: "bold",
                fontSize: "14px",
            },
        },
        cells: {
            style: {
                fontSize: "14px",
            },
        },
    };

    return (
        <>
            <div>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Applications</h5>
                        </div>

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
                                fixedHeaderScrollHeight="300px"
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
            </div>
        </>

    );
};

export default Application;
