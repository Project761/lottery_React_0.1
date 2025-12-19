export default function AdminInfo() {
    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Change Admin Information
                </div>

                <hr className="my-2" />

                {/* Form Row */}
                <div className="row g-2 align-items-end">

                    {/* Username */}
                    <div className="col-md-4">
                        <label className="small text-muted mb-1">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Enter the Username"
                        />
                    </div>

                    {/* Email */}
                    <div className="col-md-4">
                        <label className="small text-muted mb-1">Email</label>
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            placeholder="Enter the Email"
                        />
                    </div>

                    {/* Password */}
                    <div className="col-md-4">
                        <label className="small text-muted mb-1">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                             placeholder="Enter the Password"
                        />
                    </div>

                </div>

                {/* Button */}
                <div className="mt-2">
                    <button className="btn btn-success btn-sm">
                        UPDATE
                    </button>
                </div>

            </div>
        </div>
    );
}
