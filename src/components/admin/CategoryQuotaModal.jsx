import React, { useEffect, useState } from "react";
import Select from "react-select";
import toast, { showWarning, showSuccess, showError } from '../../utils/toast';
import { AddDeleteUpdateData } from "../hooks/Api";


const CategoryQuotaModal = ({ onClose, categoryQuotaid, EditMode, setEditMode, setCategoryQuotaId, editData, setEditData, count, fetchCategoryQuota }) => {

    const CompanyID = localStorage.getItem("companyID") ?? 1;
    const UserID = localStorage.getItem('AdminUserID') || 1

    const [form, setForm] = useState({
        CompanyID: localStorage.getItem("companyID") ?? 1,
        quota: '',
        CategoryQuotas: '',
        plot_range: '',
        policy_name: '',
        CategoryQuotaID: '',
        CreatedByUser: '',
        ModifiedByUser: '',

    });

    useEffect(() => {
        // console.log("🚀 ~ CategoryQuotaModal ~ editData:", editData)
        if (EditMode && editData) {
            setForm({
                ...form,
                CompanyID: localStorage.getItem("companyID") ?? 1,
                quota: editData?.quota,
                // CategoryQuotas: editData?.CategoryQuota ? getValueByLabel(categoryOptions, editData?.CategoryQuota) : null,
                // plot_range: editData?.plot_range ? getValueByLabel(plotRangeOptions, editData?.plot_range) : null,
                CategoryQuotas: editData?.CategoryQuota ? editData?.CategoryQuota : null,
                plot_range: editData?.plot_range ? editData?.plot_range : null,
                policy_name: editData?.policy_name,
                CategoryQuotaID: editData?.CategoryQuotaID,
                CreatedByUser: editData?.CreatedByUser,
                ModifiedByUser: '',
            });
        }
    }, [EditMode, editData, count]);

    const handleSubmit = async () => {

        const { CompanyID, quota, CategoryQuotas, plot_range, policy_name, CreatedByUser } = form;

        const payload = {
            'CompanyID': localStorage.getItem("companyID") ?? 1,
            'quota': quota,
            'CategoryQuotas': CategoryQuotas,
            'plot_range': plot_range,
            'policy_name': policy_name,
            'CreatedByUser': UserID,
        };

        console.log("Submit payload:", payload);

        try {

            const response = await AddDeleteUpdateData("CategoryQuota/Insert_CategoryQuota", payload);
            console.log("✅ Insert CategoryQuota Response:", response);

            showSuccess("Inserted successfully");
            fetchCategoryQuota();

        } catch (e) {
            showError("Insert failed");

        } finally {
            // setLoading(false);

        }

        Reset();
        // 👉 API call yaha
        onClose(); // success ke baad close
    };

    const handleUpdate = async () => {
        const { CompanyID, quota, CategoryQuotas, plot_range, policy_name, CreatedByUser, CategoryQuotaID } = form;

        const payload = {
            'CompanyID': localStorage.getItem("companyID") ?? 1,
            'quota': quota,
            'CategoryQuotas': CategoryQuotas,
            'plot_range': plot_range,
            'policy_name': policy_name,
            'CreatedByUser': CreatedByUser,
            'CategoryQuotaID': categoryQuotaid,
            'ModifiedByUser': UserID

        };

        console.log("Submit payload:", payload);

        try {

            const response = await AddDeleteUpdateData("CategoryQuota/Update_CategoryQuota", payload);
            console.log("✅ Insert CategoryQuota Response:", response);

            showSuccess("Updated successfully");
            fetchCategoryQuota();

        } catch (e) {
            showError("Updated failed");

        } finally {
            // setLoading(false);

        }

        Reset();
        // 👉 API call yaha
        onClose(); // success ke baad close
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleCategoryChange = (selected, name) => {
        setForm((p) => ({ ...p, [name]: selected?.label }));
        // setForm((p) => ({ ...p, [name]: selected?.value }));
    };

    const Reset = () => {
        setForm((p) => ({
            ...p,
            quota: '',
            CategoryQuotas: '',
            plot_range: '',
            policy_name: '',
            CreatedByUser: '',
            CategoryQuotaID: '',
            ModifiedByUser: '',
        }));
        setEditMode(false);
        setCategoryQuotaId('');
    }

    const OnChangeDropDown = (e, name) => {
        // console.log(e);
        // console.log(name);
        // console.log(e.target.value);
        if (e) {
            setValue({ ...value, [name]: e.value, });
        } else {
            setValue({ ...value, [name]: null, });
        }
    }

    const categoryOptions = [
        { value: 1, label: "General" },
        { value: 2, label: "OBC" },
    ];

    const plotRangeOptions = [
        { value: 1, label: "EWS" },
        { value: 2, label: "LIG" },
    ];


    function getValueByLabel(options, label) {
        // const options = [
        //     { value: 1, label: "Residential" },
        //     { value: 2, label: "Commercial" },
        // ];

        const found = options.find(
            item => item.label.toLowerCase() === label.toLowerCase()
        );
        return found ? found.value : null;
    }

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
                                        value={categoryOptions?.filter((obj) => obj.label === form.CategoryQuotas)}
                                        onChange={(selected) => handleCategoryChange(selected, 'CategoryQuotas')}
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
                                    <Select
                                        options={plotRangeOptions}
                                        // value={form.plot_range}
                                        value={plotRangeOptions?.filter((obj) => obj.label === form.plot_range)}
                                        onChange={(selected) => handleCategoryChange(selected, 'plot_range')}
                                        placeholder="Select Category Quota"
                                        classNamePrefix="react-select"
                                    />
                                    {/* <input
                                        type="text"
                                        className="form-control"
                                        name="plot_range"
                                        value={form.plot_range}
                                        onChange={handleChange}
                                        placeholder="Ex: 100-200"
                                    /> */}
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
                            {
                                categoryQuotaid && EditMode ?
                                    (
                                        <button className="btn btn-primary" onClick={handleUpdate}>
                                            Update
                                        </button>
                                    ) : (
                                        <button className="btn btn-primary" onClick={handleSubmit}>
                                            Save
                                        </button>
                                    )
                            }
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
