import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { showError } from "../../utils/toast";
import { fetchPostData } from "../../components/hooks/Api";
// import { fetchPostData } from "../../components/hooks/Api";

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

const BankDetailsForm = () => {
    const [bankDetails, setBankDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    const CompanyID = localStorage.getItem("companyID") ?? 1;

    const fetchBankDetails = async () => {
        try {
            setLoading(true);
            const response = await fetchPostData("BankDetails/GetData_BankDetails", { CompanyID, IsActive: true });
            setBankDetails(normalizeList(response));
            console.log("🚀 ~ fetchBankDetails ~ response:", normalizeList(response))
        } catch (error) {
            showError("Failed to fetch bank details");
            setBankDetails([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBankDetails();
    }, []);

    const normalizeList = (res) =>
        Array.isArray(res) ? res :
            Array.isArray(res?.data) ? res.data :
                Array.isArray(res?.data?.Data) ? res.data.Data :
                    [];

    const columns = [
        { name: "S.No", cell: (row, index) => index + 1, width: "80px" },
        { name: "Applicant Number", selector: r => r?.ApplicantNumber ?? "", sortable: true },
        { name: "Applicant Name", selector: r => r?.ApplicantName ?? "", sortable: true, width: "160px" },
        { name: "Plot", selector: r => r?.plot ?? "", sortable: true },
        { name: "Category", selector: r => r?.Category ?? "", sortable: true },
        { name: "A/C Holder Name", selector: r => r?.AccountHolderName ?? "", sortable: true },
        { name: "A/C Number", selector: r => r?.AccountNumber ?? "", sortable: true },
        { name: "Bank Name", selector: r => r?.BankName ?? "", sortable: true },
        { name: "IFSC Code", selector: r => r?.IfscCode ?? "", sortable: true },
        { name: "Branch Address", selector: r => r?.BranchAddress ?? "", sortable: true },
        { name: "Demand Draft Number", selector: r => r?.DemandDraftNumber ?? "", sortable: true },
        { name: "Demand Draft Date", selector: r => r?.DemandDraftDate ?? "", sortable: true },
        { name: "Demand Draft Bank", selector: r => r?.DemandDraftBank ?? "", sortable: true },
        { name: "Demand Draft Amount", selector: r => r?.DemandDraftAmount ?? "", sortable: true },
    ];
    const customStyles = {
        tableWrapper: { style: { overflowX: "auto", width: "100%", }, },
        headCells: {
            style: {
                background: "#0d6efd",
                color: "#fff",
                fontWeight: "600",
                minHeight: 40,
                height: 40,
                fontSize: "14px",
                position: "sticky",
                top: 0,
                zIndex: 2,
                whiteSpace: "nowrap",
            },
        },
        cells: {
            style: {
                fontSize: "14px",
                whiteSpace: "nowrap",
            },
        },
    };


    const tableHeight = useTableHeight();

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-12" style={{ width: "1115px", overflowX: "scroll" }}>
                            <DataTable
                                columns={columns}
                                data={bankDetails || []}
                                progressPending={loading}
                                pagination
                                showHeader={true}
                                persistTableHead={true}
                                dense
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                customStyles={customStyles}
                                highlightOnHover
                                fixedHeader
                                showFooter={true}
                                fixedHeaderScrollHeight={tableHeight}
                                pointerOnHover
                                responsive

                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BankDetailsForm;
