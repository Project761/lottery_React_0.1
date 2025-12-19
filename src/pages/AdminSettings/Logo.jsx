export default function Logo() {
    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Change Logo
                </div>

                <hr className="my-2" />

                {/* Input + Button */}
                <div className="d-flex align-items-center gap-2">

                    {/* Logo Name Input */}
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        style={{ maxWidth: 300 }}
                    />

                    {/* Update Button */}
                    <button className="btn btn-success btn-sm">
                        UPDATE
                    </button>

                </div>

            </div>
        </div>
    );
}
