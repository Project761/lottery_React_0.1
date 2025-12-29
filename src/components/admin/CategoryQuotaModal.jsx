import React, { useState } from "react";
import Select from "react-select";

const CategoryQuotaModal = ({ onClose }) => {
    const [form, setForm] = useState({
        quota: "",
        plot_range: "",
        policy_name: "",
        CategoryQuota: null,
    });

    const categoryOptions = [
        { value: 1, label: "General" },
        { value: 2, label: "OBC" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleCategoryChange = (selected) => {
        setForm((p) => ({ ...p, CategoryQuota: selected }));
    };

    const handleSubmit = () => {
        const payload = {
            quota: form.quota,
            plot_range: form.plot_range,
            policy_name: form.policy_name,
            CategoryQuotaID: form.CategoryQuota?.value,
        };

        console.log("Submit payload:", payload);

        // 👉 API call yaha
        onClose(); // success ke baad close
    };

    return (
        <>
            {/* MODAL */}
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        {/* HEADER */}
                        <div className="modal-header">
                            <h5 className="modal-title">Add Category Quota</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        {/* BODY */}
                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label">Category Quotas</label>
                                    <Select
                                        options={categoryOptions}
                                        value={form.CategoryQuota}
                                        onChange={handleCategoryChange}
                                        placeholder="Select Category Quota"
                                        classNamePrefix="react-select"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Quota</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="quota"
                                        value={form.quota}
                                        onChange={handleChange}
                                        placeholder="Enter quota"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Plot Range</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="plot_range"
                                        value={form.plot_range}
                                        onChange={handleChange}
                                        placeholder="Ex: 100-200"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Policy Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="policy_name"
                                        value={form.policy_name}
                                        onChange={handleChange}
                                        placeholder="Enter policy name"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* BACKDROP */}
            <div className="modal-backdrop fade show" onClick={onClose}></div>
        </>
    );
};

export default CategoryQuotaModal;
