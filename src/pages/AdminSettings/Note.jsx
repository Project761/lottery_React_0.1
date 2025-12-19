export default function Note() {
    return (
        <div className="container-fluid px-0">
            {/* Add Note Card */}
            <div className="card shadow-sm mb-3">
                <div className="card-header bg-white fw-semibold">
                    Add Note
                </div>

                <div className="card-body">
                    {/* Note Textarea */}
                    <div className="mb-2">
                        <textarea
                            className="form-control"
                            rows={3}
                            placeholder="Note"
                        />
                    </div>

                    {/* Text Color Input */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Text Color"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="btn btn-success btn-sm px-4">
                        SUBMIT
                    </button>
                </div>
            </div>

            {/* Empty State Card */}
            <div className="card shadow-sm">
                <div className="card-body text-center py-2">
                    <span className="text-danger small fw-semibold">
                        There Are No Note Available
                    </span>
                </div>
            </div>
        </div>
    );
}
