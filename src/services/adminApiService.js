import axios from "axios";
import { adminPagesConfig } from "../config/adminPages.jsx";

/* -------------------------------------------------------------------------- */
/* 🧩 Create an axios instance with base URL and Authorization header */
/* -------------------------------------------------------------------------- */
const api = axios.create({
  baseURL: "https://your-api-base-url.com", // 🔧 Change this to your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach Authorization token dynamically (optional)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* -------------------------------------------------------------------------- */
/* 🧩 Error handler */
/* -------------------------------------------------------------------------- */
const handleError = (error) => {
  console.error("API Error:", error);
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again.";
  throw new Error(message);
};

/* -------------------------------------------------------------------------- */
/* 🧩 Generic CRUD helper functions */
/* -------------------------------------------------------------------------- */
const createItem = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const getItems = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateItem = async (endpoint, id, data) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const deleteItem = async (endpoint, id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/* -------------------------------------------------------------------------- */
/* 🧩 Page-specific API handlers (matches adminPagesConfig) */
/* -------------------------------------------------------------------------- */
export const bankApi = {
  getAll: () => getItems(adminPagesConfig.bank.endpoint),
  create: (data) => createItem(adminPagesConfig.bank.endpoint, data),
  update: (id, data) => updateItem(adminPagesConfig.bank.endpoint, id, data),
  delete: (id) => deleteItem(adminPagesConfig.bank.endpoint, id),
};

export const casteApi = {
  getAll: () => getItems(adminPagesConfig.caste.endpoint),
  create: (data) => createItem(adminPagesConfig.caste.endpoint, data),
  update: (id, data) => updateItem(adminPagesConfig.caste.endpoint, id, data),
  delete: (id) => deleteItem(adminPagesConfig.caste.endpoint, id),
};

export const projectApi = {
  getAll: () => getItems(adminPagesConfig.project.endpoint),
  create: (data) => createItem(adminPagesConfig.project.endpoint, data),
  update: (id, data) => updateItem(adminPagesConfig.project.endpoint, id, data),
  delete: (id) => deleteItem(adminPagesConfig.project.endpoint, id),
};

export const plotApi = {
  getAll: () => getItems(adminPagesConfig.plot.endpoint),
  create: (data) => createItem(adminPagesConfig.plot.endpoint, data),
  update: (id, data) => updateItem(adminPagesConfig.plot.endpoint, id, data),
  delete: (id) => deleteItem(adminPagesConfig.plot.endpoint, id),
};

export const applicationApi = {
  getAll: () => getItems(adminPagesConfig.application.endpoint),
  create: (data) =>
    createItem(adminPagesConfig.application.endpoint, data),
  update: (id, data) =>
    updateItem(adminPagesConfig.application.endpoint, id, data),
  delete: (id) =>
    deleteItem(adminPagesConfig.application.endpoint, id),
};

export const bankDetailsApi = {
  getAll: () => getItems(adminPagesConfig.bankDetails.endpoint),
  create: (data) =>
    createItem(adminPagesConfig.bankDetails.endpoint, data),
  update: (id, data) =>
    updateItem(adminPagesConfig.bankDetails.endpoint, id, data),
  delete: (id) =>
    deleteItem(adminPagesConfig.bankDetails.endpoint, id),
};

/* -------------------------------------------------------------------------- */
/* 🧩 Unified API resolver (for dynamic AdminPage usage) */
/* -------------------------------------------------------------------------- */
export const getApiForPage = (page) => {
  const apis = {
    bank: bankApi,
    caste: casteApi,
    project: projectApi,
    plot: plotApi,
    application: applicationApi,
    "bank-details": bankDetailsApi,
  };

  // Fallback dummy API to prevent crashes for invalid pages
  return (
    apis[page] || {
      getAll: () => Promise.resolve([]),
      create: () => Promise.reject("Invalid page API call"),
      update: () => Promise.reject("Invalid page API call"),
      delete: () => Promise.reject("Invalid page API call"),
    }
  );
};
