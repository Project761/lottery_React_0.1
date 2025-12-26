import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import SettingsModal from "../../components/admin/SettingsModal";
import { AddDelete_Img, AddDeleteUpdateData, fetchPostData } from "../../components/hooks/Api";
import axios from "axios";

export default function ButtonChange() {

    const CompanyID = localStorage.getItem('companyID') ?? 1
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        getPaperImage();
    }, [CompanyID]);

    const getPaperImage = async () => {
        const response = await fetchPostData("ButtonDetails/GETALL_ButtonDetails", {
            "IsActive": true,
            "ButtonType": "BUTTON CHANGE",
            "CompanyID": localStorage.getItem('companyID') || 1,
        });
        setImages(response)
        // console.log("🚀 ~ getPaperImage ~ response:", response)
    }


    const handleSave = async (file, buttonName) => {

        const formData = new FormData();
        formData.append("file", file);
        formData.append("Data", JSON.stringify({
            "CompanyID": localStorage.getItem('companyID') || 1,
            'ButtonType': 'BUTTON CHANGE',
            'ButtonDetail': buttonName,
        }));

        // try {

        // setImages((prev) => [
        //     ...prev,
        //     {
        //         id: Date.now(),
        //         file,
        //         preview: URL.createObjectURL(file),
        //     },
        // ]);

        const response = await axios.post("ButtonDetails/Insert_ButtonDetails", formData);
        // console.log("🚀 ~ handleSave ~ response:", response)

        setOpen(false);
        // get Image
        getPaperImage()
        // } catch (error) {
        //     console.log("🚀 ~ handleSave ~ error:", error)
        // }
    };


    const handleRemove = (id) => {
        // setImages((prev) => prev.filter((img) => img.id !== id));
        const response = AddDeleteUpdateData("ButtonDetails/Delete_ButtonDetails", {
            "IsActive": '0',
            "ButtonDetailsID": id,
        });
        // console.log("🚀 ~ handleRemove ~ response:", response)
    };


    // api/ButtonDetails/Insert_ButtonDetails
    // CompanyID
    // ButtonType
    // ButtonDetail
    // ButtonType
    // Files

    // api/ButtonDetails/Delete_ButtonDetails
    // IsActive
    // ButtonDetailsID


    // api/ButtonDetails/GETALL_ButtonDetails", 
    // IsActive
    // ButtonType
    // CompanyID


    return (
        <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Add Button Change</h6>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setOpen(true)}
                >
                    ADD BUTTON CHANGE
                </button>
            </div>

            {/* Image Cards */}
            <div className="row g-3">
                {images.map((img) => (
                    <div key={img.ButtonDetailsID} className="col-md-4">
                        <div className="card position-relative">

                            {/* ❌ Close Icon */}
                            <button
                                className="btn btn-sm btn-light position-absolute top-0 end-0 m-1 shadow"
                                onClick={() => handleRemove(img.ButtonDetailsID)}
                            >
                                <FiX size={16} />
                            </button>

                            {/* Image */}
                            <div
                                className="bg-light d-flex align-items-center justify-content-center"
                            >
                                <img
                                    src={img.FilePath}
                                    alt="Button Change"
                                    className="img-fluid w-100"
                                    style={{ maxHeight: "100%" }}
                                />
                            </div>
                            <div className="text-center fw-semibold text-dark"
                                style={{ backgroundColor: "#e5e5e5", padding: "6px 8px", fontSize: "0.8rem", borderBottom: "1px solid #d0d0d0", }}>
                                {img.ButtonDetails}
                            </div>

                            {/* Bottom bar */}
                            <div className="p-1">
                                <div className="bg-danger" style={{ height: 4 }} />
                            </div>
                        </div>
                    </div>
                ))}

                {images.length === 0 && (
                    <p className="text-muted small">No images added yet</p>
                )}
            </div>

            {/* Modal */}
            <SettingsModal
                show={open}
                onClose={() => setOpen(false)}
                onSave={handleSave}
                title="Add Button Change"
                showButtonName={true}
            />

        </>
    );
}
