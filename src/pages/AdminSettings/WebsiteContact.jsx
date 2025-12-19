export default function WebsiteContact() {
    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Update Contact Information
                </div>
                <hr className="my-2" />

                {/* Info rows */}
                <div className="small text-muted mb-1">
                    <span className="fw-semibold text-dark">Email</span> :- lotteryweb@gmail.com
                </div>

                <div className="small text-muted mb-3">
                    <span className="fw-semibold text-dark">Contact number</span> :- 0000000000
                </div>

                {/* Button */}
                <button className="btn btn-success btn-sm">
                    UPDATE CONTACT INFO
                </button>
            </div>
        </div>
    );
}
