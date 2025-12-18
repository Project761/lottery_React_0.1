export default function Note() {
    return (
        <>
            <h6>Note</h6>
            <textarea className="form-control" rows={4} />
            <button className="btn btn-primary btn-sm mt-3">Save Note</button>
        </>
    );
}