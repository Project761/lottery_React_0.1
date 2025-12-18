
export default function ApplicantPermission() {
    return (
        <>
            <h6>
                Applicant Register Permission{" "}
                <span className="text-muted">(आवेदक पंजीकरण अनुमति)</span>
            </h6>

            <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                    Allow Multiple Agencies
                    <span className="text-muted ms-1">
                        (एक से अधिक एजेंसियों की अनुमति दें)
                    </span>
                </label>
            </div>

            <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                    Allow Seal
                    <span className="text-muted ms-1">
                        (सील करने की अनुमति दें)
                    </span>
                </label>
            </div>

            <div className="form-check mt-2">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                    Allow Unseal
                    <span className="text-muted ms-1">
                        (अनसील करने की अनुमति दें)
                    </span>
                </label>
            </div>
        </>
    );
}