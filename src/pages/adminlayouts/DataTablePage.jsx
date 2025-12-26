import React, { useState, useEffect } from 'react';
import { Button, Card, Table, Form, InputGroup, Spinner } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AddEditModal from '../../components/admin/AddEditModal';
import DataTable from 'react-data-table-component';
import { AddDeleteUpdateData, fetchPostData } from '../../components/hooks/Api';
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';

const DataTablePage = (props) => {

  const { page, getDataApiUrl, updateApiUrl, deleteApiUrl, addApiUrl, getSingleDataApiUrl, listCode, listId } = props;

  const companyID = localStorage.getItem('companyID') ? localStorage.getItem('companyID') : 1;

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    [listCode]: '',
    [listId]: '',
    Description: '',
    CompanyID: companyID,
    IsActive: true,
    CreatedByUser: '',
    ModifiedByUser: '',
    DeleteByUser: '',
  });


  const columns = [
    {
      name: listCode ? `${listCode.replace(/([a-z])([A-Z])/g, "$1 $2")}` : "Code",
      selector: row => row[listCode],
      sortable: true,
      omit: page === 'project', // This column will be visible
      center: true,
    },

    {
      name: page === 'project' ? 'Project Name' : 'Description',
      selector: row => row.Description,
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      selector: row => (
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleEdit(row)}
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row[listId])}
          >
            <FaTrash />
          </Button>
        </div>
      ),
      center: true,
    },
  ];

  useEffect(() => {
    getData(companyID);
  }, [companyID, page]);


  const getData = async (companyID) => {
    try {
      const response = await fetchPostData(getDataApiUrl, { IsActive: true, CompanyID: companyID });
      // setData(response.data);
      // console.log(response);
      if (response.length > 0) {
        setData(response);

      } else {
        setData([]);

      }

    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  const addData = async (formData) => {
    try {
      // console.log(formData);
      const response = await AddDeleteUpdateData(addApiUrl, formData);
      // console.log(response);
      // setData(response.data);
      showSuccess("Item added successfully!");
      getData(companyID);
    } catch (error) {
      console.error('Error fetching data:', error);
      showError("Failed to add item. Please try again.");
    }
  };

  const updateData = async (formData) => {
    // console.log("🚀 ~ updateData ~ formData:", formData)
    try {
      const response = await AddDeleteUpdateData(updateApiUrl, formData);
      // console.log(response);
      // setData(response.data);
      showSuccess("Item updated successfully!");
      getData(companyID);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleEdit = (row) => {
    // console.log("🚀 ~ handleEdit ~ row:", row)
    setFormData({
      [listCode]: row[listCode],
      [listId]: row[listId],
      Description: row.Description,
      CompanyID: companyID,
      IsActive: true,
      CreatedByUser: '',
      ModifiedByUser: '',
      DeleteByUser: '',
    });
    // setFormData(row);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    showWarning("Deleting item... please wait");
    setLoading(true);
    try {
      await AddDeleteUpdateData(deleteApiUrl, { [listId]: id });
      await getData(companyID);
      showSuccess("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      showError("Failed to delete item. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;

    if (!formData[listCode] && page != 'project') {
      toast.error(`${listCode} is required`);
      error = true;
    }

    if (!formData["Description"]) {
      toast.error(`Description is required`);
      error = true;
    }

    if (error) {
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await updateData(formData);

      } else {
        await addData(formData);

      }
      setShowModal(false);

    } catch (error) {
      console.error('Error:', error);

    } finally {
      setLoading(false);

    }

  };

  const handleAddNew = () => {
    setIsEditing(false);
    setFormData({
      [listCode]: '',
      [listId]: '',
      Description: '',
      CompanyID: companyID,
      IsActive: true,
      CreatedByUser: '',
      ModifiedByUser: '',
      DeleteByUser: '',
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      [listCode]: '',
      [listId]: '',
      Description: '',
      // CompanyID: companyID,
      IsActive: true,
      CreatedByUser: '',
      ModifiedByUser: '',
      DeleteByUser: '',
    });
  };

  const filteredData = data.filter(item => {
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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


  return (
    <div className="container-fluid">
      <Card className="mb-0" >
        <Card.Body>
          <div className="d-flex justify-content-end align-items-center mb-2 pb-1" style={{ gap: '15px' }}>
            <div className="ml-2">
              <InputGroup className="">
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

            <div className="d-flex justify-content-between align-items-center ">
              {/* <h2>{title}</h2> */}
              <Button
                variant="primary"
                className="btn-mobile-small"
                onClick={() => {
                  handleAddNew();
                  setShowModal(true);
                }}
              >
                <FaPlus className="me-2" /> Add New
              </Button>
            </div>
          </div>
          <div className="table-responsive">
            <Table className="align-middle" style={{ overflowX: "auto", overflowY: "auto" }}>
              <DataTable
                className='px-0'
                data={filteredData || data}
                columns={columns}
                pagination
                paginationPerPage={7}
                paginationRowsPerPageOptions={[7, 10, 25, 50]}
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="325px"

                persistTableHead={true}
              />
            </Table>
          </div>
        </Card.Body>
      </Card>

      <AddEditModal
        show={showModal}
        // onHide={() => setShowModal(false)}
        onHide={handleModalClose}
        title={`${isEditing ? 'Edit' : 'Add New'} ${page}`}
        formData={formData}
        listCode={listCode}

        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        loading={loading}
        submitButtonText={isEditing ? 'Update' : 'Add'}
        openPage={page ? page : ''}
      />
    </div>
  );
};

export default DataTablePage;
