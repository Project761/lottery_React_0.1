import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SettingsModal = ({
  show,
  onClose,
  onSave,
  title = "Add Paper Image",
}) => {
  const [file, setFile] = useState(null);

  const handleSave = () => {
    if (!file) return alert("Please select an image");
    onSave(file);
    setFile(null);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="md" backdrop="static">
      {/* Header */}
      <Modal.Header closeButton className="py-2">
        <Modal.Title className="fw-semibold fs-6">
          {title}
        </Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body className="px-4 py-3">
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

      {/* Footer */}
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
