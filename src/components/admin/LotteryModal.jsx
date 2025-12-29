import React from "react";
import DataTable from "react-data-table-component";
import gift from '../../assets/image/gift.gif'
import user from "../../assets/image/user.png"
import { fetchPostData } from "../hooks/Api";
import { useEffect, useState } from "react";
import { showError } from "../../utils/toast";
import { useLocation } from "react-router-dom";

function useTableHeight() {
    const getHeight = () => {
        const w = window.innerWidth;
        if (w >= 1400) return "550px"; // xxl
        if (w >= 1200) return "420px"; // xl
        if (w >= 992) return "280px"; // lg
        return "240px";               // md & below
    };
    const [height, setHeight] = useState(getHeight());

    useEffect(() => {
        const onResize = () => setHeight(getHeight());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return height;
}

const getModalWidth = () => {
    const w = window.innerWidth;
    // Bootstrap breakpoints
    if (w >= 1400) return "1550px"; // xxl
    if (w >= 1200) return "1240px"; // xl
    if (w >= 992) return "1060px";  // lg
    if (w >= 768) return "96%";    // md
    return "98%";                   // sm
};

const LotteryModal = ({ onClose, applications, loading }) => {



    // api/PlotLottery/RunPlotLottery
    // CompanyID
    // PlotRange
    // PolicyName

    // api/PlotLottery/GetData_PlotLottery
    // CompanyID
    // PlotRange
    // PolicyName

    // useEffect(() => {
    //     let timerId;
    //     const startTime = Date.now();
    //     fetchApplications().then(() => {
    //         const elapsed = Date.now() - startTime;
    //         const remaining = Math.max(30000 - elapsed, 0);

    //         timerId = setTimeout(() => {
    //             setLoading(false);
    //         }, remaining);
    //     });

    //     return () => clearTimeout(timerId);
    // }, []);

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

    const styles = {
        backdrop: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
            padding: "12px",
        },
        modal: {
            width: getModalWidth(),
            background: "#fff",
            borderRadius: "8px",
            maxHeight: "93vh",
            overflow: "hidden",
        },
        loaderWrap: {
            height: "420px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px",
        },
        gift: {
            width: "140px",
            height: "140px",
            objectFit: "contain",
            animation: "giftPulse 1s ease-in-out infinite",
        },
    };

    const tableHeight = useTableHeight();

    return (
        <div style={styles.backdrop}>
            <style>{`
        @keyframes giftPulse {
          0% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.85; }
        }
      `}</style>

            <div style={styles.modal}>

                <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <div className="d-flex align-items-center">
                        <img src={user} alt="user" style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                    </div>
                    <button className="btn btn-sm btn-outline-danger" onClick={onClose}> ✕</button>
                </div>


                <div className="p-2">
                    {loading ? (
                        <div style={styles.loaderWrap}>
                            <img src={gift} alt="Loading" style={styles.gift} />
                            <div className="text-muted small">Loading...</div>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={applications || []}
                            progressPending={loading}
                            showHeader
                            persistTableHead
                            dense
                            pagination
                            paginationPerPage={15}
                            paginationRowsPerPageOptions={[20, 50, 100]}
                            customStyles={customStyles}
                            fixedHeaderScrollHeight={tableHeight}
                            highlightOnHover
                            fixedHeader
                            pointerOnHover
                            responsive
                            noDataComponent={<div className="p-4 text-center">No applications found</div>}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LotteryModal;
