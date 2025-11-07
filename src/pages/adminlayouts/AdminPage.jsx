import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataTablePage from "./DataTablePage";
import { getPageConfig } from "../../config/adminPages.jsx";
import { getApiForPage } from "../../services/adminApiService";

// ✅ Universal AdminPage with optional prop override
const AdminPage = ({ page: propPage }) => {
  // All hooks must be called at the top level
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get page from props or URL params with a default value
  const page = propPage || params.page || 'admin';
  
  // Get page config (columns, fields, etc.)
  const pageConfig = getPageConfig(page);
  
  // Get API and page config
  const api = getApiForPage(page);
  const { title = 'Admin', columns = [], formFields = [] } = pageConfig || {};

  // Always use mock data for all pages
  const useMockData = true;

  // ✅ Fetch data (using mock data for all pages)
  const fetchData = async () => {
    try {
      setLoading(true);
      let result;

      // Always use mock data for all pages
      result = [
        { 
          id: 1, 
          name: `${page} Item 1`, 
          description: `Sample ${page} item 1`,
          status: 'Active',
          createdAt: new Date().toISOString()
        },
        { 
          id: 2, 
          name: `${page} Item 2`, 
          description: `Sample ${page} item 2`,
          status: 'Inactive',
          createdAt: new Date().toISOString()
        },
      ];

      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // ✅ Add
  const handleAdd = async (formData) => {
    try {
      if (["bank", "project"].includes(page)) {
        await api.create(formData);
      }
      console.log("Added:", formData);
      await fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Failed to add item" };
    }
  };

  // ✅ Edit
  const handleEdit = async (formData) => {
    try {
      if (["bank", "project"].includes(page)) {
        await api.update(formData.id, formData);
      }
      console.log("Updated:", formData);
      await fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Failed to update item" };
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      if (["bank", "project"].includes(page)) {
        await api.delete(id);
      }
      console.log("Deleted:", id);
      await fetchData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || "Failed to delete item" };
    }
  };

  // ✅ Error display
  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      </div>
    );
  }

  // Use default columns if not defined in config
  const tableColumns = columns.length > 0 ? columns : [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="container py-4">
      {/* <h2 className="mb-4">{title || 'Admin'} Management</h2> */}
      <DataTablePage
        // title={page ? page.charAt(0).toUpperCase() + page.slice(1) : 'Admin'}  // Capitalize first letter
        columns={tableColumns}
        formFields={formFields}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        data={data}
        loading={loading}
      />
    </div>
  );
};

export default AdminPage;
