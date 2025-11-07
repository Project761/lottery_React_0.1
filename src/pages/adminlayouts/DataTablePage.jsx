import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AddEditModal from '../../components/admin/AddEditModal';

const DataTablePage = ({
  title,
  columns = [],
  apiEndpoint,
  formFields = [],
  defaultFormData = {},
  onAdd,
  onEdit,
  onDelete,
  data = []
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await onEdit(formData);
      } else {
        await onAdd(formData);
      }
      setShowModal(false);
      setFormData(defaultFormData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await onDelete(id);
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredData = data.filter(item => {
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        <Button 
          variant="primary" 
          onClick={() => {
            setFormData(defaultFormData);
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          <FaPlus className="me-2" /> Add New
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index}>{column.header}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center">
                      <Spinner animation="border" />
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex}>
                          {column.render ? column.render(item) : item[column.field]}
                        </td>
                      ))}
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <AddEditModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={`${isEditing ? 'Edit' : 'Add New'} ${title}`}
        formFields={formFields}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default DataTablePage;
