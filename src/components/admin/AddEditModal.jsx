import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddEditModal = ({
    show,
    onHide,
    title,
    formFields = [],
    formData = {},
    onInputChange,
    onSubmit,
    submitButtonText = 'Save Changes',
    size = 'md'
}) => {
    return (
        <Modal show={show} onHide={onHide} size={size} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    {formFields.map((field) => (
                        <Form.Group key={field.name} className="mb-3">
                            <Form.Label>{field.label}</Form.Label>
                            <Form.Control
                                type={field.type || 'text'}
                                name={field.name}
                                value={formData[field.name] || ''}
                                onChange={onInputChange}
                                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                autoFocus={field.autoFocus}
                                required={field.required}
                                as={field.as}
                                rows={field.rows}
                            />
                        </Form.Group>
                    ))}
                    <div className="text-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            {submitButtonText}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddEditModal;
