export default function TruncateTable() {
    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Truncate Table
                </div>

                <hr className="my-2" />

                {/* Controls */}
                <div className="d-flex align-items-center gap-2">
                    <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: 220 }}
                    >
                        <option>-- SELECT TABLE --</option>
                        {/* dynamic tables */}
                        {/* <option value="users">Users</option> */}
                    </select>

                    <button className="btn btn-success btn-sm">
                        TRUNCATE
                    </button>
                </div>

            </div>
        </div>
    );
}
