import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import { FaEdit, FaTrash } from "react-icons/fa";
import { normalizeList } from "../../utils/Comman";
import CategoryQuotaModal from "../../components/admin/CategoryQuotaModal";
import { Button } from "react-bootstrap";


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

    const CompanyID = localStorage.getItem("companyID") ?? 1;
    const UserID = localStorage.getItem('AdminUserID') || 1
    const [CategoryQuotadata, setCategoryQuotadata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [categoryQuotaid, setCategoryQuotaId] = useState('');
    const [EditMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState([]);
    const [count, setCount] = useState(0)

    // const [value, setValue] = useState({
    //     CompanyID: localStorage.getItem("companyID") ?? 1,
    //     quota: '',
    //     CategoryQuotas: '',
    //     plot_range: '',
    //     policy_name: '',
    //     CreatedByUser: '',
    //     CategoryQuotaID: '',
    //     ModifiedByUser: '',
    // });

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

            console.log("CategoryQuota list:", list);
        } catch (error) {
            showError("Failed to fetch Category Quota");
            setCategoryQuotadata([]);

        } finally {
            setLoading(false);

        }
    };

    const handleEdit = (row) => {
        setOpenModal(true);
        // console.log("Edit row:", row);
        setCategoryQuotaId(row?.CategoryQuotaID);
        setEditMode(true);
        setEditData(row);
        setCount(count + 1);

    };

    const handleDelete = async (row) => {
        try {
            const response = await AddDeleteUpdateData("CategoryQuota/Delete_CategoryQuota", {
                CategoryQuotaID: row?.CategoryQuotaID,
                ModifiedByUser: UserID,
                IsActive: ""
            });
            if (response?.success) {
                showSuccess("Deleted successfully");
                // console.log(response?.success)
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
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(row)}
                    >
                        <FaEdit />
                    </Button>

                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(row)}
                    >
                        <FaTrash />
                    </Button>
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

    const handleOpen = () => {
        setOpenModal(true);
        setEditMode(false);
        setCategoryQuotaId('');
    }

    const handleClose = () => setOpenModal(false);

    return (
        <div className="container-fluid py-3">
            <div className="card">
                <div className="m-1 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleOpen}>
                        Add Category Quota
                    </button>
                </div>
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
            {openModal && <CategoryQuotaModal
                count={count}
                EditMode={EditMode}
                editData={editData}
                setEditData={setEditData}
                setEditMode={setEditMode}
                setCategoryQuotaId={setCategoryQuotaId}
                categoryQuotaid={categoryQuotaid}
                onClose={() => setOpenModal(false)}
                fetchCategoryQuota={fetchCategoryQuota}
            />}
        </div>

    );
};

export default CategoryQuota;
