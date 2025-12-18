import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AddEditModal = ({
    show,
    onHide,
    title,
    formData = {},
    listCode,
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

                    <Form.Group className="mb-3">
                        <Form.Label>{listCode}</Form.Label>
                        <Form.Control
                            type={"text"}
                            name={listCode}
                            value={formData[listCode] || ''}
                            onChange={onInputChange}
                            placeholder={listCode || `Enter ${listCode?.toLowerCase()}`}
                        />
                        <Form.Label>{"Description"}</Form.Label>
                        <Form.Control
                            type={"text"}
                            name={"Description"}
                            value={formData["Description"] || ''}
                            onChange={onInputChange}
                            placeholder={"Description" || `Enter ${"Description"?.toLowerCase()}`}
                        />
                    </Form.Group>


                   

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
