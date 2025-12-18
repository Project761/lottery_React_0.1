
export default function ButtonChange() {
    return (
        <>
            <h6>Button Change</h6>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Button Text</label>
                    <input className="form-control" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Button Color</label>
                    <input type="color" className="form-control form-control-color" />
                </div>
            </div>
            <button className="btn btn-primary btn-sm mt-3">Save</button>
        </>
    );
}