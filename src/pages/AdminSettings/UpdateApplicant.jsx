export default function UpdateApplicant() {
    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Truncate Table
                </div>

                <hr className="my-2" />

                {/* Form Row */}
                <div className="d-flex align-items-center gap-2 flex-wrap">

                    {/* Applicant Number */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="-- APPLICANT NUMBER --"
                        style={{ maxWidth: 250 }}
                    />

                    {/* Select Column */}
                    <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: 300 }}
                    >
                        <option>-- SELECT COLUMN --</option>
                        <option value="reg_id">reg_id</option>
                        <option value="profile_photo">profile_photo</option>
                        <option value="full_name">full_name</option>
                    </select>

                    {/* What you update */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="-- WHAT YOU UPDATE --"
                        style={{ maxWidth: 250 }}
                    />

                    {/* Button */}
                    <button className="btn btn-success btn-sm">
                        UPDATE
                    </button>

                </div>
            </div>
        </div>
    );
}
