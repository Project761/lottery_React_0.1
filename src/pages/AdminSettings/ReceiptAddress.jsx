export default function ReceiptAddress() {
    return (
        <div className="card border">
            <div className="card-body px-3 py-2">

                {/* Title */}
                <div className="fw-semibold mb-2">
                    Update Receipt Address
                </div>

                <hr className="my-2" />

                {/* Textarea */}
                <textarea
                    className="form-control mb-2"
                    rows={3}
                    placeholder=""
                />

                {/* Button */}
                <button className="btn btn-success btn-sm">
                    UPDATE
                </button>

            </div>
        </div>
    );
}
