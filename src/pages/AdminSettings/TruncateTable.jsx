
export default function TruncateTable() {
    return (
        <>
            <h6 className="text-danger">Truncate Table</h6>
            <p className="text-muted">
                This action will permanently delete records.
            </p>
            <button className="btn btn-danger btn-sm">TRUNCATE</button>
        </>
    );
}