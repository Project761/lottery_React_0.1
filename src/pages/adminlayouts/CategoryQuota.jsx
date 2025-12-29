import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import { FaEdit, FaTrash } from "react-icons/fa";
import { normalizeList } from "../../utils/Comman";


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



const CategoryQuota = () => {
    const [CategoryQuotadata, setCategoryQuotadata] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [categoryQuotaDropdown, setCategoryQuotaDropdown] = useState([]);
    const CompanyID = localStorage.getItem("companyID") ?? 1;
    const UserID = localStorage.getItem('AdminUserID') || 1

    useEffect(() => {
        fetchCategoryQuota();
    }, [CompanyID]);

    const fetchCategoryQuota = async () => {
        try {
            setLoading(true);

            const response = await fetchPostData("CategoryQuota/GetData_CategoryQuota", {
                CompanyID,
                IsActive: true,
            });
            const list = normalizeList(response);
            setCategoryQuotadata(list);

            // console.log("CategoryQuota list:", list);
        } catch (error) {
            showError("Failed to fetch Category Quota");
            setCategoryQuotadata([]);
        } finally {
            setLoading(false);
        }
    };



    // const fetchGetDataDropDown = async () => {
    //     try {
    //         const response = await fetchPostData(
    //             "/CategoryQuota/GetDataDropDown_CategoryQuota",
    //             { CompanyID }
    //         );
    //         console.log(response)

    //         setCategoryQuotaDropdown((response));
    //     } catch (error) {
    //         showError("Failed to fetch Category Quota");
    //     }
    // };

    // useEffect(() => {
    //     fetchGetDataDropDown();
    // }, [CompanyID]);





    const insertCategoryQuota = async () => {
        try {
            setLoading(true);
            const val = { 'CompanyID': CompanyID, 'quota': "", 'CategoryQuotas': "", 'plot_range': "", 'policy_name': "", 'CreatedByUser': UserID, };

            const response = await fetchPostData("CategoryQuota/Insert_CategoryQuota", val);
            console.log("✅ Insert CategoryQuota Response:", response);

            showSuccess("Inserted successfully");
            fetchCategoryQuota();
        } catch (e) {
            showError("Insert failed");
        } finally {
            setLoading(false);
        }
    };




    const handleEdit = async (row) => {
        try {
            console.log("Edit row:", row);
            const val = {
                'CompanyID': CompanyID,
                'CategoryQuotaID': row?.CategoryQuotaID,
                'quota': row?.quota ?? "",
                'CategoryQuotas': row?.CategoryQuotas ?? "",
                'plot_range': row?.plot_range ?? "",
                'policy_name': row?.policy_name ?? "",
                'ModifiedByUser': UserID,
            };

            console.log("➡️ Update Payload:", val);

            const response = await fetchPostData("CategoryQuota/Update_CategoryQuota", val);
            console.log("✅ Update Response:", response);

            showSuccess("Updated successfully");
            fetchCategoryQuota();
        } catch (e) {
            showError("Update failed");
        }
    };


    const handleDelete = async (row) => {
        try {
            const response = await AddDeleteUpdateData("CategoryQuota/Delete_CategoryQuota", {
                CategoryQuotaID: row?.CategoryQuotaID,
                ModifiedByUser: UserID,
            });
            if (response?.success) {
                showSuccess("Deleted successfully");
                console.log(response?.success)
                fetchCategoryQuota();
            } else {
                showError("Delete failed");
            }
        } catch (error) {
            showError("Delete failed");
        }

    };

    const columns = [
        {
            name: "S.No",
            cell: (row, index) => index + 1,
            // width: "70px",
            // grow: 0,
            // wrap: false,
        },
        {
            name: "Category Quota",
            selector: (row) => row?.CategoryQuota ?? "",
            sortable: true,
            // width: "150px",
            // grow: 0,
            // wrap: false,
        },
        {
            name: "Quota",
            selector: (row) => row?.quota ?? "",
            sortable: true,
            // width: "100px",
            // grow: 0,
            // wrap: false,
        },
        {
            name: "Plot Range",
            selector: (row) => row?.plot_range ?? "",
            sortable: true,
            // width: "150px",
            // grow: 0,
            // wrap: false,
        },
        {
            name: "Policy Name",
            selector: (row) => row?.policy_name ?? "",
            sortable: true,
            // width: "200px",
            // grow: 0,
            // wrap: false,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-1 my-1">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(row)}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
            // width: "150px",
            // grow: 0,
            // wrap: false,
        },
    ];




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




    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="card-body p-0">
                    <DataTable
                        columns={columns}
                        data={CategoryQuotadata}
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

                    />
                </div>
            </div>
        </div>

    );
};

export default CategoryQuota;
