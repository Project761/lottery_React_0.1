import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { showError } from "../../utils/toast";
import { fetchPostData } from "../../components/hooks/Api";
import { formattedDate } from "../../utils/Comman";
// import { fetchPostData } from "../../components/hooks/Api";

function useTableHeight() {
    const getHeight = () => {
        const w = window.innerWidth;
        if (w >= 1400) return "710px"; // xxl
        if (w >= 1200) return "415px"; // xl
        if (w >= 992) return "650px"; // lg
        return "500px";               // md & below
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
            // console.log("🚀 ~ fetchBankDetails ~ response:", normalizeList(response))
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
        { name: "Applicant Number", grow: 2, selector: r => r?.ApplicantNumber ?? "", sortable: true, minWidth: "180px", wrap: false, },
        { name: "Applicant Name", grow: 2, selector: r => r?.FullName ?? "", sortable: true, minWidth: "160px", wrap: false, },
        // { name: "Plot", selector: r => r?.plot ?? "", sortable: true, minWidth: "160px", wrap: false, },
        { name: "Category", row: 2, selector: r => r?.Category ?? "", sortable: true, minWidth: "130px", wrap: false, },
        { name: "A/C Holder Name", grow: 2, selector: r => r?.BankUserName ?? "", sortable: true, minWidth: "160px", wrap: false, },
        { name: "A/C Number", grow: 2, selector: r => r?.AccountNumber ?? "", sortable: true, minWidth: "160px", wrap: false, },
        { name: "Bank Name", grow: 2, selector: r => r?.BankName ?? "", sortable: true, minWidth: "160px", wrap: false, },
        { name: "IFSC Code", grow: 2, selector: r => r?.IfscCode ?? "", sortable: true, minWidth: "160px", wrap: false, },
        { name: "Branch Address", grow: 2, selector: r => r?.BranchAddress ?? "", sortable: true, minWidth: "180px", wrap: false, },
        { name: "Demand Draft Number", grow: 2, selector: r => r?.PaymentTrasnum ?? "", sortable: true, minWidth: "200px", wrap: false, },
        { name: "Demand Draft Date", grow: 2, selector: r => r?.PaymentDate ? formattedDate(r?.PaymentDate) : "", sortable: true, minWidth: "200px", wrap: false, },
        { name: "Demand Draft Bank", grow: 2, selector: r => r?.BankName ?? "", sortable: true, minWidth: "200px", wrap: false, },
        { name: "Demand Draft Amount", grow: 2, selector: r => r?.BankAmountName ?? "", sortable: true, minWidth: "200px", wrap: false, },
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
                        {/* style={{ width: "100%", maxWidth: "1115px", overflowX: "auto" }} */}
                        <div className="col-lg-12">
                            <DataTable
                                columns={columns}
                                data={bankDetails || []}
                                progressPending={loading}
                                pagination
                                showHeader={true}
                                persistTableHead={true}
                                dense
                                paginationPerPage={30}
                                paginationRowsPerPageOptions={[35, 50, 100]}
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
