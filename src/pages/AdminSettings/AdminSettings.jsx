import React, { useState } from "react";
import PaperImage from "./PaperImage";
import ButtonChange from "./ButtonChange";
import Note from "./Note";
import ApplicantPermission from "./ApplicantPermission";
import WebsiteContact from "./WebsiteContact";
import TruncateTable from "./TruncateTable";
import ReceiptAddress from "./ReceiptAddress";
import UpdateApplicant from "./UpdateApplicant";
import Logo from "./Logo";
import AdminInfo from "./AdminInfo";

/* =======================
   Admin Settings (Single File)
   ======================= */

export default function AdminSettings() {
    const tabs = [
        { key: "paperImage", label: "PAPER CUT IMAGE" },
        { key: "buttonChange", label: "BUTTON CHANGE" },
        { key: "note", label: "NOTE" },
        { key: "permission", label: "APPLICANT REGISTER PERMISSION" },
        { key: "contact", label: "WEBSITE CONTACT INFO" },
        { key: "truncate", label: "TRUNCATE TABLE" },
        { key: "receipt", label: "RECEIPT ADDRESS" },
        { key: "update", label: "UPDATE APPLICANT" },
        { key: "logo", label: "LOGO" },
        { key: "admin", label: "CHANGE ADMIN INFO" },
    ];

    const [activeTab, setActiveTab] = useState("paperImage");

    return (
        <div className="container-fluid p-3">
            {/* Tabs */}
            <div className="card p-2">
                <div className="d-flex flex-wrap gap-2">
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`btn btn-sm ${activeTab === t.key
                                ? "btn-primary"
                                : "btn-outline-primary"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    {activeTab === "paperImage" && <PaperImage />}
                    {activeTab === "buttonChange" && <ButtonChange />}
                    {activeTab === "note" && <Note />}
                    {activeTab === "permission" && <ApplicantPermission />}
                    {activeTab === "contact" && <WebsiteContact />}
                    {activeTab === "truncate" && <TruncateTable />}
                    {activeTab === "receipt" && <ReceiptAddress />}
                    {activeTab === "update" && <UpdateApplicant />}
                    {activeTab === "logo" && <Logo />}
                    {activeTab === "admin" && <AdminInfo />}
                </div>
            </div>
        </div>
    );
}
















