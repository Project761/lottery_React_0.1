import { useState } from "react";
import { FiX } from "react-icons/fi";
import SettingsModal from "../../components/admin/SettingsModal";

export default function PaperImage() {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);

    const handleSave = (file) => {
        setImages((prev) => [
            ...prev,
            {
                id: Date.now(),
                file,
                preview: URL.createObjectURL(file),
            },
        ]);
        setOpen(false);
    };

    const handleRemove = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    return (
        <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Add Paper Image</h6>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setOpen(true)}
                >
                    ADD PAPER IMAGE
                </button>
            </div>

            {/* Image Cards */}
            <div className="row g-3">
                {images.map((img) => (
                    <div key={img.id} className="col-md-4">
                        <div className="card position-relative">

                            {/* ❌ Close Icon */}
                            <button
                                className="btn btn-sm btn-light position-absolute top-0 end-0 m-1 shadow"
                                onClick={() => handleRemove(img.id)}
                            >
                                <FiX size={16} />
                            </button>

                            {/* Image */}
                            <div
                                className="bg-light d-flex align-items-center justify-content-center"
                                style={{ height: 160 }}
                            >
                                <img
                                    src={img.preview}
                                    alt="Paper"
                                    className="img-fluid"
                                    style={{ maxHeight: "100%" }}
                                />
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
            />
        </>
    );
}
