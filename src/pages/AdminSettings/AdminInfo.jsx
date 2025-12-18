export default function AdminInfo() {
    return (
        <>
            <h6>Change Admin Info</h6>
            <input className="form-control mb-2" placeholder="Admin Name" />
            <input className="form-control mb-2" placeholder="Email" />
            <button className="btn btn-primary btn-sm">Save</button>
        </>
    );
}