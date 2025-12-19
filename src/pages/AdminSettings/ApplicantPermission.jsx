export default function ApplicantPermission() {
    return (
        <div className="card border">
            <div
                className="card-body d-flex align-items-center"
                style={{ padding: "8px 12px", gap:"8px" }}   // slim height
            >
                {/* Title */}
                <span className="fw-normal text-dark">
                    Applicant Register Permission :-
                </span>

                {/* Checkbox */}
                <input
                    type="checkbox"
                    className="form-check-input m-0"
                    style={{ cursor: "pointer" }}
                />
            </div>
        </div>
    );
}
