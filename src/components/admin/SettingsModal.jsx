import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { showSuccess } from "../../utils/toast";

const SettingsModal = ({
    show,
    onClose,
    onSave,
    title,
    showButtonName = false,
}) => {
    const [file, setFile] = useState(null);
    const [buttonName, setButtonName] = useState("");

    const handleSave = () => {
        if (showButtonName && !buttonName.trim())
            return alert("Please enter Button Name");
        if (!file) return alert("Please select an image");
        onSave(file, buttonName);
        showSuccess("Saved Image successfully");
        setFile(null);
        setButtonName("");
    };
    return (
        <Modal show={show} onHide={onClose} centered size="md" backdrop="static">
            <Modal.Header closeButton className="py-2">
                <Modal.Title className="fw-semibold fs-6">
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {/* ✅ Button Name ONLY when required */}
                {showButtonName && (
                    <Form.Group className="mb-3">
                        <Form.Label className="text-muted small mb-1">
                            Button Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            size="sm"
                            placeholder="Enter Button Name"
                            value={buttonName}
                            onChange={(e) => setButtonName(e.target.value)}
                        />
                    </Form.Group>
                )}

                <Form.Group>
                    <Form.Label className="text-muted small mb-1">
                        Choose Image
                    </Form.Label>
                    <Form.Control
                        type="file"
                        size="sm"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer className="py-2">
                <Button size="sm" variant="secondary" onClick={onClose}>
                    CLOSE
                </Button>
                <Button size="sm" variant="primary" onClick={handleSave}>
                    SAVE
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SettingsModal;
